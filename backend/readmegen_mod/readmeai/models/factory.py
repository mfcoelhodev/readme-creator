from typing import ClassVar

from ..config.settings import ConfigLoader
from ..core.errors import UnsupportedServiceError
from ..extractors.models import RepositoryContext
from ..models.anthropic import AnthropicHandler
from ..models.base import BaseModelHandler
from ..models.enums import LLMProviders
from ..models.gemini import GeminiHandler
from ..models.offline import OfflineHandler
from ..models.openai import OpenAIHandler


class ModelFactory:
    """
    Factory class for creating LLM API handler instances.
    """

    _model_map: ClassVar[dict] = {
        LLMProviders.ANTHROPIC: AnthropicHandler,
        LLMProviders.GEMINI.value: GeminiHandler,
        LLMProviders.OLLAMA.value: OpenAIHandler,
        LLMProviders.OPENAI.value: OpenAIHandler,
        LLMProviders.OFFLINE.value: OfflineHandler,
    }

    @staticmethod
    def get_backend(
        config: ConfigLoader, context: RepositoryContext
    ) -> BaseModelHandler:
        """Retrieves configured LLM API handler instance."""
        llm_service = ModelFactory._model_map.get(config.config.llm.api)

        if llm_service is None:
            raise UnsupportedServiceError(
                f"Unsupported LLM provider: {config.config.llm.api}"
            )

        return llm_service(config, context)
