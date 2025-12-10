# ingest_data.py

import os
import glob
import re
from qdrant_client import QdrantClient, models
from openai import OpenAI             # RETAINED: OpenAI client for embeddings
import tiktoken
from typing import List
from dotenv import load_dotenv

# --- Configuration ---
load_dotenv() # Load .env file variables

QDRANT_URL = os.environ.get("QDRANT_CLOUD_URL")
QDRANT_API_KEY = os.environ.get("QDRANT_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY") # RETAINED: Needed for embedding API

QDRANT_COLLECTION_NAME = "Ai-native-book"
EMBEDDING_MODEL = "text-embedding-3-small" # RETAINED: The chosen paid OpenAI model
VECTOR_DIMENSION = 1536              # CORRECTED: The default dimension for this model
ENCODING_MODEL = "cl100k_base"      
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100
# FIX THIS PATH BEFORE RUNNING! Example path below:
# In ingest_data.py

# CORRECTED: Navigates to the correct folder and looks for files only in 'docs'
DOCUSAURUS_CONTENT_PATH = "../frontend/docs/*.md*"
# 1. Helper function for text chunking (Remains the same)
def chunk_text(text: str, chunk_size: int, overlap: int) -> List[str]:
    """Splits text into chunks based on token count."""
    tokenizer = tiktoken.get_encoding(ENCODING_MODEL)
    tokens = tokenizer.encode(text)
    
    chunks = []
    start = 0
    while start < len(tokens):
        end = start + chunk_size
        chunk_tokens = tokens[start:end]
        chunks.append(tokenizer.decode(chunk_tokens))
        start += (chunk_size - overlap)
        if chunk_size - overlap <= 0 and start < len(tokens):
            start = end
            
    return chunks

# 2. Main Ingestion Logic
def ingest_data():
    print("Starting data ingestion...")
    
    # Initialize Clients
    try:
        qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
        openai_client = OpenAI(api_key=OPENAI_API_KEY) # Initialize OpenAI client
    except Exception as e:
        print(f"Error initializing clients: {e}")
        return

    # 3. Create or Check Collection (Crucially setting the correct dimension: 1536)
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors_config=models.VectorParams(size=VECTOR_DIMENSION, distance=models.Distance.COSINE),
    )
    print(f"Collection '{QDRANT_COLLECTION_NAME}' created/recreated with size {VECTOR_DIMENSION}.")
    
    all_points = []
    point_id = 1
    
    file_paths = glob.glob(DOCUSAURUS_CONTENT_PATH, recursive=True)
    print(f"Found {len(file_paths)} files to process.")

    for file_path in file_paths:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(r'---[\s\S]*?---', '', content, 1)
        chunks = chunk_text(content, CHUNK_SIZE, CHUNK_OVERLAP)
        print(f"Processing {file_path}. Created {len(chunks)} chunks.")

        # 5. Generate Embedding (PAID OpenAI API Call)
        for i, chunk in enumerate(chunks):
            try:
                embedding_response = openai_client.embeddings.create(
                    model=EMBEDDING_MODEL,
                    input=chunk
                )
                vector = embedding_response.data[0].embedding
                
                # 6. Prepare Point for Qdrant
                all_points.append(
                    models.PointStruct(
                        id=point_id,
                        vector=vector,
                        payload={
                            "text": chunk,
                            "source": file_path,
                            "chunk_index": i
                        }
                    )
                )
                point_id += 1
            except Exception as e:
                print(f"Error generating embedding for chunk {i} in {file_path} via OpenAI: {e}")
                continue

    # 7. Upload all Points in Batch
    if all_points:
        print(f"Uploading {len(all_points)} total points to Qdrant...")
        operation_info = qdrant_client.upsert(
            collection_name=QDRANT_COLLECTION_NAME,
            wait=True,
            points=all_points
        )
        print(f"Data ingestion complete. Status: {operation_info.status}")
    else:
        print("No points were generated for upload.")

if __name__ == "__main__":
    ingest_data()