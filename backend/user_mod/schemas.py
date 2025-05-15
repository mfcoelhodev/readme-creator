import uuid
from pydantic import Field
from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    name: str = Field(default=None)
    pass


class UserCreate(schemas.BaseUserCreate):
    name: str = Field(default=None)
    pass


class UserUpdate(schemas.BaseUserUpdate):
    name: str = Field(default=None)
    pass