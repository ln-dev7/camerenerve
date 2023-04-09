from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from camerenerve.database import Base, BaseModel


class Category(Base, BaseModel):
    __tablename__ = "categories"

    name = Column(String(250), nullable=False)
    description = Column(Text)
    messages = relationship("Message", backref="category", lazy=True)


class Message(Base, BaseModel):
    __tablename__ = "messages"

    text = Column(Text, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
