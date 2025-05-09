from fastapi import APIRouter, Depends
from fastapi.response import Response, JSONResponse
from http import HTTPStatus
from user_mod.users import current_active_user
from database.core import User, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from pydantic import HttpUrl
from readmegen-mod.service import offline_readme
from readmegen-mod.model import Readme

readme = APIRouter(
    prefix='/readme',
    tags=['readme']
)

@readme.post("/{readme_basic}", status_code=HTTPStatus.OK)
async def Create_basic(
    repository:HttpUrl, 
    user: Optional[User] = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session)):

    readme_text = offline_readme(repository)
    if user:
        db_readme = Readme (
            user_id = user.id
            repository_url = repository
            readme = readme_md
        )

        db.add(db_readme)
        await db.commit()
        await db.refresh(db_readme)

    return readme_text
