import { useState } from "react";
import useTasks from "../data/useTasks";

export default function AIChat() {
  const { tasks, addTask, updateTask } = useTasks();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("scrum");
  const [loading, setLoading] = useState(false);

  // Parse AI JSON safely
  function parseAIResponse(text) {
    try {
      const jsonStart = text.indexOf("JSON:");
      if (jsonStart === -1) return { human: text, json: null };

      const humanText = text.substring(0, jsonStart).replace("HUMAN_TEXT:", "").trim();
      const jsonText = text.substring(jsonStart + 5).trim();

      const jsonData = JSON.parse(jsonText);
      return { human: humanText, json: jsonData };
    } catch (err) {
      console.error("Failed to parse AI JSON:", err);
      return { human: text, json: null };
    }
  }

  async function send() {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message first
    setMessages(prev => [...prev, { you: input, bot: "..." }]);

    try {
      const res = await fetch("http://localhost:5000/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          tasks,
          sprintLength: 14,
          sprintOutputs: []
        })
      });

      const data = await res.json();
      const { human, json } = parseAIResponse(data.text);

      // Apply AI JSON changes
      if (json) {
        if (Array.isArray(json.newTasks)) {
          json.newTasks.forEach(task => addTask(task));
        }

        if (Array.isArray(json.updates)) {
          json.updates.forEach(u => {
            const { _id, ...fields } = u;
            updateTask(_id, fields);
          });
        }
      }

      // Update last message with AI human text
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1].bot = human;
        return copy;
      });

    } catch (err) {
      console.error("AI request failed:", err);
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1].bot = "AI request failed 😢";
        return copy;
      });
    }

    setInput("");
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>

      {/* Role Selector */}
      <div className="flex gap-2 mb-2">
        {["scrum", "product", "tech"].map(r => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-3 py-1 rounded ${
              role === r ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="bg-white p-4 rounded shadow h-[400px] overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div key={i} className="mb-4">
            <p><strong>You:</strong> {m.you}</p>
            <p className="text-blue-600 whitespace-pre-line"><strong>AI:</strong> {m.bot}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        className="border p-2 w-full mb-2"
        placeholder="Ask AI..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && send()}
        disabled={loading}
      />

      <button
        onClick={send}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
