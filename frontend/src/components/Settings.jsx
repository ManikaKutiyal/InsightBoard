import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";
import { FiUser, FiCpu, FiShield, FiSave, FiSun, FiMoon, FiCloud } from "react-icons/fi";

const SettingsCard = ({ title, subtitle, children }) => (
    <div className="bg-brand-card backdrop-blur-md border border-brand-border rounded-[2.5rem] p-8 shadow-sm mb-8">
        <div className="mb-6">
            <h3 className="text-xl font-black text-brand-charcoal">{title}</h3>
            <p className="text-xs font-bold text-brand-coral uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
        {children}
    </div>
);

export default function Settings() {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: null, message: "" });

    const [formData, setFormData] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        subjects: user?.subjects || [],
        theme: user?.theme || "cream",
        avatar: user?.avatar || ""
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            bio: user?.bio || "",
            subjects: user?.subjects || [],
            theme: user?.theme || "cream",
            avatar: user?.avatar || ""
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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setStatus({ type: "error", message: "File too large (Max 2MB)" });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const defaultAvatar = "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg";

    const tabs = [
        { id: "profile", label: "Identity", icon: <FiUser /> },
        { id: "academic", label: "Intelligence", icon: <FiCpu /> },
        { id: "appearance", label: "Appearance", icon: <FiSun /> },
        { id: "account", label: "Security", icon: <FiShield /> },
    ];

    const themes = [
        { id: "cream", label: "Classic Cream", icon: <FiSun />, color: "bg-[#FDF8F5]" },
        { id: "mint", label: "Mint Whisper", icon: <FiCloud />, color: "bg-[#F2FAF5]" },
        { id: "azure", label: "Arctic Azure", icon: <FiCloud />, color: "bg-[#F0F7FF]" },
        { id: "sunset", label: "Sunset Synergy", icon: <FiCloud />, color: "bg-gradient-to-br from-orange-100 to-rose-100" },
    ];

    return (
        <div className="h-full flex flex-col gap-8">
            <header className="flex justify-between items-end">
                <div className="flex items-center gap-8">
                    <div>
                        <h1 className="text-3xl font-black text-brand-charcoal">System Settings</h1>
                        <p className="text-brand-coral font-bold text-xs uppercase tracking-widest">Configure your Insight Environment</p>
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
                    className="bg-brand-charcoal text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg hover:bg-brand-coral transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                >
                    <FiSave /> {loading ? "Syncing..." : "Save Changes"}
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 overflow-hidden">
                {/* LEFT: NAV TABS (HORIZONTAL ON MOBILE) */}
                <aside className="w-full lg:w-56 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 custom-scrollbar shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-4 px-6 py-3 lg:py-4 rounded-2xl font-bold text-xs lg:text-sm transition-all whitespace-nowrap
                ${activeTab === tab.id
                                    ? "bg-brand-charcoal text-white shadow-lg"
                                    : "bg-brand-card lg:bg-transparent text-brand-charcoal/50 hover:bg-brand-card hover:text-brand-charcoal"
                                }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* RIGHT: CONTENT BLOCKS */}
                <div className="flex-1 max-w-full lg:max-w-2xl overflow-y-auto pr-0 lg:pr-4 custom-scrollbar pb-12">
                    {activeTab === "profile" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SettingsCard title="Scholar Profile" subtitle="How others see you in the Collab Hub">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 pb-6 border-b border-brand-border/30">
                                        <div className="relative group">
                                            <img
                                                src={formData.avatar || defaultAvatar}
                                                className="h-24 w-24 rounded-3xl object-cover ring-4 ring-brand-border shadow-lg transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                <FiUser className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="file"
                                                id="avatar-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                            />
                                            <label
                                                htmlFor="avatar-upload"
                                                className="bg-brand-bg text-brand-coral border border-brand-border px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-coral hover:text-white transition-all cursor-pointer shadow-sm text-center"
                                            >
                                                Upload New Avatar
                                            </label>
                                            <p className="text-[9px] text-brand-charcoal/40 font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1">
                                                <FiShield className="text-[10px]" /> Verified Scan • MAX 2MB
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 mb-2 px-1">Display Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-brand-bg border-2 border-transparent focus:border-brand-border outline-none px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-sm text-brand-charcoal"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 mb-2 px-1">Academic Bio</label>
                                            <textarea
                                                rows="3"
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                className="w-full bg-brand-bg border-2 border-transparent focus:border-brand-border outline-none px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-sm resize-none text-brand-charcoal"
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
                                    <p className="text-sm font-medium text-brand-charcoal/70 leading-relaxed">
                                        Selecting subjects helps the **Synergy Engine** prioritize relevant tasks and analytics.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {["Physics", "Calculus", "Chemistry", "Computer Science", "Economics", "Biology", "Literature"].map(subject => (
                                            <button
                                                key={subject}
                                                onClick={() => toggleSubject(subject)}
                                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 
                                ${formData.subjects.includes(subject)
                                                        ? "bg-brand-coral border-brand-coral text-white shadow-md shadow-brand-coral/30"
                                                        : "bg-brand-card border-brand-border text-brand-coral hover:border-brand-coral"}`}
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
                                                    <h4 className="font-black text-brand-charcoal">{t.label}</h4>
                                                    <p className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-widest">Interface Mode</p>
                                                </div>
                                            </div>
                                            <div className={`h-6 w-6 rounded-full border-4 transition-all ${formData.theme === t.id ? "border-brand-coral bg-brand-coral" : "border-brand-border"}`}>
                                                {formData.theme === t.id && <div className="h-full w-full bg-brand-card rounded-full scale-50" />}
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
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 mb-2 px-1">Registered Email</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={user?.email || ""}
                                            className="w-full bg-brand-bg border-2 border-transparent px-6 py-3 rounded-2xl text-sm font-medium opacity-50 cursor-not-allowed shadow-inner text-brand-charcoal"
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

