import json
import re
from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.agent.llm import llm
from app.models import Interaction


def convert_relative_date(text: str):
    if not text:
        return None

    text = text.lower().strip()
    today = date.today()

    weekdays = {
        "monday": 0,
        "tuesday": 1,
        "wednesday": 2,
        "thursday": 3,
        "friday": 4,
        "saturday": 5,
        "sunday": 6,
    }

    if text.startswith("next "):
        day = text.replace("next ", "")
        if day in weekdays:
            target = weekdays[day]
            days = (target - today.weekday() + 7) % 7
            if days == 0:
                days = 7
            return today + timedelta(days=days)

    return None


def edit_interaction(db: Session, user_input: str):

    prompt = f"""
You are an AI CRM assistant.

Extract ONLY the fields to edit.

Return ONLY JSON.

{{
"doctor_name":"",
"summary":"",
"products_discussed":"",
"follow_up_date":""
}}

User Request:

{user_input}
"""

    response = llm.invoke(prompt)

    cleaned = response.content.strip()
    cleaned = re.sub(r"^```(?:json)?", "", cleaned)
    cleaned = re.sub(r"```$", "", cleaned)
    cleaned = cleaned.strip()

    data = json.loads(cleaned)

    interaction = (
        db.query(Interaction)
        .filter(Interaction.doctor_name.ilike(f"%{data['doctor_name']}%"))
        .order_by(Interaction.id.desc())
        .first()
    )

    if not interaction:
        return {
            "message": "Doctor not found."
        }

    if data.get("summary"):
        interaction.summary = data["summary"]

    if data.get("products_discussed"):
        interaction.products_discussed = data["products_discussed"]

    if data.get("follow_up_date"):
        interaction.follow_up_date = convert_relative_date(
            data["follow_up_date"]
        )

    db.commit()
    db.refresh(interaction)

    return interaction