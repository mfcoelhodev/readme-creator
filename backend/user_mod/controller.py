from fastapi import APIRouter, Depends, Request, FastAPI
from user_mod.schemas import UserCreate, UserRead, UserUpdate
from user_mod.users import auth_backend, current_active_user, fastapi_users
from user_mod.users import current_active_user
from database.core import User
# from sqlalchemy.ext.asyncio import AsyncSession
#import logging

users_router = APIRouter(
    prefix='/user',
    tags=['user']
)

users_router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
users_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
users_router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
users_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
users_router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate, requires_verification=True),
    prefix="/users",
    tags=["users"],
)

@users_router.get("/me")
async def get_current_user_email(user: User = Depends(current_active_user)):
    return {"email": f"{user.email}"}