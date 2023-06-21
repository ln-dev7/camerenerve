from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from camerenerve.routers.categories import router as categories_router
from camerenerve.routers.messages import router as messages_router

app = FastAPI(docs_url="/docs")
app.include_router(categories_router)
app.include_router(messages_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # origins we allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"msg": "Hello Camerenerve API"}
