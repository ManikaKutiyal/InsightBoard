import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../config";
import { FiUser, FiCpu, FiShield, FiSave, FiSun, FiMoon, FiCloud } from "react-icons/fi";

const SettingsCard = ({ title, subtitle, children }) => (
    <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[2.5rem] p-8 shadow-sm mb-8">
        <div className="mb-6">
            <h3 className="text-xl font-black text-[#5B4B49]">{title}</h3>
            <p className="text-xs font-bold text-[#F8AFA6] uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
        {children}
    </div>
);

export default function Settings() {
    const { user, updateUser } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: null, message: "" });

    const [formData, setFormData] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        subjects: user?.subjects || [],
        theme: user?.theme || "cream"
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            bio: user?.bio || "",
            subjects: user?.subjects || [],
            theme: user?.theme || "cream"
        });
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error("Sync failed");
            const updatedUser = await res.json();
            updateUser(updatedUser);
            setStatus({ type: "success", message: "Settings Synchronized ✨" });
        } catch (err) {
            setStatus({ type: "error", message: "Sync Failed" });
        }
        setLoading(false);
        setTimeout(() => setStatus({ type: null, message: "" }), 3000);
    };

    const toggleSubject = (sub) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(sub)
                ? prev.subjects.filter(s => s !== sub)
                : [...prev.subjects, sub]
        }));
    };

    const tabs = [
        { id: "profile", label: "Identity", icon: <FiUser /> },
        { id: "academic", label: "Intelligence", icon: <FiCpu /> },
        { id: "appearance", label: "Appearance", icon: <FiSun /> },
        { id: "account", label: "Security", icon: <FiShield /> },
    ];

    const themes = [
        { id: "cream", label: "Classic Cream", icon: <FiSun />, color: "bg-[#FDF8F5]" },
        { id: "dark", label: "Deep Research", icon: <FiMoon />, color: "bg-[#2D2D2D]" },
        { id: "sunset", label: "Sunset Synergy", icon: <FiCloud />, color: "bg-gradient-to-br from-orange-100 to-rose-100" },
    ];

    return (
        <div className="h-full flex flex-col gap-8">
            <header className="flex justify-between items-end">
                <div className="flex items-center gap-8">
                    <div>
                        <h1 className="text-3xl font-black text-[#5B4B49]">System Settings</h1>
                        <p className="text-[#F8AFA6] font-bold text-xs uppercase tracking-widest">Configure your Insight Environment</p>
                    </div>
                    {status.message && (
                        <div className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-in fade-in zoom-in slide-in-from-left-4 duration-300
                            ${status.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}
                        `}>
                            {status.message}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-[#5B4B49] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg hover:bg-[#F8AFA6] transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                >
                    <FiSave /> {loading ? "Syncing..." : "Save Changes"}
                </button>
            </header>

            <div className="flex gap-12 flex-1 overflow-hidden">
                {/* LEFT: NAV TABS */}
                <aside className="w-56 flex flex-col gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all
                ${activeTab === tab.id
                                    ? "bg-[#5B4B49] text-white shadow-lg"
                                    : "text-[#5B4B49]/50 hover:bg-white hover:text-[#5B4B49]"
                                }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* RIGHT: CONTENT BLOCKS */}
                <div className="flex-1 max-w-2xl overflow-y-auto pr-4 custom-scrollbar pb-12">
                    {activeTab === "profile" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SettingsCard title="Scholar Profile" subtitle="How others see you in the Collab Hub">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 pb-6 border-b border-[#FADCD9]/30">
                                        <img
                                            src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
                                            className="h-20 w-20 rounded-3xl object-cover ring-4 ring-[#FADCD9]"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <button className="bg-[#FDF8F5] text-[#F8AFA6] border border-[#FADCD9] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#F8AFA6] hover:text-white transition-all">
                                                Change Avatar
                                            </button>
                                            <p className="text-[10px] text-[#5B4B49]/40 font-bold uppercase tracking-wider text-center">SVG / PNG • MAX 2MB</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#5B4B49]/40 mb-2 px-1">Display Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white border-2 border-transparent focus:border-[#FADCD9] outline-none px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#5B4B49]/40 mb-2 px-1">Academic Bio</label>
                                            <textarea
                                                rows="3"
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                className="w-full bg-white border-2 border-transparent focus:border-[#FADCD9] outline-none px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-sm resize-none"
                                                placeholder="Tell the world about your research focus..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SettingsCard>
                        </div>
                    )}

                    {activeTab === "academic" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SettingsCard title="Intelligence Focus" subtitle="Customize AI diagnostics based on your subjects">
                                <div className="space-y-6">
                                    <p className="text-sm font-medium text-[#5B4B49]/70 leading-relaxed">
                                        Selecting subjects helps the **Synergy Engine** prioritize relevant tasks and analytics.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {["Physics", "Calculus", "Chemistry", "Computer Science", "Economics", "Biology", "Literature"].map(subject => (
                                            <button
                                                key={subject}
                                                onClick={() => toggleSubject(subject)}
                                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 
                                ${formData.subjects.includes(subject)
                                                        ? "bg-[#F8AFA6] border-[#F8AFA6] text-white shadow-md shadow-[#F8AFA6]/30"
                                                        : "bg-white border-[#FADCD9] text-[#F8AFA6] hover:border-[#F8AFA6]"}`}
                                            >
                                                {subject}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </SettingsCard>
                        </div>
                    )}

                    {activeTab === "appearance" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SettingsCard title="Visual Theme" subtitle="The atmosphere of your Insight Board">
                                <div className="grid grid-cols-1 gap-4">
                                    {themes.map((t) => (
                                        <div
                                            key={t.id}
                                            onClick={() => setFormData({ ...formData, theme: t.id })}
                                            className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer group
                                ${formData.theme === t.id ? "border-[#F8AFA6] bg-white shadow-xl" : "border-transparent bg-white/50 hover:bg-white"}
                            `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl ${t.color} shadow-inner`}>
                                                    {t.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-[#5B4B49]">{t.label}</h4>
                                                    <p className="text-[10px] font-bold text-[#5B4B49]/30 uppercase tracking-widest">Interface Mode</p>
                                                </div>
                                            </div>
                                            <div className={`h-6 w-6 rounded-full border-4 transition-all ${formData.theme === t.id ? "border-[#F8AFA6] bg-[#F8AFA6]" : "border-[#FADCD9]"}`}>
                                                {formData.theme === t.id && <div className="h-full w-full bg-white rounded-full scale-50" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SettingsCard>
                        </div>
                    )}

                    {activeTab === "account" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SettingsCard title="Security & Access" subtitle="Manage your scholarly credentials">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#5B4B49]/40 mb-2 px-1">Registered Email</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={user?.email || ""}
                                            className="w-full bg-[#FDF8F5] border-2 border-transparent px-6 py-3 rounded-2xl text-sm font-medium opacity-50 cursor-not-allowed shadow-inner"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline">
                                            Request Password Reset
                                        </button>
                                    </div>
                                </div>
                            </SettingsCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

