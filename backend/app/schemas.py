from datetime import date
from typing import Optional

from pydantic import BaseModel


class InteractionCreate(BaseModel):
    doctor_name: str
    hospital: Optional[str] = None
    specialty: Optional[str] = None
    interaction_type: str
    products_discussed: Optional[str] = None
    summary: Optional[str] = None
    follow_up_date: Optional[date] = None


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True