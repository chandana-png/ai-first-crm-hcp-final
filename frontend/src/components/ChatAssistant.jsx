import { useState } from "react";
import api from "../services/api";

const ChatAssistant = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! Describe your interaction with the HCP and I'll help you log it.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/interaction/chat", {
        message: userMessage,
      });

      let reply = "";

      if (typeof response.data === "string") {
        reply = response.data;
      } else if (response.data.message) {
        reply = response.data.message;
      } else if (response.data.response) {
        reply = response.data.response;
      } else {
        reply = JSON.stringify(response.data);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Sorry, something went wrong while contacting the AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[650px]">

      <div className="flex-1 overflow-y-auto border rounded-lg p-3 bg-gray-50">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
            className={`inline-block px-4 py-3 rounded-xl max-w-[85%] whitespace-pre-line ${
                msg.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300"
            }`}
            >
            {msg.text}
            </div>
          </div>
        ))}

      </div>

      <div className="flex gap-2 mt-4">

        <input
          type="text"
          value={message}
          placeholder="Describe interaction..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-5 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
};

export default ChatAssistant;