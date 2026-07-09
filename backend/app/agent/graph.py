from langgraph.graph import StateGraph, END

from app.agent.state import AgentState
from app.tools.log_interaction import log_interaction


def router(state: AgentState):

    text = state["user_input"].lower()

    # Edit interaction
    if any(word in text for word in ["edit", "update", "change", "modify"]):
        state["tool"] = "edit"

    # Search interaction
    elif any(word in text for word in ["search", "find", "show", "list"]):
        state["tool"] = "search"

    # Summary
    elif any(word in text for word in ["summary", "summarize"]):
        state["tool"] = "summary"

    # Follow-up suggestions (only when the user is asking for advice)
    elif (
        "suggest follow" in text
        or "follow-up suggestion" in text
        or "next action" in text
        or "recommend follow-up" in text
    ):
        state["tool"] = "followup"

    # Default: log a new interaction
    else:
        state["tool"] = "log"

    return state


graph = StateGraph(AgentState)

graph.add_node("router", router)

graph.add_node("execute_tool", execute_tool)

graph.set_entry_point("router")

graph.add_edge("router", "execute_tool")

graph.add_edge("execute_tool", END)

crm_graph = graph.compile()