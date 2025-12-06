from qdrant_client import QdrantClient, models
import os
from dotenv import load_dotenv

load_dotenv()

QDRANT_HOST = os.getenv("QDRANT_HOST")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

def get_qdrant_client():
    client = QdrantClient(
        url=QDRANT_HOST,
        api_key=QDRANT_API_KEY,
    )
    return client

def initialize_qdrant_collection(client: QdrantClient, vector_size: int):
    try:
        client.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(size=vector_size, distance=models.Distance.COSINE),
        )
        print(f"Collection '{COLLECTION_NAME}' recreated successfully.")
    except Exception as e:
        print(f"Error initializing Qdrant collection: {e}")

if __name__ == "__main__":
    # This part is for demonstration/testing the service
    client = get_qdrant_client()
    # Assuming an embedding model provides a vector size of 384 (common for SentenceTransformers)
    initialize_qdrant_collection(client, vector_size=384)
