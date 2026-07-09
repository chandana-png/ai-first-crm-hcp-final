from app.database import SessionLocal
from app.tools.edit_interaction import edit_interaction

db = SessionLocal()

interaction = edit_interaction(
    db,
    interaction_id=1,
    summary="Updated summary after discussion"
)

print(interaction)