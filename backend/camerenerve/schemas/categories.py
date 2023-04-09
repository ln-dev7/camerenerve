from typing import Union
from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    description: Union[str, None] = None


class Category(CategoryBase):
    id: int
    description: Union[str, None] = None
    created_at: str

    class Config:
        orm_mode = True
