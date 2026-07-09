import InteractionForm from "../components/InteractionForm";
import ChatAssistant from "../components/ChatAssistant";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        AI-First CRM HCP
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-4">
            Log HCP Interaction
          </h2>

          <InteractionForm />

        </div>

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-4">
            AI Assistant
          </h2>

          <ChatAssistant />

        </div>

      </div>

    </div>
  )
}

export default Dashboard