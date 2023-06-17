from tests import client


def test_get_single_category(category_id):
    response = client.get(f"/categories/{category_id}")
    assert response.status_code == 200
    assert response.json()["id"] == category_id


def test_get_single_category_bad_id():
    response = client.get(f"/categories/2252")
    assert response.status_code == 404


def test_get_categories(random_name):
    response = client.get(f"/categories")
    actuel_num = len(response.json())
    assert response.status_code == 200
    response = client.post("/categories/", json={"name": random_name})
    response = client.get(f"/categories")
    assert response.status_code == 200
    assert len(response.json()) == actuel_num + 1


def test_create_category(random_name):
    category_data = {"name": random_name}
    response = client.post("/categories/", json=category_data)
    assert response.status_code == 200
    assert response.json()["name"] == random_name


def test_create_category_already_exist(random_name):
    category_data = {"name": random_name}
    response = client.post("/categories/", json=category_data)
    assert response.status_code == 200
    assert response.json()["name"] == random_name
    # try to recreate a category with the same name
    response = client.post("/categories/", json=category_data)
    # Then error code 500 shoud be drop
    assert response.status_code == 500