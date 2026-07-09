from sqlalchemy.orm import Session

from app.models import Interaction
from app.schemas import InteractionCreate


def create_interaction(db: Session, interaction: InteractionCreate):
    db_interaction = Interaction(
        doctor_name=interaction.doctor_name,
        hospital=interaction.hospital,
        specialty=interaction.specialty,
        interaction_type=interaction.interaction_type,
        products_discussed=interaction.products_discussed,
        summary=interaction.summary,
        follow_up_date=interaction.follow_up_date,
    )

    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)

    return db_interaction