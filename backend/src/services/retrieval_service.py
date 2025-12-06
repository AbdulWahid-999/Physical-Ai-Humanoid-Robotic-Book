
from typing import List, Dict

from qdrant_client.http.models import Filter, FieldCondition, MatchValue

from services.embedding_service import EmbeddingService
from services.qdrant_service import get_qdrant_client, COLLECTION_NAME
from services.neon_service import get_neon_pool

class RetrievalService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.qdrant_client = get_qdrant_client()
        self.neon_pool = get_neon_pool()

    async def retrieve_relevant_chunks(self, query: str, top_k: int = 5) -> List[Dict]:
        query_embedding = self.embedding_service.get_embeddings([query])[0]

        search_result = self.qdrant_client.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_embedding,
            limit=top_k,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="chapter_title",
                        match=MatchValue(value="Physical AI & Humanoid Robotics") # Assuming a fixed chapter for now
                    )
                ]
            ) # No filter for now, can add later
        )

        retrieved_chunks = []
        async with self.neon_pool.acquire() as conn:
            for hit in search_result:
                chunk_id = hit.payload["chunk_id"]
                row = await conn.fetchrow(
                    """SELECT chunk_id, text, chapter_title, chunk_number FROM textbook_chunks WHERE chunk_id = $1""",
                    chunk_id
                )
                if row:
                    retrieved_chunks.append({
                        "chunk_id": row["chunk_id"],
                        "text": row["text"],
                        "chapter": row["chapter_title"],
                        "chunk_number": row["chunk_number"]
                    })
        return retrieved_chunks
