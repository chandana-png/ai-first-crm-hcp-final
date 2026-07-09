from app.agent.graph import crm_graph

result = crm_graph.invoke({
    "user_input": "Log my meeting with Dr Sharma",
    "tool": "",
    "response": ""
})

print(result)