# main.py (Updated – Works with new Qdrant API + OpenAI)

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from qdrant_client import QdrantClient
from dotenv import load_dotenv

# --- Load Environment Variables ---
load_dotenv()

QDRANT_URL = os.environ.get("QDRANT_CLOUD_URL")
QDRANT_API_KEY = os.environ.get("QDRANT_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

QDRANT_COLLECTION_NAME = "Ai-native-book"
EMBEDDING_MODEL = "text-embedding-3-small"
LLM_MODEL = "gpt-4-turbo-preview"
TOP_K = 4

# --- FastAPI App ---
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Initialize Clients ---
try:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
except Exception as e:
    print(f"Failed to initialize clients. Error: {e}")
    raise Exception("Backend failed to start due to client initialization error.")


# --- Schemas ---
class ChatQuery(BaseModel):
    query: str
    user_id: str = "anonymous"


class ChatResponse(BaseModel):
    answer: str


# --- RAG Pipeline ---
def run_rag_pipeline(query: str) -> str:
    
    # 1. Create embedding using OpenAI
    embedding_response = openai_client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=query
    )
    query_vector = embedding_response.data[0].embedding

    # 2. Retrieve top matching chunks from Qdrant
    search_result = qdrant_client.query_points(
        collection_name=QDRANT_COLLECTION_NAME,
        query=query_vector,
        limit=TOP_K,
    )

    # Results are inside search_result.points
    context_chunks = [
        point.payload.get("text", "") 
        for point in search_result.points
    ]

    context = "\n---\n".join(context_chunks)

    if not context.strip():
        return "No relevant information found in the book to answer your question."

    # 3. Construct system prompt
    system_prompt = (
        "You are an expert assistant for a published book. Provide accurate, concise answers "
        "**based ONLY on the provided context**. "
        "If the answer is not in the context, say you cannot answer based on the book.\n\n"
        f"CONTEXT:\n---\n{context}\n---"
    )

    # 4. Generate LLM answer
    response = openai_client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]
    )

    return response.choices[0].message.content


# --- API Endpoint ---
@app.post("/ask", response_model=ChatResponse)
async def ask_agent(query_data: ChatQuery):
    try:
        answer = run_rag_pipeline(query_data.query)
        return ChatResponse(answer=answer)
    except Exception as e:
        print(f"An error occurred in the RAG pipeline: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while processing query.")


# --- Run App ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
