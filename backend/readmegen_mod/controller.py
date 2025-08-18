from fastapi import APIRouter, Depends
import logging
# from fastapi.response import Response, JSONResponse
from http import HTTPStatus
from user_mod.users import current_active_user, current_active_user_optional
from database.core import User, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from pydantic import HttpUrl, BaseModel
from readmegen_mod.service import offline_readme, llm_readme
from readmegen_mod.model import Readme

logger = logging.getLogger(__name__)

readme = APIRouter(
    prefix='/readme',
    tags=['readme']
)

class Repository(BaseModel):
    repo: HttpUrl



@readme.post("/basic", status_code=HTTPStatus.OK)
async def Create_basic(
    repository: Repository, 
    user: Optional[User] = Depends(current_active_user_optional),
    db: AsyncSession = Depends(get_async_session)):
    logger.info(f"request aceito para criar readme basico para o seguinte repositório: {repository}")
    try:
        readme_text = await offline_readme(str(repository.repo))
        if user:
            db_readme = Readme (
                user_id = user.id,
                repository_url = str(repository.repo),
                readme = readme_text
            )

            db.add(db_readme)
            await db.commit()
            await db.refresh(db_readme)
        return {"readme": readme_text}
    except Exception as e:
        logger.error(f"Erro não esperado: {e}")

@readme.post("/llm", status_code=HTTPStatus.OK)
async def Create_llm(
    repository: Repository, 
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session)):
    logger.info(f"request aceito para criar readme com llm para o seguinte repositório: {repository}")
    try:
        readme_text = await llm_readme(str(repository.repo))
        if user:
            db_readme = Readme (
                user_id = user.id,
                repository_url = str(repository.repo),
                readme = readme_text
            )

            db.add(db_readme)
            await db.commit()
            await db.refresh(db_readme)
        return {"readme": readme_text}
    except Exception as e:
        logger.error(f"Erro não esperado: {e}")
