import pytest
from unittest.mock import AsyncMock, patch
from services.ingestion_service import IngestionService
from services.retrieval_service import RetrievalService
from qdrant_client.http.models import Batch, PointStruct, Filter, FieldCondition, MatchValue

# Mock environment variables for testing
@pytest.fixture(autouse=True)
def mock_env_vars():
    with patch.dict('os.environ', {'QDRANT_HOST': 'localhost', 'QDRANT_PORT': '6333', 'NEON_DB_URL': 'postgresql://user:password@host:port/database'}):
        yield

@pytest.fixture
def mock_embedding_service():
    with patch('services.embedding_service.EmbeddingService') as MockEmbeddingService:
        instance = MockEmbeddingService.return_value
        instance.get_embeddings.return_value = [[0.1]*384, [0.2]*384] # Mock embeddings
        yield instance

@pytest.fixture
def mock_qdrant_client():
    with patch('services.qdrant_service.get_qdrant_client') as MockGetQdrantClient:
        instance = MockGetQdrantClient.return_value
        instance.upsert = AsyncMock() # Use AsyncMock for async methods
        instance.search = AsyncMock(return_value=[
            AsyncMock(payload={'chunk_id': 'test_chunk_id_1', 'chapter_title': 'Test Chapter', 'chunk_number': 0}),
        ])
        yield instance

@pytest.fixture
def mock_neon_pool():
    with patch('services.neon_service.get_neon_pool') as MockGetNeonPool:
        mock_conn = AsyncMock()
        mock_conn.transaction = AsyncMock()
        mock_conn.execute = AsyncMock()
        mock_conn.fetchrow = AsyncMock(return_value={
            'chunk_id': 'test_chunk_id_1',
            'text': 'This is a test paragraph.',
            'chapter_title': 'Test Chapter',
            'chunk_number': 0
        })
        mock_pool = AsyncMock()
        mock_pool.acquire.return_value.__aenter__.return_value = mock_conn
        MockGetNeonPool.return_value = mock_pool
        yield mock_pool

@pytest.mark.asyncio
async def test_ingestion_service(mock_embedding_service, mock_qdrant_client, mock_neon_pool, tmp_path):
    # Create a dummy file for ingestion
    file_content = "This is a test paragraph.\n\nThis is another test paragraph."
    file_path = tmp_path / "test_document.txt"
    file_path.write_text(file_content)

    ingestion_service = IngestionService()
    chunks_processed = await ingestion_service.ingest_document(str(file_path), "Test Chapter")

    assert chunks_processed == 2
    mock_embedding_service.get_embeddings.assert_called_once_with([
        "This is a test paragraph.",
        "This is another test paragraph."
    ])
    mock_qdrant_client.upsert.assert_called_once()
    # Verify Neon operations
    mock_neon_pool.acquire.assert_called()
    # The execute call is made for each chunk
    assert mock_neon_pool.acquire.return_value.__aenter__.return_value.execute.call_count == 2

@pytest.mark.asyncio
async def test_retrieval_service(mock_embedding_service, mock_qdrant_client, mock_neon_pool):
    retrieval_service = RetrievalService()
    query = "What is this about?"
    top_k = 1
    results = await retrieval_service.retrieve_relevant_chunks(query, top_k)

    mock_embedding_service.get_embeddings.assert_called_once_with([query])
    mock_qdrant_client.search.assert_called_once_with(
        collection_name="textbook_chapters",
        query_vector=mock_embedding_service.get_embeddings.return_value[0],
        limit=top_k,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="chapter_title",
                    match=MatchValue(value="Physical AI & Humanoid Robotics")
                )
            ]
        )
    )
    assert len(results) == 1
    assert results[0]["text"] == "This is a test paragraph."

