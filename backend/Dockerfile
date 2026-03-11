FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

FROM base AS dev

RUN chmod +x /app/entrypoint.dev.sh

CMD ["sh", "/app/entrypoint.dev.sh"]

FROM base AS prod

RUN chmod +x /app/entrypoint.prod.sh

CMD ["sh", "/app/entrypoint.prod.sh"]
