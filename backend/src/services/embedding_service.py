from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

load_dotenv()

EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL_NAME", "all-MiniLM-L6-v2") # A good lightweight model

class EmbeddingService:
    def __init__(self):
        self.model = None

    def load_model(self):
        if self.model is None:
            print(f"Loading embedding model: {EMBEDDING_MODEL_NAME}...")
            self.model = SentenceTransformer(EMBEDDING_MODEL_NAME)
            print(f"Embedding model {EMBEDDING_MODEL_NAME} loaded.")
        return self.model

    def get_embeddings(self, texts: list[str]) -> list[list[float]]:
        model = self.load_model()
        embeddings = model.encode(texts, convert_to_numpy=False, convert_to_tensor=False)
        return embeddings.tolist()

embedding_service = EmbeddingService()

if __name__ == "__main__":
    # Example usage
    texts = ["This is a test sentence.", "This is another sentence."]
    embeddings = embedding_service.get_embeddings(texts)
    print(f"Generated {len(embeddings)} embeddings. First embedding shape: {len(embeddings[0])}")
