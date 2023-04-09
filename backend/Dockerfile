FROM python:3.10-slim

WORKDIR /app

COPY data.sqlite requirements.txt Makefile .env ./

RUN pip install -U pip && \
    pip install --no-cache-dir -r requirements.txt

COPY camerenerve camerenerve

EXPOSE 8000

CMD ["uvicorn", "onacut.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]