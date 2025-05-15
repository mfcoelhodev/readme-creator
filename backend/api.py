from fastapi import FastAPI
from user_mod.controller import users_router
from readmegen_mod.controller import readme 
def register_routes(app:FastAPI):
    app.include_router(users_router)
    app.include_router(readme)