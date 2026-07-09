from app.tools.log_interaction import extract_interaction

interaction = extract_interaction(
    """
I met Dr Sharma at Apollo Hospital.
We discussed CardioPlus.
He requested clinical papers.

Follow up next Tuesday.
"""
)

print(interaction)