from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.routes import router as api_router
from core.database import int_db
int_db()

app = FastAPI(
    title="AI Study Buddy",
    version="1.0.0",
    description="An API backend for AI-powered study assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(api_router, prefix="/api/v1", tags=["AI Study Buddy"])

@app.get("/")
async def root():
    return {"message": "Welcome to AI Study Buddy site!"}