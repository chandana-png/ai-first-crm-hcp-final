from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.agent.agent import run_agent
from app.database import get_db
from app.tools.log_interaction import log_interaction

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