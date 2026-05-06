import React from 'react';
import { Home, BarChart2, Settings, Plus, Trophy } from 'lucide-react';
import { signOut } from 'firebase/auth';

export default function Sidebar({ activeTab, setActiveTab, setIsScanning, auth }) {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-snow border-r border-silver-mist h-screen sticky top-0 z-40 p-6">
      <div className="mb-10">
        <span className="font-display font-bold text-heading-sm tracking-tight">Koda</span>
      </div>

      <div className="mb-8">
        <button
          onClick={() => setIsScanning(true)}
          className="w-full bg-ink text-snow py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Scan Meal</span>
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {[
          { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
          { id: 'equilibrador', label: 'Equilibrador', icon: <Trophy className="w-5 h-5" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-ink text-snow shadow-lg' : 'text-graphite hover:bg-fog'
              }`}
          >
            {item.icon}
            <span className="font-semibold text-body-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-silver-mist pt-6">
        <button
          onClick={() => signOut(auth)}
          className="w-full bg-fog text-graphite py-3 rounded-xl font-bold text-[12px] hover:bg-silver-mist hover:text-ink transition-all text-center flex items-center justify-center"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
