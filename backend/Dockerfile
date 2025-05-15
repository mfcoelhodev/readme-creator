# FROM python:3.13-alpine
FROM python:3.13-slim

RUN pip install uv

WORKDIR /backend

COPY ./pyproject.toml ./user_mod/.pyproject.toml ./readmegen_mod/.pyproject.toml ./

RUN uv pip install --no-cache-dir --upgrade --all-extras --system -r pyproject.toml

COPY . /backend

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
CMD ["uvicorn", "main:app", "--reload", "--reload-include .env"]


#teste