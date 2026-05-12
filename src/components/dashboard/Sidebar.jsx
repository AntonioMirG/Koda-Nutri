import React from 'react';
import { Home, BarChart2, Settings, Plus, Trophy, Sparkles, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';

export default function Sidebar({ activeTab, setActiveTab, setIsScanning, auth }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'equilibrador', label: 'Equilibrador', icon: <Trophy className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="flex flex-col w-full h-full bg-snow border-r border-silver-mist/60">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-azure flex items-center justify-center shadow-glow-brand">
            <Sparkles className="w-4 h-4 text-snow" />
          </div>
          <span className="font-display font-bold text-heading-sm tracking-tight">Koda</span>
        </div>
      </div>

      {/* Scan Button */}
      <div className="px-5 mb-6">
        <button
          onClick={() => setIsScanning(true)}
          className="w-full bg-gradient-to-r from-brand to-azure text-snow py-3.5 rounded-xl font-bold text-body-sm flex items-center justify-center space-x-2 shadow-glow-brand hover:shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Scan Meal</span>
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-brand/10 text-brand font-semibold'
                : 'text-graphite hover:bg-fog hover:text-ink'
            }`}
          >
            {item.icon}
            <span className="text-body-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="px-5 pb-6 pt-4 border-t border-silver-mist/60 mt-auto">
        <button
          onClick={() => signOut(auth)}
          className="w-full flex items-center justify-center space-x-2 bg-fog text-graphite py-3 rounded-xl font-semibold text-caption hover:bg-silver-mist hover:text-ink transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
