from app.agent.graph import crm_graph


def run_agent(user_input: str, db):
    result = crm_graph.invoke(
        {
            "user_input": user_input,
            "tool": "",
            "response": "",
            "db": db,
        }
    )

    return result