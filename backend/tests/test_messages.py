import pytest
from httpx import AsyncClient
from camerenerve.server import app


@pytest.mark.anyio
async def htest_get_single_message(message_id):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/messages/{message_id}")
    assert response.status_code == 200
    assert response.json()["id"] == message_id


@pytest.mark.anyio
async def test_get_single_message_bad_id():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/messages/1652")
    assert response.status_code == 404


@pytest.mark.anyio
async def test_get_messages():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/messages")
    assert response.status_code == 200
    assert isinstance(response.json(), list) == True


@pytest.mark.anyio
async def htest_message_by_categories(category_id):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/messages/category/{category_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), list) == True


@pytest.mark.anyio
async def htest_create_message(category_id, random_text):
    message_data = {
        "category_id": category_id,
        "text": random_text,
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/messages", json=message_data)
    assert response.status_code == 200
    assert response.json()["text"] == random_text


@pytest.mark.anyio
async def htest_create_message_with_non_existing_category(category_id, random_text):
    message_data = {
        "category_id": category_id,
        "text": random_text,
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/messages", json=message_data)
    assert response.status_code == 200
    assert response.json()["text"] == random_text
    # try to recreate a message with random category
    message_data["category_id"] = category_id + 142
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/messages", json=message_data)
    assert response.status_code == 404