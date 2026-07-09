from sqlalchemy.orm import Session

from app.models import Interaction
from app.agent.llm import llm


def summary_interaction(db: Session, user_input: str):

    text = user_input.lower()

    words_to_remove = [
        "summary",
        "summarize",
        "interaction",
        "interactions",
        "of",
        "for",
        "doctor",
        "dr.",
        "dr",
    ]

    query = text

    for word in words_to_remove:
        query = query.replace(word, "")

    query = query.strip()

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

Read the following HCP interactions and prepare a concise sales summary.

Include:

1. Doctor Name
2. Total Interactions
3. Products Discussed
4. Overall Discussion
5. Recommended Next Action

Interactions:

{interaction_text}
"""

    response = llm.invoke(prompt)

    return {
        "message": response.content
    }