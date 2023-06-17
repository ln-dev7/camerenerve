from fastapi.testclient import TestClient

from camerenerve.server import app

client = TestClient(app)
client.headers["Content-Type"] = "application/json"