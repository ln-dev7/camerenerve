from tests import client


def test_create_category(random_name):
    # Given
    category_data = {"name": random_name}

    # When
    response = client.post("/categories/", json=category_data)

    # Then
    assert response.status_code == 200
    assert response.json()["name"] == random_name


def test_create_category_already_exist(random_name):
    # Given
    category_data = {"name": random_name}

    # When
    response = client.post("/categories/", json=category_data)

    # Then
    assert response.status_code == 200
    assert response.json()["name"] == random_name

    # try to recreate a category with the same name
    response = client.post("/categories/", json=category_data)

    # Then error code 500 shoud be drop
    assert response.status_code == 500