# FROM python:3.13-alpine
FROM python:3.13-slim 

RUN apt-get update && apt-get install -y git --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /backend

COPY requirements.txt /backend/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /backend/

# EXPOSE 8000

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"] 


# FROM python:3.13-slim

# COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# RUN apt-get update && apt-get install -y git --no-install-recommends && rm -rf /var/lib/apt/lists/*

# WORKDIR /backend

# # RUN apt-get update && \
# #     apt-get install -y --no-install-recommends rustc cargo && \
# #     rm -rf /var/lib/apt/lists/*

# COPY pyproject.toml uv.lock /backend/

# # --- START DEBUG ---
# # RUN echo ">>> Contents of pyproject.toml:" && cat pyproject.toml && echo "--- End of pyproject.toml ---"
# # RUN echo ">>> Running first uv sync..."
# # --- END DEBUG ---
# RUN uv sync --frozen --no-install-workspace --all-packages
# # --- START DEBUG ---
# # RUN echo ">>> First uv sync complete. Checking venv..."
# # RUN if [ -d ".venv" ]; then echo ".venv exists. Listing site-packages:"; ls -l .venv/lib/python3.13/site-packages/ | grep -E "fastapi|uvicorn|watchfiles" || echo "Dependencies not found in site-packages after first sync"; else echo ".venv NOT found after first sync"; fi
# # --- END DEBUG ---

# COPY . /backend/

# # --- START DEBUG ---
# # RUN echo ">>> Running second uv sync..."
# # --- END DEBUG ---
# RUN uv sync --frozen --all-packages
# # --- START DEBUG ---
# RUN echo ">>> Second uv sync complete. Checking venv again..."
# RUN if [ -d ".venv" ]; then echo ".venv exists. Final site-packages list:"; ls -l .venv/lib/python3.13/site-packages/ | grep -E "fastapi|uvicorn|watchfiles" || echo "Dependencies not found in site-packages after second sync"; else echo ".venv NOT found after second sync"; fi
# RUN echo ">>> Running uv pip list:" && uv pip list | grep -E "fastapi|uvicorn|watchfiles" || echo "Dependencies not found by uv pip list"
# # --- END DEBUG ---

# # CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
# # Try a more direct command for debugging, bypassing uvx initially to test the venv
# CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
