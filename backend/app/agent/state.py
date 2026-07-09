from typing import TypedDict, Optional

class AgentState(TypedDict):
    user_input: str
    tool: str
    response: str
    db: Optional[object]