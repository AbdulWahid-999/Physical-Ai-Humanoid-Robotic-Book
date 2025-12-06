import os
import asyncpg
from dotenv import load_dotenv

load_dotenv()

NEON_DB_URL = os.getenv("NEON_DB_URL")
_neon_pool = None

async def get_neon_pool():
    global _neon_pool
    if _neon_pool is None:
        if not NEON_DB_URL:
            raise ValueError("NEON_DB_URL environment variable not set.")
        print("Initializing Neon PostgreSQL connection pool...")
        _neon_pool = await asyncpg.create_pool(NEON_DB_URL)
        print("Neon PostgreSQL connection pool initialized.")
    return _neon_pool

async def create_tables():
    pool = await get_neon_pool()
    async with pool.acquire() as conn:
        await conn.execute("""CREATE TABLE IF NOT EXISTS textbook_chunks (
            chunk_id UUID PRIMARY KEY,
            text TEXT NOT NULL,
            chapter_title TEXT NOT NULL,
            chunk_number INTEGER NOT NULL
        );""")
    print("Textbook chunks table ensured.")

async def close_neon_pool():
    global _neon_pool
    if _neon_pool:
        print("Closing Neon PostgreSQL connection pool...")
        await _neon_pool.close()
        _neon_pool = None
        print("Neon PostgreSQL connection pool closed.")


