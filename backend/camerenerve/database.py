import os
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///data.sqlite")

if "sqlite" in DATABASE_URL:
    con_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, connect_args=con_args)
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class BaseModel:
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)  # type:ignore

    def to_dict(self, skipkeys=[]):
        return {k: v for k, v in self.__dict__.items() if k not in skipkeys}
