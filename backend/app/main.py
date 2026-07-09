from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routes.interaction import router as interaction_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-First CRM HCP",
    description="AI-powered CRM for Healthcare Professionals",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Welcome to AI-First CRM HCP Backend!"
    }