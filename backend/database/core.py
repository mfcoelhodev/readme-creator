import os
from dotenv import load_dotenv
from typing import Annotated
from fastapi import Depends
from collections.abc import AsyncGenerator
from sqlalchemy import Integer
from sqlalchemy.engine import URL
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
# from sqlalchemy.ext.declarative import declarative_base
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

#Configuração pra database e criação de novos models

# POSTGRE
url_object = URL.create(
    "postgresql+asyncpg",
    username=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    database=DB_NAME
)

#sqlite
# url_object = "sqlite+aiosqlite:///./test.db"

engine = create_async_engine(url_object)

async_session_maker = async_sessionmaker(autocommit=False, autoflush=False, bind=engine, expire_on_commit=False)

class Base (DeclarativeBase):
    pass

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session: # Use the defined session maker
        yield session

DbSession = Annotated[AsyncSession, Depends(get_async_session)]

#Configuração da database para fastapi-users

class User(SQLAlchemyBaseUserTableUUID, Base):
    coins: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)