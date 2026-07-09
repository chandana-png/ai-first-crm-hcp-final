from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models import Interaction


def search_interaction(db: Session, user_input: str):

    text = user_input.lower()

    words_to_remove = [
        "find",
        "search",
        "show",
        "list",
        "interaction",
        "interactions",
    ]

    query = text

    for word in words_to_remove:
        query = query.replace(word, "")

    query = query.strip()

    results = (
        db.query(Interaction)
        .filter(
            or_(
                Interaction.doctor_name.ilike(f"%{query}%"),
                Interaction.hospital.ilike(f"%{query}%"),
                Interaction.products_discussed.ilike(f"%{query}%"),
            )
        )
        .all()
    )

    if not results:
        return {
            "message": "No interactions found."
        }

    message = "🔍 Search Results\n\n"

    for item in results:
        message += (
            f"👨‍⚕️ Doctor: {item.doctor_name}\n"
            f"🏥 Hospital: {item.hospital}\n"
            f"💊 Product: {item.products_discussed}\n"
            f"📞 Interaction: {item.interaction_type}\n"
            f"📅 Follow-up: {item.follow_up_date}\n"
            f"📝 Summary: {item.summary}\n\n"
        )

    return {
        "message": message
    }