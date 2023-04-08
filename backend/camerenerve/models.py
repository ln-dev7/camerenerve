from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from camerenerve.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    messages = relationship("Message", backref="category", lazy=True)

    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            description=self.description,
            created_at=self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        )


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    category_id = Column(Integer, ForeignKey("categories.id"))

    def to_dict(self):
        return dict(
            id=self.id,
            text=self.text,
            category=self.category.name,
            created_at=self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        )