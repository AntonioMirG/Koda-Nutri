import React from 'react';
import { Home, BarChart2, Settings, Plus, Trophy } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, setIsScanning }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-snow/90 backdrop-blur-md border-t border-silver-mist pb-safe z-40">
      <div className="max-w-lg mx-auto grid grid-cols-5 items-center h-[80px] relative px-2">
        <button className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('home')}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className={`flex flex-col items-center space-y-1 ${activeTab === 'analytics' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('analytics')}>
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] font-medium">Analytics</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10"></div>
        </div>

        <button className={`flex flex-col items-center space-y-1 ${activeTab === 'equilibrador' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('equilibrador')}>
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-medium">Equilibrador</span>
        </button>

        <button className={`flex flex-col items-center space-y-1 ${activeTab === 'settings' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('settings')}>
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-medium">Settings</span>
        </button>

        <button
          onClick={() => setIsScanning(true)}
          className="absolute left-1/2 -translate-x-1/2 -top-7 w-14 h-14 bg-ink rounded-full flex items-center justify-center text-snow shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 transition-transform z-50 border-[4px] border-fog"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
