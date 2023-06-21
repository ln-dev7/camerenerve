from tests import client


def test_assert():
    assert True is True


def test_index():
    response = client.get(f"/")
    assert response.status_code == 200
    assert response.json()["msg"] == "Hello Camerenerve API"
