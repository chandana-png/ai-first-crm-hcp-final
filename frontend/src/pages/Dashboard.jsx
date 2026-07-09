import { useEffect, useState } from "react";
import InteractionForm from "../components/InteractionForm";
import ChatAssistant from "../components/ChatAssistant";
import api from "../services/api";

const Dashboard = () => {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await api.get("/interaction/all");
      setInteractions(response.data);
    } catch (error) {
      console.error("Failed to fetch interactions", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        AI-First CRM HCP
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {/* Left Side */}

        <div className="col-span-2 space-y-6">

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-4">
              Log HCP Interaction
            </h2>

            <InteractionForm />

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-semibold">
                Recent Interactions
              </h2>

              <button
                onClick={fetchInteractions}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Refresh
              </button>

            </div>

            {interactions.length === 0 ? (

              <p className="text-gray-500">
                No interactions found.
              </p>

            ) : (

              <div className="space-y-4">

                {interactions.map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex justify-between">

                      <h3 className="font-bold text-lg">
                        👨‍⚕️ {item.doctor_name}
                      </h3>

                      <span className="text-sm text-gray-500">
                        {item.follow_up_date}
                      </span>

                    </div>

                    <p className="mt-2">
                      🏥 <strong>Hospital:</strong> {item.hospital}
                    </p>

                    <p>
                      💊 <strong>Product:</strong> {item.products_discussed}
                    </p>

                    <p>
                      📞 <strong>Interaction:</strong> {item.interaction_type}
                    </p>

                    <p className="mt-2 text-gray-700">
                      {item.summary}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

        {/* Right Side */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-4">
            AI Assistant
          </h2>

          <ChatAssistant />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;