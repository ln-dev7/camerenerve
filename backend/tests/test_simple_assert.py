import pytest
from httpx import AsyncClient
from camerenerve.server import app


def test_assert():
    assert True is True


@pytest.mark.anyio
async def test_index():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/")
        assert response.status_code == 200
        assert response.json()["msg"] == "Hello Camerenerve API"
