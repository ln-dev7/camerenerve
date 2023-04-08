from typing import List
from datetime import datetime
from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix="/messages",
    tags=["messages"],
    responses={404: {"description": "Not found"}},
)