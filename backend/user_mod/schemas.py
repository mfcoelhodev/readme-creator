import uuid
from pydantic import Field
from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    coins: int = Field(default=0)
    pass


class UserCreate(schemas.BaseUserCreate):
    coins: int = Field(default=0)
    pass


class UserUpdate(schemas.BaseUserUpdate):
    coins: int = Field(default=0)
    pass