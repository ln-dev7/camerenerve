import contextlib
import os
from uuid import uuid4

import pytest
from pytest_mock import MockerFixture
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from tests import client

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///test_data.sqlite")

@pytest.fixture(autouse=True)
def session_local(mocker: MockerFixture):
    """
    database as a fixture
    {
     "categories": [],
     "message": [],
    }
    Where we're going to add, delete, update values along the way
    """

    engine = create_engine(
        os.path.join("sqlite:///tests/fixtures/test_data.sqlite"),
        connect_args={"check_same_thread": False},
    )

    # we need to have a fresh looking test db, so for all our tables we're
    # going to delete everything
    with contextlib.closing(engine.connect()) as con:
        trans = con.begin()
        for table in engine.table_names():
            con.execute(f"DELETE FROM {table} WHERE 1;")
        trans.commit()

        SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)

        mocker.patch("camerenerve.dependencies.SessionLocal", SessionLocal)


@pytest.fixture
def random_name() -> str:
    return str(uuid4())


@pytest.fixture
def category_id(random_name: str) -> int:
    response_district = client.post(
        "/categories/", json={"name": random_name}
    )
    return response_district.json()["id"]
