import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLightningBolt, HiOutlineChartBar, HiOutlineTemplate, HiOutlineSparkles } from 'react-icons/hi';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-coral/30">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-coral rounded-lg flex items-center justify-center">
                        <HiOutlineSparkles className="text-white text-xl" />
                    </div>
                    <span className="text-xl font-serif font-bold tracking-tight">InsightBoard</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-charcoal/70">
                    <a href="#features" className="hover:text-brand-charcoal transition-colors">Features</a>
                    <a href="#ai" className="hover:text-brand-charcoal transition-colors">AI Insights</a>
                    <Link to="/auth" className="hover:text-brand-charcoal transition-colors">Login</Link>
                    <Link to="/auth" className="bg-brand-charcoal text-white px-5 py-2.5 rounded-full hover:bg-brand-charcoal/90 transition-all shadow-sm">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-20 pb-32 px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-serif max-w-4xl mx-auto leading-[1.1] mb-6">
                        Work smarter with <span className="italic text-brand-coral">AI-powered</span> productivity insights
                    </h1>
                    <p className="text-xl text-brand-charcoal/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Beautiful Kanban boards meets intelligent AI. Organize your tasks, discover patterns, and reach peak performance with InsightBoard.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/auth" className="bg-gradient-to-r from-brand-coral to-brand-coral-light text-brand-charcoal font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all shadow-lg">
                            Start Free Trial
                        </Link>
                        <button className="px-8 py-4 text-brand-charcoal font-semibold hover:bg-white/50 rounded-full transition-all">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-coral/5 rounded-full blur-3xl -z-0"></div>
            </header>

            {/* Hero Visual Mockup */}
            <section className="px-8 -mt-16 mb-32">
                <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-6 relative">
                    <div className="flex gap-4 overflow-hidden opacity-90">
                        {['To Do', 'In Progress', 'Done'].map(col => (
                            <div key={col} className="min-w-[280px] bg-brand-bg/50 rounded-xl p-4 border border-brand-coral/10">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/40 mb-4 block">{col}</span>
                                <div className="space-y-3">
                                    <div className="h-24 bg-white rounded-lg p-3 shadow-sm border border-brand-coral/5 relative">
                                        <div className="w-12 h-2 bg-brand-coral/20 rounded mb-2"></div>
                                        <div className="w-full h-2 bg-brand-charcoal/5 rounded mb-1"></div>
                                        <div className="w-3/4 h-2 bg-brand-charcoal/5 rounded"></div>
                                        {col === 'In Progress' && (
                                            <div className="absolute right-2 bottom-2 bg-brand-coral/10 text-[10px] text-brand-coral font-bold px-1.5 py-0.5 rounded">AI Optimized</div>
                                        )}
                                    </div>
                                    <div className="h-20 bg-white/50 rounded-lg border border-dashed border-brand-charcoal/10"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* AI Badge Overlay */}
                    <div className="absolute -right-8 -top-8 bg-white p-4 rounded-2xl shadow-xl border border-brand-coral/20 flex flex-col items-center animate-bounce duration-3000">
                        <span className="text-2xl mb-1">🚀</span>
                        <span className="text-xs font-bold text-brand-coral">Productivity +23%</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-8 bg-white/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4">Everything you need for smarter work</h2>
                        <p className="text-brand-charcoal/60">Streamline your workflow with tools designed for focus and clarity.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<HiOutlineTemplate />}
                            title="Smart Kanban"
                            desc="Intuitive boards that adapt to your team's unique workflow patterns."
                        />
                        <FeatureCard
                            icon={<HiOutlineSparkles />}
                            title="AI Insights"
                            desc="Get real-time feedback on priorities and potential bottlenecks."
                            highlight
                        />
                        <FeatureCard
                            icon={<HiOutlineChartBar />}
                            title="Beautiful Analytics"
                            desc="Visualize your progress with charts that actually tell a story."
                        />
                        <FeatureCard
                            icon={<HiOutlineLightningBolt />}
                            title="Calm UI"
                            desc="A clutter-free interface that helps you stay in the flow state."
                        />
                    </div>
                </div>
            </section>

            {/* AI Deep-Dive */}
            <section id="ai" className="py-32 px-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl font-serif mb-8 leading-tight">AI that understands <br /><span className="text-brand-coral italic">your workflow</span></h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-coral/20 flex items-center justify-center shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-brand-coral"></div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Smart Task Analysis</h4>
                                    <p className="text-brand-charcoal/60">IB recognizes task patterns and suggests optimal deadlines based on your history.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-coral/20 flex items-center justify-center shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-brand-coral"></div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Predictive Insights</h4>
                                    <p className="text-brand-charcoal/60">Get ahead of bottlenecks before they happen with our predictive workload engine.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-white rounded-3xl p-8 shadow-inner border border-brand-coral/5">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal/40 mb-2">
                                <span>Weekly Productivity</span>
                                <span className="text-brand-coral">+12% vs last week</span>
                            </div>
                            <div className="h-48 flex items-end justify-between gap-2">
                                {[40, 60, 45, 90, 65, 80, 70].map((h, i) => (
                                    <div key={i} className={`w-full rounded-t-lg transition-all duration-1000 ${i === 3 ? 'bg-brand-coral' : 'bg-brand-coral/20'}`} style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-brand-charcoal/40">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-8 border-t border-brand-coral/10 bg-white/20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-brand-coral rounded-md flex items-center justify-center">
                                <HiOutlineSparkles className="text-white text-xs" />
                            </div>
                            <span className="text-lg font-serif font-bold">InsightBoard</span>
                        </div>
                        <p className="text-sm text-brand-charcoal/60 leading-relaxed mb-6">
                            Building the future of productive work, one board at a time. Join thousands of creators and engineers who work smarter.
                        </p>
                        <div className="flex gap-4">
                            <input type="email" placeholder="Email address" className="bg-white px-4 py-2 rounded-full border border-brand-coral/20 text-sm focus:outline-none focus:ring-2 ring-brand-coral/20 w-full" />
                            <button className="bg-brand-charcoal text-white px-6 py-2 rounded-full text-sm font-bold">Join</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div>
                            <h5 className="font-bold text-sm mb-4">Product</h5>
                            <ul className="text-sm text-brand-charcoal/60 space-y-3">
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-brand-coral transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-sm mb-4">Resources</h5>
                            <ul className="text-sm text-brand-charcoal/60 space-y-3">
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Tutorials</a></li>
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-sm mb-4">Legal</h5>
                            <ul className="text-sm text-brand-charcoal/60 space-y-3">
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-brand-coral transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, highlight }) => (
    <div className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${highlight ? 'bg-brand-coral/5 border-brand-coral/20' : 'bg-white/50 border-white shadow-sm hover:bg-white'}`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 ${highlight ? 'bg-brand-coral text-white' : 'bg-brand-coral/10 text-brand-coral'}`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm text-brand-charcoal/60 leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
