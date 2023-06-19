from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from camerenerve.database import Base, BaseModel


class Category(Base, BaseModel):
    __tablename__ = "categories"

    name = Column(String(250), nullable=False)
    description = Column(Text)
    messages = relationship("Message", backref="category", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at.strftime("%d/%m/%Y %H:%M:%S"),
        }


class Message(Base, BaseModel):
    __tablename__ = "messages"

    text = Column(Text, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "category_id": self.category_id,
            "category": self.category.name,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
