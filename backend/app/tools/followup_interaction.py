from sqlalchemy.orm import Session

from app.models import Interaction
from app.agent.llm import llm


def followup_interaction(db: Session, user_input: str):

    text = user_input.lower()

    words_to_remove = [
        "suggest",
        "recommend",
        "recommendation",
        "follow",
        "follow-up",
        "followup",
        "up",
        "next",
        "action",
        "actions",
        "for",
        "doctor",
        "interaction",
        "interactions",
        "dr.",
        "dr",
    ]

    query = text

    for word in words_to_remove:
        query = query.replace(word, "")

    query = " ".join(query.split())

    interactions = (
        db.query(Interaction)
        .filter(
            Interaction.doctor_name.ilike(f"%{query}%")
        )
        .all()
    )

    if not interactions:
        return {
            "message": "No interactions found."
        }

    interaction_text = ""

    for item in interactions:
        interaction_text += f"""
Doctor: {item.doctor_name}
Hospital: {item.hospital}
Interaction Type: {item.interaction_type}
Product: {item.products_discussed}
Summary: {item.summary}
Follow-up: {item.follow_up_date}

"""

    prompt = f"""
You are an AI CRM assistant.

Based on these HCP interactions, generate follow-up recommendations.

Include:

1. Doctor Name
2. Current Situation
3. Recommended Follow-up Actions (3-5 bullet points)
4. Priority (High/Medium/Low)

Interactions:

{interaction_text}
"""

    response = llm.invoke(prompt)

    return {
        "message": response.content
    }