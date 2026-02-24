import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { IoSettings } from "react-icons/io5";
import { GiSunflower } from "react-icons/gi";
import { FiSmile, FiSun, FiCloud, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../config";
import useTasks from "../data/useTasks";
// ProfessionalDashboard
// --- REFINED SUB-COMPONENTS ---

const SidebarItem = ({ emoji, label, active = false }) => (
  <div className={`group flex flex-col items-center justify-center w-20 h-20 mb-4 cursor-pointer rounded-3xl transition-all duration-300 ${active ? 'bg-[#F8AFA6] text-white shadow-lg' : 'text-[#5B4B49] hover:bg-white'}`}>
    <span className="text-2xl mb-1">{emoji}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/50 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);
const today = new Date();
const weekday = today.toLocaleString("default", { weekday: "long" });

// --- MAIN DASHBOARD ---

export default function ProfessionalDashboard() {

  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  // const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const { tasks } = useTasks();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [location, setLocation] = useState("Fetching location…");

  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const chartData = [
    { name: "Completed", value: done },
    { name: "Remaining", value: total - done || 1 },
  ];


  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `${API_BASE}/auth/location?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          const country = data.address.country;

          setLocation(`${city}, ${country}`);
        } catch (err) {
          setLocation("Location error");
        }
      },
      () => {
        setLocation("Permission denied");
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex text-[#5B4B49] font-sans selection:bg-[#F8AFA6]/30">

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">

        {/* HEADER SECTION: Welcome + Floating Clock */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
                alt="avatar"
                className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-400 w-5 h-5 rounded-full border-4 border-[#FDF8F5]"></div>
            </div>
            <div>
              <p className="text-[#F8AFA6] font-bold text-sm uppercase tracking-tighter mb-1">
                {location} • {weekday}
              </p>

              <h1 className="text-4xl font-black tracking-tight">
                Welcome,{" "}
                <span className="text-[#F8AFA6]">
                  {user?.name || "Guest"}
                </span>
              </h1>
            </div>
          </div>

          {/* FLOATING CLOCK (No Box) */}
          <div className="flex flex-col items-end">
            <div className="text-6xl font-black text-[#5B4B49]/80 tracking-tighter leading-none">
              {time}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-1.5 w-1.5 bg-[#F8AFA6] rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-40">System Active</span>
            </div>
          </div>
        </header>

        {/* TOP ROW: Stats & Mini Cal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

          {/* Progress Card */}
          <GlassCard className="lg:col-span-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white/80 to-[#FADCD9]/20">
            <div className="relative h-40 w-40 flex-none">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  {/* quick */}
                  <Pie
                    data={chartData}
                    innerRadius={50}
                    outerRadius={65}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#F8AFA6" />
                    <Cell fill="#5B4B49" fillOpacity={0.05} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">{percent}%</span>
                <span className="text-[10px] uppercase font-bold opacity-40">Done</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black mb-2">Project Velocity</h3>

              <p className="text-sm text-[#5B4B49]/70 mb-4 leading-relaxed">
                You’ve completed <span className="font-bold text-[#F8AFA6]">{done}</span> out of{" "}
                <span className="font-bold text-[#5B4B49]">{total}</span> tasks today.
                {total > 0 && (
                  <>
                    {" "}That's{" "}
                    <span className="font-bold text-[#F8AFA6]">
                      {percent}%
                    </span>{" "}
                    of your workload.
                  </>
                )}
              </p>

              <button className="bg-[#5B4B49] text-white px-6 py-2 rounded-2xl text-xs font-bold hover:bg-[#F8AFA6] transition-colors shadow-md">
                View Report
              </button>
            </div>
          </GlassCard>
          {/* pablo */}
          {/* Calendar Card */}
          <GlassCard className="lg:col-span-4 bg-white">
            <CalendarCardOldUpgraded />
          </GlassCard>
        </div>

        {/* BOTTOM ROW: Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <MoodTrackerCard />

          <div className="space-y-6">
            <QuoteCard />
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6">
              <p className="text-indigo-600 font-bold text-sm flex items-center gap-3">
                <span className="text-xl">🤖</span>"{user?.name || "Guest"}, you're ahead of schedule. Take a 5-minute coffee break!"
              </p>
            </div>
          </div>

          <TaskListFiller />

        </div>
      </main>
    </div>
  );
}

// --- UPDATED WIDGETS ---

function MoodTrackerCard() {
  const [selected, setSelected] = useState(1);

  const moods = [
    { icon: <FiSmile />, label: "Joyful" },
    { icon: <FiSun />, label: "Energetic" },
    { icon: <FiCloud />, label: "Calm" },
    { icon: <FiMoon />, label: "Tired" },
  ];

  return (
    <GlassCard className="bg-[#EBF5EE]/50 border-[#C7E3D0]/50">
      <h3 className="text-sm font-black uppercase tracking-widest opacity-60 mb-6">
        Current Vibe
      </h3>

      {/* Mood Buttons */}
      <div className="flex justify-between items-center bg-white/40 p-2 rounded-2xl border border-white">
        {moods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all 
                ${selected === i ? "bg-white shadow-md scale-110 text-[#e79287]" : "text-[#5B4B49]/40 hover:bg-white/60 hover:scale-105"}
              `}
          >
            {m.icon}
          </button>
        ))}
      </div>

      {/* Dynamic Mood Label */}
      <p className="mt-6 text-xs font-bold italic text-center text-[#e79287]/70">
        “Today you're feeling {moods[selected].label.toLowerCase()}.”
      </p>
    </GlassCard>
  );
}

function QuoteCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-[#FADCD9] flex items-center gap-4">
      <span className="text-3xl">✨</span>
      <p className="text-sm font-medium italic leading-snug">"Progress is progress, no matter how small."</p>
    </div>
  );
}
// usa
function TaskListFiller() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  });

  const [input, setInput] = useState("");

  const addNote = () => {
    if (!input.trim()) return;
    const updated = [...notes, input];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setInput("");
  };

  return (
    <GlassCard className="bg-[#F3F0FF]/50 border-[#DCD6F7]/50">
      <h3 className="font-black mb-4 text-sm uppercase opacity-60">Quick Notes ✏️</h3>

      <div className="space-y-3">
        {notes.map((note, i) => (
          <div
            key={i}
            className="bg-white/80 p-4 rounded-2xl text-[13px] font-bold flex items-center gap-3 border shadow-sm"
          >
            <div className="w-2 h-2 bg-[#F8AFA6] rounded-full" /> {note}
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add note..."
          className="flex-1 px-3 py-2 rounded-xl text-sm border"
        />
        <button
          onClick={addNote}
          className="bg-[#F8AFA6] text-white px-4 rounded-xl text-xs"
        >
          Add
        </button>
      </div>
    </GlassCard>
  );
}


function CalendarCardOldUpgraded() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white p-3">
      {/* HEADER (new, small, clean) */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-lg text-[#5B4B49]">
          {now.toLocaleString("default", { month: "long" })}
        </h3>
        <span className="text-xs font-bold text-[#F8AFA6] bg-[#FADCD9]/30 px-2 py-1 rounded-lg">
          {year}
        </span>
      </div>

      {/* WEEKDAY LABELS */}
      <div className="grid grid-cols-7 gap-2 text-[10px] font-bold opacity-40 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      {/* relative */}
      {/* DAYS GRID (same vibe as old) */}
      <div className="grid grid-cols-7 gap-2">
        {blanks.map((_, i) => (
          <div key={`b-${i}`} />
        ))}

        {days.map(day => (
          <div
            key={day}
            className={`h-8 flex items-center justify-center text-[10px] font-bold rounded-xl transition-all
                ${day === today
                ? "bg-[#F8AFA6] text-white shadow-lg"
                : "hover:bg-[#FDF8F5] text-[#5B4B49]"
              }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
