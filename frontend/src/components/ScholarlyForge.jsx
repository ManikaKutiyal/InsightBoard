import React, { useState, useEffect, useRef, useContext } from "react";
import { useSocket } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { FiSend, FiUsers, FiMessageSquare } from "react-icons/fi";

const GlassCard = ({ children, className = "" }) => (
    <div className={`bg-white/70 backdrop-blur-md border border-white/50 rounded-[2.5rem] shadow-sm ${className}`}>
        {children}
    </div>
);

export default function ScholarlyForge() {
    const socket = useSocket();
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        socket.on("receive-chat-message", (msg) => {
            console.log("Forge Intelligence Received:", msg);
            setMessages((prev) => {
                // Prevent showing the same message twice
                const exists = prev.some(m => m.timestamp === msg.timestamp && m.text === msg.text && m.userId === msg.userId);
                if (exists) return prev;
                return [...prev, msg];
            });
            setTyping("");
        });

        socket.on("user-typing", (username) => {
            setTyping(`${username} is crafting a thought...`);
            setTimeout(() => setTyping(""), 3000);
        });

        return () => {
            socket.off("receive-chat-message");
            socket.off("user-typing");
        };
    }, [socket]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim() || !socket) return;

        const msgData = {
            user: user?.name || "Scholar Guest",
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            userId: user?.id || user?._id // Fallback just in case
        };

        // Aggressively update local state for a snappy feel
        setMessages(prev => [...prev, msgData]);
        socket.emit("send-chat-message", msgData);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
        else if (socket) socket.emit("typing", user?.name || "Guest");
    };

    return (
        <div className="h-[calc(100vh-72px)] bg-[#FDF8F5] p-8 flex gap-8">
            {/* LEFT: CHAT AREA */}
            <div className="flex-1 flex flex-col h-full gap-6">
                <header className="flex items-center gap-4 mb-2">
                    <div className="bg-[#5B4B49] p-3 rounded-2xl text-white shadow-lg">
                        <FiMessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#5B4B49]">Collab Hub</h1>
                        <p className="text-[#F8AFA6] font-bold text-xs uppercase tracking-widest">Global Discussion • Live Insights</p>
                    </div>
                </header>

                <GlassCard className="flex-1 flex flex-col overflow-hidden p-8">
                    <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 grayscale">
                                <FiMessageSquare size={64} className="mb-4" />
                                <p className="font-bold">No messages in the forge yet.<br />Start a scholarly debate.</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex flex-col ${msg.userId === (user?.id || user?._id) ? "items-end" : "items-start"}`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-[#5B4B49]/50">{msg.user}</span>
                                    <span className="text-[10px] font-bold opacity-30">{msg.timestamp}</span>
                                </div>
                                <div className={`
                    max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-sm
                    ${msg.userId === (user?.id || user?._id)
                                        ? "bg-[#F8AFA6] text-white rounded-tr-none"
                                        : "bg-white text-[#5B4B49] rounded-tl-none border border-[#FADCD9]"
                                    }
                `}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>

                    {/* INPUT AREA */}
                    <div className="mt-8 pt-6 border-t border-[#FADCD9]/50">
                        {typing && <p className="text-[10px] font-bold text-[#F8AFA6] italic mb-2 animate-pulse">{typing}</p>}
                        <div className="flex gap-4 items-center">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Share an insight or ask a question..."
                                className="flex-1 bg-white/50 border-2 border-transparent focus:border-[#FADCD9] outline-none px-6 py-4 rounded-2xl text-sm font-medium transition-all"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-[#F8AFA6] text-white p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* RIGHT: LIVE HUD */}
            <aside className="w-80 flex flex-col gap-6">
                <GlassCard className="p-6 bg-gradient-to-br from-[#5B4B49] to-[#3D3231] text-white">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-4">Forge Status</h3>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center animate-pulse">
                            <FiUsers size={20} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black">{messages.length > 0 ? "Active" : "Stable"}</h4>
                            <p className="text-[10px] font-bold uppercase opacity-60">System Synchronized</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="flex-1 p-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#5B4B49]/50 mb-6">Recent Activities</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="h-2 w-2 bg-[#F8AFA6] rounded-full mt-1 shrink-0" />
                            <p className="text-xs font-bold text-[#5B4B49]/70 leading-relaxed">Global discussion is heating up. Mention a task to link it.</p>
                        </div>
                        {/* Mock data for now */}
                        <div className="flex gap-4">
                            <div className="h-2 w-2 bg-[#FADCD9] rounded-full mt-1 shrink-0" />
                            <p className="text-xs font-bold text-[#5B4B49]/30 leading-relaxed italic">End-to-end encryption active for scholarly integrity.</p>
                        </div>
                    </div>
                </GlassCard>
            </aside>
        </div>
    );
}
