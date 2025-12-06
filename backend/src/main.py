from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager

from services.ingestion_service import IngestionService
from services.retrieval_service import RetrievalService
from services.neon_service import create_tables, close_neon_pool
from services.qdrant_service import initialize_qdrant_collection, get_qdrant_client
from services.embedding_service import EmbeddingService


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Application startup: Initializing services...")
    await create_tables()
    qdrant_client = get_qdrant_client()
    # Assuming a fixed vector size for now, based on 'all-MiniLM-L6-v2' output
    # It's 384 for 'all-MiniLM-L6-v2'
    initialize_qdrant_collection(qdrant_client, vector_size=384)
    yield
    # Shutdown
    print("Application shutdown: Closing services...")
    await close_neon_pool()


app = FastAPI(lifespan=lifespan)

ingestion_service = IngestionService()
retrieval_service = RetrievalService()

class IngestDocumentRequest(BaseModel):
    file_path: str
    chapter_title: str

class QueryRequest(BaseModel):
    query: str
    top_k: int = 5


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Physical AI & Humanoid Robotics Textbook Backend!"}

@app.post("/ingest/document")
async def ingest_document_endpoint(request: IngestDocumentRequest):
    try:
        chunks_processed = await ingestion_service.ingest_document(
            file_path=request.file_path,
            chapter_title=request.chapter_title
        )
        return {"message": "Document ingested successfully", "chunks_processed": chunks_processed}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found at {request.file_path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

@app.post("/query")
async def query_endpoint(request: QueryRequest):
    try:
        results = await retrieval_service.retrieve_relevant_chunks(
            query=request.query,
            top_k=request.top_k
        )
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")
