from typing import TypedDict, Optional
from datetime import date


class AgentState(TypedDict):
    user_input: str

    tool: str

    response: object

    db: Optional[object]

    doctor_name: Optional[str]

    hospital: Optional[str]

    specialty: Optional[str]

    interaction_type: Optional[str]

    products_discussed: Optional[str]

    summary: Optional[str]

    follow_up_date: Optional[date]