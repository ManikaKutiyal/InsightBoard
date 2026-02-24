import React, { useState, useRef, useEffect, useContext } from "react";
import { FiSend, FiCpu, FiUser } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

import { API_BASE } from "../config";

export default function AIChatPanel({ tasks, addTask, updateTask }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("scrum");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // --- AUTO SCROLL ---
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages]);

  // --- LOGIC (UNTOUCHED) ---
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
    setMessages(prev => [...prev, { you: input, bot: "..." }]);

    try {
      const res = await fetch(`${API_BASE}/ai`, {
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

      if (data.error) throw new Error(data.error);
      if (!data.text) throw new Error("No response from AI");

      const { human, json } = parseAIResponse(data.text);

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

      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1].bot = human;
        return copy;
      });
    } catch (err) {
      console.error("AI request failed:", err);
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1].bot = `Error: ${err.message || "Something went wrong"}`;
        return copy;
      });
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 1. Header & Role Selector */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#F8AFA6] rounded-xl flex items-center justify-center text-white shadow-sm">
            <FiCpu size={18} />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#5B4B49]">AI Co-Pilot</h2>
        </div>

        <div className="flex bg-[#FDF8F5] p-1 rounded-2xl border border-[#FADCD9]/50">
          {["scrum", "product", "tech"].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all ${role === r ? "bg-white text-[#F8AFA6] shadow-sm" : "text-[#5B4B49]/40 hover:text-[#5B4B49]"
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Messages Window */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center mt-10 px-4">
            <span className="text-4xl">✨</span>
            <p className="text-xs font-bold text-[#5B4B49]/40 mt-2 uppercase tracking-widest">How can I help you today, {user?.name?.split(" ")[0] || "there"}?</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className="space-y-3">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-[#5B4B49] text-white p-3 rounded-2xl rounded-tr-none text-xs font-medium shadow-sm">
                {m.you}
              </div>
            </div>

            {/* Bot Message */}
            <div className="flex justify-start items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F8AFA6]/20 flex items-center justify-center text-[#F8AFA6] flex-shrink-0 mt-1">
                <FiCpu size={12} />
              </div>
              <div className="max-w-[80%] bg-white border border-[#FADCD9]/50 p-3 rounded-2xl rounded-tl-none text-xs text-[#5B4B49] leading-relaxed shadow-sm whitespace-pre-line">
                {m.bot}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 3. Input Area */}
      <div className="mt-6 relative">
        <input
          className="w-full bg-[#FDF8F5] border-none rounded-[1.5rem] py-4 pl-5 pr-14 text-xs font-bold text-[#5B4B49] placeholder:text-[#5B4B49]/30 focus:ring-2 focus:ring-[#F8AFA6]/20 transition-all outline-none"
          placeholder="Ask me to add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className={`absolute right-2 top-2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${loading || !input.trim() ? "bg-[#5B4B49]/10 text-white" : "bg-[#F8AFA6] text-white shadow-lg hover:scale-105 active:scale-95"
            }`}
        >
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSend size={16} />}
        </button>
      </div>
    </div>
  );
}