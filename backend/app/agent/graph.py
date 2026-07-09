from langgraph.graph import StateGraph, END

from app.agent.state import AgentState
from app.tools.log_interaction import log_interaction
from app.tools.edit_interaction import edit_interaction
from app.tools.search_interaction import search_interaction
from app.tools.summary_interaction import summary_interaction
from app.tools.followup_interaction import followup_interaction


def router(state: AgentState):

    text = state["user_input"].lower()
    words = text.split()

    if any(word in words for word in ["edit", "update", "change", "modify"]):
        state["tool"] = "edit"

    elif any(word in words for word in ["search", "find", "show", "list"]):
        state["tool"] = "search"

    elif any(word in words for word in ["summary", "summarize"]):
        state["tool"] = "summary"

    elif (
        "suggest" in words
        or "recommend" in words
        or "follow-up" in words
        or "followup" in words
        or ("follow" in words and "up" in words)
        or ("next" in words and "action" in words)
    ):
        state["tool"] = "followup"

    else:
        state["tool"] = "log"

    print("USER INPUT:", text)
    print("SELECTED TOOL:", state["tool"])

    return state


def execute_tool(state: AgentState):

    print("=" * 50)
    print("USER INPUT:", state["user_input"])
    print("SELECTED TOOL:", state["tool"])
    print("=" * 50)

    if state["tool"] == "log":

        saved = log_interaction(
            state["db"],
            state["user_input"]
        )

        state["response"] = {
            "message": (
                "✅ Interaction Logged Successfully!\n\n"
                f"👨‍⚕️ Doctor: {saved.doctor_name}\n"
                f"🏥 Hospital: {saved.hospital}\n"
                f"💊 Product: {saved.products_discussed}\n"
                f"📅 Follow-up: {saved.follow_up_date}"
            )
        }

    elif state["tool"] == "edit":

        updated = edit_interaction(
            state["db"],
            state["user_input"]
        )

        if isinstance(updated, dict):
            state["response"] = updated
        else:
            state["response"] = {
                "message": (
                    "✅ Interaction Updated Successfully!\n\n"
                    f"👨‍⚕️ Doctor: {updated.doctor_name}\n"
                    f"🏥 Hospital: {updated.hospital}\n"
                    f"💊 Product: {updated.products_discussed}\n"
                    f"📅 Follow-up: {updated.follow_up_date}"
                )
            }

    elif state["tool"] == "search":

        state["response"] = search_interaction(
            state["db"],
            state["user_input"]
        )

    elif state["tool"] == "summary":

        state["response"] = summary_interaction(
            state["db"],
            state["user_input"]
        )

    elif state["tool"] == "followup":

        state["response"] = followup_interaction(
            state["db"],
            state["user_input"]
        )

    return state


graph = StateGraph(AgentState)

graph.add_node("router", router)
graph.add_node("execute_tool", execute_tool)

graph.set_entry_point("router")

graph.add_edge("router", "execute_tool")
graph.add_edge("execute_tool", END)

crm_graph = graph.compile()