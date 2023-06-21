from dotenv import load_dotenv
from fastapi.testclient import TestClient
from camerenerve.server import app
load_dotenv("../../.env.test")

client = TestClient(app)
client.headers["content-type"] = "application/json"