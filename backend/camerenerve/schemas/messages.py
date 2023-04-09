from pydantic import BaseModel


class MessageBase(BaseModel):
    text: str


class MessageCreate(MessageBase):
    category_id: int


class Message(MessageBase):
    id: int
    category_id: str
    created_at: str

    class Config:
        orm_mode = True
