from readmegen_mod.readmeai.config.set import ConfigLoader, GitSettings
from readmegen_mod.readmeai.core.logger import get_logger
from readmegen_mod.readmeai.core.pipeline import readme_agent, readme_generator
from pydantic import BaseModel, HttpUrl
import asyncio

# class MarkdownConfig(BaseModel):
#     align: str
#     badge_color: str
#     badge_style: str
#     emojis: bool
#     header_style: str
#     logo: str
#     logo_size: str
#     navigation_style: str
#     tree_max_depth: int
#     repository: str

# class ModelConfig(BaseModel):
#     api: str = "offline"
#     base_url: str = "https://github.com/mfcoelhodev/encurtador_url"
#     context_window: int = 3900
#     model: str
#     rate_limit: int = 10
#     system_message: str = (
#         "You're a 10x Staff Software Engineering leader, with deep knowledge "
#         "across most tech stacks. You'll use your expertise to write robust "
#         "README markdown files for open-source projects. You're a master of "
#         "the craft, and you're here to help others succeed."
#     ) 
#     temperature: float
#     top_p: float


# def readme_creator(ModelConfig, MarkdownConfig):
async def offline_readme(repository: HttpUrl) -> str:
    config = ConfigLoader()
    config.config.git = GitSettings(repository=repository)
    config.config.llm = config.config.llm.model_copy(
        update={
            "api": "offline",
            "base_url": repository,
            "context_window": 3900,
            # "model": str,
            "rate_limit": 10,
            # "system_message": str,
            # "temperature": float,
            # "top_p": float,
        }
    )
    return await readme_generator(config=config)

def trying(repository: HttpUrl) -> str:
    config = ConfigLoader()
    config.config.git = GitSettings(repository=repository)
    config.config.llm = config.config.llm.model_copy(
        update={
            "api": "offline",
            "base_url": repository,
            "context_window": 3900,
            "model": str,
            "rate_limit": 10,
            "system_message": str,
            "temperature": float,
            "top_p": float,
        }
    )
    config.config.md = config.config.md.model_copy(
        update={
            "align": "center",
            "badge_color": "#0080FF",
            "badge_style": "default",
            # "emojis": bool,
            "header_style": "classic",
            "logo": "blue",
            "logo_size": str,
            "navigation_style": "bullet",
            "tree_max_depth": 2,
        },
    )
    return readme_agent(config=config)


repo = "https://github.com/mfcoelhodev/encurtador_url"
def main():
    readme = trying(repo)
    print(readme)
    return readme
if __name__ == "__main__":
    main()
