import json

from fastapi.testclient import TestClient
import pytest
from pytest_mock import MockerFixture

from camerenerve.server import app
from tests.conftest import SessionLocal

@pytest.fixture
def test_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def test_client():
    return TestClient(app)


def test_create_category(test_client: MockerFixture):
    # Given
    category_data = {"name": "New Category"}

    # When
    response = test_client.post("/categories/", json=category_data)

    # Then
    assert response.status_code == 200
    assert response.json()["name"] == "New Category"
