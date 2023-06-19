FROM python:3.7-slim

WORKDIR /app

COPY requirements.txt Makefile ./

RUN pip install -U pip && \
    pip install --no-cache-dir -r requirements.txt

COPY camerenerve camerenerve

EXPOSE 8000

CMD ["uvicorn", "camerenerve.server:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]