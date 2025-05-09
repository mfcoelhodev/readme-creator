from fastapi import FastAPI
from user_mod.controller import users_router

def register_routes(app:FastAPI):
    app.include_router(users_router)
