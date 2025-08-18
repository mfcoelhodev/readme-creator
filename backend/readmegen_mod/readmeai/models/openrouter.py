"""OpenRouter LLM API service implementation."""

import os
from typing import Any

import aiohttp
import openai
from ..config.set import ConfigLoader
from ..extractors.models import RepositoryContext
from ..models.base import BaseModelHandler
from ..models.enums import BaseURLs, LLMProviders, OpenRouterModels
from ..models.tokens import token_handler
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)


class OpenRouterHandler(BaseModelHandler):
    """
    OpenRouter LLM API service implementation.
    """

    def __init__(self, config_loader: ConfigLoader, context: RepositoryContext) -> None:
        super().__init__(config_loader, context)
        self._model_settings()

    def _model_settings(self):
        """Initializes OpenRouter API settings."""
        self.url = BaseURLs.OPENROUTER.value
        if os.getenv("OPENROUTER_API_KEY") is None:
            raise ValueError("OpenRouter API key not set in environment.")

        self.client = openai.OpenAI(
            base_url=self.url,
            api_key=os.getenv("OPENROUTER_API_KEY"),
        )
        self.model = OpenRouterModels.MISTRAL_INSTRUCT.value
        self.headers = {
            "Authorization": f"Bearer {self.client.api_key}",
            "HTTP-Referer": self.config.llm.site_url,
            "X-Title": self.config.llm.site_title,
        }

    async def _build_payload(self, prompt: str) -> dict[str, Any]:
        """Build request body for making text generation requests."""
        return {
            "messages": [
                {
                    "role": "system",
                    "content": self.system_message,
                },
                {"role": "user", "content": prompt},
            ],
            "model": self.model,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
        }

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        retry=retry_if_exception_type(
            (
                aiohttp.ClientError,
                aiohttp.ClientResponseError,
                aiohttp.ClientConnectorError,
                openai.OpenAIError,
            ),
        ),
    )
    async def _make_request(
        self,
        index: str | None,
        prompt: str | None,
        tokens: int | None,
        repo_files: Any,
    ):
        """Process requests to OpenRouter API, with retries and error handling."""
        try:
            if prompt is None:
                raise ValueError("Prompt cannot be None")

            prompt = await token_handler(
                config=self.config,
                index=index,
                prompt=prompt,
                tokens=tokens,
            )
            if not prompt:
                raise ValueError("Token handler returned empty prompt")

            parameters = await self._build_payload(prompt)

            async with self._session.post(
                f"{self.url}/chat/completions",
                headers=self.headers,
                json=parameters,
            ) as response:
                response.raise_for_status()
                response_json = await response.json()
                content = response_json["choices"][0]["message"]["content"]

                if not content:
                    raise ValueError("Empty response from API")

                self._logger.info(
                    f"Response from OpenRouter for '{index}': {content}",
                )
                return index, content

        except (
            aiohttp.ClientError,
            aiohttp.ClientResponseError,
            aiohttp.ClientConnectorError,
            openai.OpenAIError,
        ) as e:
            self._logger.error(f"Error processing request for '{index}': {e!r}")
            raise

        except Exception as e:
            self._logger.error(f"Unexpected error for '{index}': {e!r}")
            return index, self.placeholder
