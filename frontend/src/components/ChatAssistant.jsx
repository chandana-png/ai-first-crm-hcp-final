import { useState } from "react";

const ChatAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! Describe your interaction with the HCP and I'll help you log it."
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "user",
        text: message
      }
    ]);

    setMessage("");
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
              className={`inline-block px-4 py-2 rounded-xl ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
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
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatAssistant;