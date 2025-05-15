"""'Offline Mode' backend handler. Runs the CLI without a LLM API."""

from typing import Any

from ..config.settings import ConfigLoader
from ..extractors.models import RepositoryContext
from ..models.base import BaseModelHandler


class OfflineHandler(BaseModelHandler):
    """
    OfflineMode model handler implementation.
    """

    def __init__(self, config_loader: ConfigLoader, context: RepositoryContext) -> None:
        super().__init__(config_loader, context)

    async def _model_settings(self) -> None: ...

    async def _build_payload(self, prompt: str) -> dict[str, Any]:
        """Builds the payload for the POST request to the LLM API."""
        return {}

    async def _make_request(
        self,
        index: str | None,
        prompt: str | None,
        tokens: int | None,
        repo_files: Any,
    ) -> Any:
        """Returns placeholder content in a consistent format."""
        if repo_files is None or len(repo_files) == 0:
            files = [(self.placeholder, self.placeholder)]
        else:
            files = [(file_path, self.placeholder) for file_path, _ in repo_files]
        return files
