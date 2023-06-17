from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from camerenerve.dependencies import get_db
from camerenerve.models import Category as CategoryModel
from camerenerve.models import Message as MessageModel
from camerenerve.schemas.messages import Message as MessageSchema
from camerenerve.schemas.messages import MessageCreate

router = APIRouter(
    prefix="/messages",
    tags=["messages"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[MessageSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_messages(
    db: Session = Depends(get_db),
    page: int = Query(0, ge=0),
    limit: int = Query(10, ge=10),
):
    messages = db.query(MessageModel).limit(limit).offset(limit * page)
    return list(map(lambda mess: mess.to_dict(), messages))


@router.get(
    "/{message_id}",
    response_model=MessageSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def get_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(MessageModel).filter_by(id=message_id).first()
    if not message:
        raise HTTPException(404, "Message Not Found!")
    else:
        return message.to_dict()


@router.get(
    "/category/{category_id}",
    response_model=List[MessageSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def get_message_by_category(category_id: int, db: Session = Depends(get_db)):
    messages = db.query(MessageModel).filter_by(category_id=category_id).all()
    return list(map(lambda mess: mess.to_dict(), messages))


@router.post(
    "/",
    response_model=MessageSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    category: CategoryModel = db.query(CategoryModel).get(message.category_id)
    if not category:
        raise HTTPException(404, "Message Not Found!")

    try:
        db_message = MessageModel(**message.dict())
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return db_message.to_dict()
    except Exception as exc:
        raise HTTPException(500, f"Server Error {exc}!")
