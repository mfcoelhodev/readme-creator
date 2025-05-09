from fastapi import FastAPI
from contextlib import asynccontextmanager
from database.core import create_db_and_tables
from api import register_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

register_routes(app)
