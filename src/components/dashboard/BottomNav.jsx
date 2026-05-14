import { Home, BarChart2, Settings, Plus, Trophy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function BottomNav({ activeTab, setActiveTab, setIsScanning }) {
  const { t } = useLanguage();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      {/* Frosted glass background */}
      <div className="bg-snow/80 backdrop-blur-xl border-t border-silver-mist/60">
        <div className="max-w-lg mx-auto grid grid-cols-5 items-center h-[72px] relative px-1">
          {/* Home */}
          <button
            className={`flex flex-col items-center justify-center space-y-0.5 py-2 rounded-xl transition-all duration-200 mx-1 ${
              activeTab === 'home' ? 'text-brand' : 'text-graphite'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{t('dashboard')}</span>
          </button>

          {/* Analytics */}
          <button
            className={`flex flex-col items-center justify-center space-y-0.5 py-2 rounded-xl transition-all duration-200 mx-1 ${
              activeTab === 'analytics' ? 'text-brand' : 'text-graphite'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{t('analytics')}</span>
          </button>

          {/* Center Scan Button Spacer */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10"></div>
          </div>

          {/* Equilibrador */}
          <button
            className={`flex flex-col items-center justify-center space-y-0.5 py-2 rounded-xl transition-all duration-200 mx-1 ${
              activeTab === 'equilibrador' ? 'text-brand' : 'text-graphite'
            }`}
            onClick={() => setActiveTab('equilibrador')}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{t('equilibrador')}</span>
          </button>

          {/* Settings */}
          <button
            className={`flex flex-col items-center justify-center space-y-0.5 py-2 rounded-xl transition-all duration-200 mx-1 ${
              activeTab === 'settings' ? 'text-brand' : 'text-graphite'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{t('settings')}</span>
          </button>

          {/* Floating Scan Button */}
          <button
            onClick={() => setIsScanning(true)}
            className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-azure flex items-center justify-center text-snow shadow-glow-brand active:scale-90 transition-all duration-200 border-[3px] border-snow"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Safe area spacer */}
        <div className="pb-safe" />
      </div>
    </nav>
  );
}
