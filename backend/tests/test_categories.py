import pytest
from httpx import AsyncClient
from camerenerve.server import app

@pytest.mark.anyio
async def test_get_single_category(category_id):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/categories/{category_id}")
    assert response.status_code == 200
    assert response.json()["id"] == category_id


@pytest.mark.anyio
async def test_get_single_category_bad_id():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/categories/2252")
    assert response.status_code == 404


@pytest.mark.anyio
async def test_get_categories(random_name):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/categories")
    actuel_num = len(response.json())
    assert response.status_code == 200
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/categories", json={"name": random_name})
    async with AsyncClient(app=app, base_url="http://test") as ac:
        res = await ac.get("/categories")
    assert res.status_code == 200
    assert len(res.json()) == actuel_num + 1


@pytest.mark.anyio
async def test_create_category(random_name):
    category_data = {"name": random_name}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/categories", json=category_data)
    assert response.status_code == 200
    assert response.json()["name"] == random_name


@pytest.mark.anyio
async def test_create_category_already_exist(random_name):
    category_data = {"name": random_name}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/categories", json=category_data)
    assert response.status_code == 200
    assert response.json()["name"] == random_name
    # try to recreate a category with the same name
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/categories", json=category_data)
    # Then error code 500 shoud be drop
    assert response.status_code == 500