import json
import re
from datetime import date, timedelta
from sqlalchemy.orm import Session

from app.agent.llm import llm
from app.schemas import InteractionCreate
from app.services.interaction_service import create_interaction


def convert_relative_date(text: str):

    if not text:
        return None

    text = text.lower().strip()

    today = date.today()

    weekdays = {
        "monday":0,
        "tuesday":1,
        "wednesday":2,
        "thursday":3,
        "friday":4,
        "saturday":5,
        "sunday":6
    }

    if text.startswith("next "):

        day = text.replace("next ","")

        if day in weekdays:

            target = weekdays[day]

            days = (target - today.weekday() + 7) % 7

            if days == 0:
                days = 7

            return today + timedelta(days=days)

    return None


def extract_interaction(user_input: str):

    prompt = f"""
You are an AI CRM assistant.

Extract the interaction.

Return ONLY a JSON object.

{{
"doctor_name":"",
"hospital":"",
"specialty":"",
"interaction_type":"",
"products_discussed":"",
"summary":"",
"follow_up_date":""
}}

Conversation:

{user_input}
"""

    response = llm.invoke(prompt)

    cleaned = response.content.strip()

    cleaned = re.sub(r"^```(?:json)?", "", cleaned)
    cleaned = re.sub(r"```$", "", cleaned)
    cleaned = cleaned.strip()

    data = json.loads(cleaned)

    data["follow_up_date"] = convert_relative_date(
        data.get("follow_up_date","")
    )

    return InteractionCreate(**data)


def log_interaction(db: Session, user_input: str):

    interaction = extract_interaction(user_input)

    saved = create_interaction(db, interaction)

    return saved