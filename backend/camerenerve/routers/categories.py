from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from camerenerve.dependencies import get_db
from camerenerve.models import Category as CategoryModel
from camerenerve.schemas.categories import Category as CategorySchema
from camerenerve.schemas.categories import CategoryCreate

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=List[CategorySchema],
    responses={403: {"description": "Operation forbidden"}},
)
async def read_categories(db: Session = Depends(get_db)):
    categories = db.query(CategoryModel).all()
    return list(map(lambda cat: cat.to_dict(), categories))


@router.get(
    "/{category_id}",
    response_model=CategorySchema,
    responses={403: {"description": "Operation forbidden"}},
)
async def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(CategoryModel).filter_by(id=category_id).first()
    if not category:
        raise HTTPException(404, "Category Not Found!")
    else:
        return category.to_dict()


@router.post(
    "",
    response_model=CategorySchema,
    responses={403: {"description": "Operation forbidden"}},
)
async def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    try:
        cat = db.query(CategoryModel).filter_by(name=category.name).first()
        if cat:
            raise HTTPException(400, "Category already exists")
        db_category = CategoryModel(**category.dict())
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category.to_dict()
    except Exception as exc:
        raise HTTPException(500, f"Server Error {exc}!")
