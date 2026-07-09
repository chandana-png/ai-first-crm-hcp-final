from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime
from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    doctor_name = Column(String, nullable=False)

    hospital = Column(String)

    specialty = Column(String)

    interaction_type = Column(String)

    products_discussed = Column(String)

    summary = Column(String)

    follow_up_date = Column(Date)

    created_at = Column(DateTime, default=datetime.utcnow)