FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt Makefile ./

RUN pip install -U pip && \
    pip install --no-cache-dir -r requirements.txt

COPY camerenerve camerenerve

EXPOSE 80

CMD ["uvicorn", "camerenerve.server:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]