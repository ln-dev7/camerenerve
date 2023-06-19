from tests import client


def test_get_single_message(message_id):
    response = client.get(f"/messages/{message_id}")
    assert response.status_code == 200
    assert response.json()["id"] == message_id


def test_get_single_message_bad_id():
    response = client.get(f"/messages/1652")
    assert response.status_code == 404


def test_get_messages():
    response = client.get("/messages")
    assert response.status_code == 200
    assert isinstance(response.json(), list) == True


def test_message_by_categories(category_id):
    response = client.get(f"/messages/category/{category_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), list) == True


def test_create_message(category_id, random_text):
    message_data = {
        "category_id": category_id,
        "text": random_text,
    }
    response = client.post("/messages", json=message_data)
    assert response.status_code == 200
    assert response.json()["text"] == random_text


def test_create_message_with_non_existing_category(category_id, random_text):
    message_data = {
        "category_id": category_id,
        "text": random_text,
    }
    response = client.post("/messages", json=message_data)
    assert response.status_code == 200
    assert response.json()["text"] == random_text
    # try to recreate a message with random category
    message_data["category_id"] = category_id + 142
    response = client.post("/messages", json=message_data)
    assert response.status_code == 404