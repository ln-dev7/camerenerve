import os
from datetime import datetime

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///test_data.sqlite")

if "sqlite" in DATABASE_URL:
    con_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, connect_args=con_args)
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
