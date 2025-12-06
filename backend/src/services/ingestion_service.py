
import os
import uuid
from typing import List, Dict
from qdrant_client.http.models import PointStruct

from services.embedding_service import EmbeddingService
from services.qdrant_service import get_qdrant_client, COLLECTION_NAME
from services.neon_service import get_neon_pool

class IngestionService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.qdrant_client = get_qdrant_client()
        self.neon_pool = get_neon_pool()

    def _chunk_text(self, text: str, chapter_title: str) -> List[Dict]:
        # Simple chunking by paragraph for now. Can be enhanced later.
        paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
        chunks = []
        for i, paragraph in enumerate(paragraphs):
            chunks.append({
                "id": str(uuid.uuid4()),
                "text": paragraph,
                "chapter_title": chapter_title,
                "chunk_number": i
            })
        return chunks

    async def ingest_document(self, file_path: str, chapter_title: str) -> int:
        with open(file_path, 'r', encoding='utf-8') as f:
            document_content = f.read()

        chunks = self._chunk_text(document_content, chapter_title)
        chunk_texts = [chunk["text"] for chunk in chunks]

        embeddings = self.embedding_service.get_embeddings(chunk_texts)

        points = []
        for i, chunk in enumerate(chunks):
            points.append(
                PointStruct(
                    id=i,
                    vector=embeddings[i],
                    payload={
                        "chunk_id": chunk["id"],
                        "chapter_title": chunk["chapter_title"],
                        "chunk_number": chunk["chunk_number"]
                    }
                )
            )
            # Store metadata in Neon
            async with self.neon_pool.acquire() as conn:
                async with conn.transaction():
                    await conn.execute(
                        """INSERT INTO textbook_chunks (chunk_id, text, chapter_title, chunk_number) VALUES ($1, $2, $3, $4)""",
                        chunk["id"], chunk["text"], chunk["chapter_title"], chunk["chunk_number"]
                    )

        self.qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            wait=True,
            points=points
        )

        return len(chunks)
