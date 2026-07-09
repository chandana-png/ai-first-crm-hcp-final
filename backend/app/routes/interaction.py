from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.agent.agent import run_agent
from app.database import get_db
from app.schemas import InteractionCreate
from app.services.interaction_service import (
    create_interaction,
    get_all_interactions,
)

router = APIRouter(
    prefix="/interaction",
    tags=["Interaction"]
)


class ChatInput(BaseModel):
    message: str


@router.post("/chat")
def chat(chat: ChatInput, db: Session = Depends(get_db)):
    result = run_agent(chat.message, db)
    return result["response"]


@router.post("/manual")
def manual_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    saved = create_interaction(db, interaction)
    return saved


@router.get("/all")
def get_interactions(db: Session = Depends(get_db)):
    interactions = get_all_interactions(db)
    return interactions