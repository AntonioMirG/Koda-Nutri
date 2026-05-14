import React, { useState } from 'react';
import { Camera, Sparkles, BarChart3, ArrowRight, Zap, ChevronRight, Moon, Sun } from 'lucide-react';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Landing({ onAuthSuccess }) {
  const { t: tr, language, toggleLanguage } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [dark, setDark] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const theme = dark ? {
    bg: 'bg-[#0a0a0a]',
    text: 'text-white',
    textMuted: 'text-white/50',
    textFaint: 'text-white/30',
    textLabel: 'text-white/40',
    card: 'glass-dark',
    cardBg: 'bg-white/5',
    cardBorder: 'border-white/8',
    inputBg: 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-brand/50',
    navBtn: 'bg-white/10 border-white/10 text-white hover:bg-white/20',
    glow1: 'bg-brand/20',
    glow2: 'bg-azure/15',
    glow3: 'bg-brand-light/10',
    featureCard: 'glass-dark hover:border-white/15',
    divider: 'border-white/10',
    toggleBg: 'bg-white/10',
    pillBg: 'bg-white/5 border-white/10',
    pillText: 'text-white/70',
    previewBar: 'bg-white/10',
    previewMacroBg: 'bg-white/5 border-white/5',
    previewMacroLabel: 'text-white/40',
    previewMacroBar: 'bg-white/10',
    footerBorder: 'border-white/5',
    footerText: 'text-white/30',
    modalBackdrop: 'bg-black/70',
    modalCard: 'glass-dark',
    modalDivider: 'border-white/10',
    modalToggleText: 'text-brand-light',
    errorBg: 'bg-coral/10 border-coral/20 text-coral',
  } : {
    bg: 'bg-[#FAFAFA]',
    text: 'text-ink',
    textMuted: 'text-graphite',
    textFaint: 'text-graphite/60',
    textLabel: 'text-graphite',
    card: 'bg-white border border-silver-mist/60 shadow-card',
    cardBg: 'bg-fog',
    cardBorder: 'border-silver-mist/60',
    inputBg: 'bg-fog border-silver-mist/80 text-ink placeholder:text-graphite/40 focus:border-brand',
    navBtn: 'bg-white border-silver-mist text-ink hover:bg-fog',
    glow1: 'bg-brand/8',
    glow2: 'bg-azure/6',
    glow3: 'bg-brand-light/5',
    featureCard: 'bg-white border border-silver-mist/60 shadow-soft hover:shadow-card hover:border-silver-mist',
    divider: 'border-silver-mist',
    toggleBg: 'bg-fog',
    pillBg: 'bg-brand/5 border-brand/10',
    pillText: 'text-brand/80',
    previewBar: 'bg-silver-mist/60',
    previewMacroBg: 'bg-fog border-silver-mist/40',
    previewMacroLabel: 'text-graphite',
    previewMacroBar: 'bg-silver-mist/60',
    footerBorder: 'border-silver-mist/60',
    footerText: 'text-graphite/50',
    modalBackdrop: 'bg-black/50',
    modalCard: 'bg-white border border-silver-mist/60 shadow-elevated',
    modalDivider: 'border-silver-mist',
    modalToggleText: 'text-brand',
    errorBg: 'bg-coral/10 border-coral/20 text-coral',
  };

  const features = [
    { icon: <Camera className="w-5 h-5" />, title: tr('aiVisionScanner'), desc: tr('heroSubtitle'), color: 'from-brand to-brand-light' },
    { icon: <BarChart3 className="w-5 h-5" />, title: tr('analytics'), desc: tr('monthlyInsights'), color: 'from-azure to-sky' },
    { icon: <Zap className="w-5 h-5" />, title: tr('equilibrador'), desc: tr('equilibradorDesc'), color: 'from-amber to-coral' },
  ];

  const steps = [
    { num: '01', title: tr('step1Title'), desc: tr('step1Desc') },
    { num: '02', title: tr('step2Title'), desc: tr('step2Desc') },
    { num: '03', title: tr('step3Title'), desc: tr('step3Desc') },
  ];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans overflow-x-hidden transition-colors duration-500`}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full ${theme.glow1} blur-[120px] transition-colors duration-500`} />
        <div className={`absolute top-[30%] right-[-15%] w-[400px] h-[400px] rounded-full ${theme.glow2} blur-[100px] transition-colors duration-500`} />
        <div className={`absolute bottom-[-10%] left-[30%] w-[350px] h-[350px] rounded-full ${theme.glow3} blur-[100px] transition-colors duration-500`} />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-5 md:px-8 py-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-azure flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-snow" />
          </div>
          <span className="font-display font-bold text-subheading tracking-tight">Koda</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAuth(true)}
            className={`${theme.navBtn} backdrop-blur-md border px-5 py-2 rounded-xl text-body-sm font-semibold transition-all duration-200 hidden sm:block`}
          >
            {tr('signInBtn')}
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={`w-9 h-9 rounded-xl ${theme.toggleBg} flex items-center justify-center transition-all duration-300 hover:scale-105 overflow-hidden border ${theme.cardBorder} p-0`}
            aria-label="Toggle language"
          >
            {language === 'es' ? (
              <img 
                src="https://flagcdn.com/w40/es.png" 
                alt="Spanish" 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src="https://flagcdn.com/w40/gb.png" 
                alt="English" 
                className="w-full h-full object-cover"
              />
            )}
          </button>

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`w-9 h-9 rounded-xl ${theme.toggleBg} flex items-center justify-center transition-all duration-300 hover:scale-105`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4 text-amber" /> : <Moon className="w-4 h-4 text-graphite" />}
          </button>
          
          <button
            onClick={() => setShowAuth(true)}
            className={`${theme.navBtn} backdrop-blur-md border px-5 py-2 rounded-xl text-body-sm font-semibold transition-all duration-200 sm:hidden`}
          >
            {tr('signInBtn')}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-5 md:px-8 pt-16 md:pt-24 pb-20 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center ${theme.pillBg} border rounded-full px-4 py-1.5 mb-6`}>
            <Zap className="w-3.5 h-3.5 text-amber mr-2" />
            <span className={`text-caption font-medium ${theme.pillText}`}>{tr('poweredByAi')}</span>
          </div>

          <h1 className="font-display font-extrabold text-[40px] md:text-heading-lg lg:text-display leading-[1.05] tracking-tight mb-5">
            {tr('heroTitle')}
            <span className="text-gradient">{tr('heroTitleRedefined')}</span>
            <span className="text-brand">.</span>
          </h1>

          <p className={`text-body md:text-subheading ${theme.textMuted} max-w-xl mx-auto mb-8 leading-relaxed`}>
            {tr('heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => setShowAuth(true)} className="w-full sm:w-auto bg-gradient-to-r from-brand to-azure text-snow px-8 py-3.5 rounded-xl text-body-sm font-bold shadow-glow-brand hover:shadow-glow-blue transition-all duration-300 flex items-center justify-center group">
              {tr('getStarted')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className={`w-full sm:w-auto ${theme.navBtn} border backdrop-blur-md px-8 py-3.5 rounded-xl text-body-sm font-semibold transition-all`}>
              {tr('learnMore')}
            </button>
          </div>
        </motion.div>

        {/* Preview card */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }} className="mt-16 md:mt-20 relative max-w-2xl mx-auto">
          <div className={`${theme.card} rounded-3xl p-5 md:p-6 transition-colors duration-500`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className={`text-caption ${theme.textFaint} font-medium mb-0.5`}>{tr('dailyProgress')}</div>
                <div className="text-heading-sm font-bold">1,847 <span className={`text-body-sm ${theme.textFaint}`}>/ 2,200 kcal</span></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand/20 to-azure/20 flex items-center justify-center border border-brand/10">
                <Sparkles className="w-5 h-5 text-brand-light" />
              </div>
            </div>
            <div className={`w-full h-2.5 ${theme.previewBar} rounded-full overflow-hidden mb-5`}>
              <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-brand to-azure" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: tr('protein'), value: '124g', pct: '83%', color: '#FF6B6B' },
                { label: tr('carbs'), value: '198g', pct: '79%', color: '#FF9F0A' },
                { label: tr('fats'), value: '58g', pct: '87%', color: '#0A84FF' },
              ].map((m, i) => (
                <div key={i} className={`${theme.previewMacroBg} border rounded-xl p-3`}>
                  <div className={`text-[10px] ${theme.previewMacroLabel} font-semibold uppercase tracking-wider mb-1`}>{m.label}</div>
                  <div className="text-body-sm font-bold">{m.value}</div>
                  <div className={`w-full h-1 ${theme.previewMacroBar} rounded-full mt-2 overflow-hidden`}>
                    <motion.div initial={{ width: 0 }} animate={{ width: m.pct }} transition={{ duration: 1.2, delay: 1 + i * 0.15, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-5 md:px-8 py-20 md:py-28 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <h2 className="font-display font-bold text-heading md:text-heading-lg tracking-tight mb-3">{tr('featuresTitle')}<span className="text-brand">.</span></h2>
          <p className={`text-body ${theme.textMuted} max-w-md mx-auto`}>{tr('featuresSubtitle')}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`${theme.featureCard} rounded-2xl p-6 md:p-7 group transition-all duration-300`}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-5 shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="font-display font-bold text-subheading tracking-tight mb-2">{feat.title}</h3>
              <p className={`text-body-sm ${theme.textMuted} leading-relaxed`}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-5 md:px-8 py-20 md:py-28 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <h2 className="font-display font-bold text-heading md:text-heading-lg tracking-tight mb-3">{tr('howItWorksTitle')}<span className="text-brand">.</span></h2>
          <p className={`text-body ${theme.textMuted} max-w-md mx-auto`}>{tr('howItWorksSubtitle')}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative">
              <div className={`${theme.featureCard} rounded-2xl p-6 md:p-7 h-full transition-all duration-300`}>
                <span className="text-[48px] md:text-[56px] font-extrabold text-gradient opacity-30 leading-none block mb-3">{step.num}</span>
                <h3 className="font-display font-bold text-subheading tracking-tight mb-2">{step.title}</h3>
                <p className={`text-body-sm ${theme.textMuted} leading-relaxed`}>{step.desc}</p>
              </div>
              {i < 2 && <div className="hidden md:flex absolute top-1/2 -right-3 z-10"><ChevronRight className={`w-5 h-5 ${theme.textFaint}`} /></div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className={`${dark ? 'glass-dark' : 'bg-gradient-to-br from-brand/5 via-azure/5 to-brand-light/5 border border-brand/10'} rounded-3xl p-8 md:p-12 text-center relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute inset-0 bg-mesh-1 opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-heading md:text-heading-lg tracking-tight mb-3">{tr('readyToStart')}</h2>
            <p className={`text-body ${theme.textMuted} max-w-md mx-auto mb-8`}>{tr('readyToStartSubtitle')}</p>
            <button onClick={() => setShowAuth(true)} className="bg-gradient-to-r from-brand to-azure text-snow px-10 py-4 rounded-xl text-body font-bold shadow-glow-brand hover:shadow-glow-blue transition-all duration-300">
              {tr('getStartedFree')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 px-5 md:px-8 py-8 max-w-6xl mx-auto border-t ${theme.footerBorder} transition-colors duration-500`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand to-azure flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-snow" />
            </div>
            <span className="font-display font-bold text-body-sm">Koda</span>
          </div>
          <p className={`text-caption ${theme.footerText}`}>© 2026 Koda. AI-Powered Nutrition.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <div className={`absolute inset-0 ${theme.modalBackdrop} backdrop-blur-md`} onClick={() => setShowAuth(false)} />
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="relative z-10 w-full max-w-md">
              <div className={`${theme.modalCard} rounded-3xl p-7 md:p-8 relative overflow-hidden transition-colors duration-500`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-azure to-brand-light" />
                <button onClick={() => setShowAuth(false)} className={`absolute top-5 right-5 w-8 h-8 rounded-full ${dark ? 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-fog text-graphite hover:text-ink hover:bg-silver-mist'} flex items-center justify-center transition-all`}>✕</button>

                <div className="mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-azure flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-snow" />
                  </div>
                  <h2 className="font-display font-bold text-heading-sm tracking-tight">{isLogin ? tr('welcomeBack') : tr('createAccount')}</h2>
                  <p className={`text-body-sm ${theme.textMuted} mt-1`}>{isLogin ? tr('signinToContinue') : tr('startJourney')}</p>
                </div>

                {error && <div className={`${theme.errorBg} border p-3 rounded-xl text-caption mb-4`}>{error}</div>}

                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <div>
                    <label className={`block text-caption ${theme.textLabel} mb-1.5 font-medium`}>{tr('email')}</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={`w-full ${theme.inputBg} border rounded-xl px-4 py-3 text-body-sm transition-all`} placeholder="name@example.com" />
                  </div>
                  <div>
                    <label className={`block text-caption ${theme.textLabel} mb-1.5 font-medium`}>{tr('password')}</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={`w-full ${theme.inputBg} border rounded-xl px-4 py-3 text-body-sm transition-all`} placeholder="••••••••" />
                  </div>
                  <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-brand to-azure text-snow py-3.5 rounded-xl font-bold text-body-sm shadow-glow-brand hover:shadow-glow-blue transition-all duration-300 mt-1 disabled:opacity-50">
                    {loading ? tr('processing') : (isLogin ? tr('signInBtn') : tr('createAccount'))}
                  </button>
                </form>

                <div className="my-5 flex items-center">
                  <div className={`flex-1 border-t ${theme.modalDivider}`} />
                  <span className={`px-3 text-caption ${theme.textFaint}`}>{tr('or')}</span>
                  <div className={`flex-1 border-t ${theme.modalDivider}`} />
                </div>

                <button onClick={handleGoogleAuth} className={`w-full ${dark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-fog border-silver-mist text-ink hover:bg-silver-mist'} border rounded-xl px-4 py-3.5 font-sans text-body-sm font-semibold transition-all flex items-center justify-center`}>
                  <svg className="w-5 h-5 mr-2.5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {tr('continueWithGoogle')}
                </button>

                <p className={`text-center text-caption ${theme.textFaint} mt-5`}>
                  {isLogin ? tr('dontHaveAccount') : tr('alreadyHaveAccount')}
                  <button onClick={() => setIsLogin(!isLogin)} className={`${theme.modalToggleText} font-medium hover:underline transition-colors ml-1`}>
                    {isLogin ? tr('signUp') : tr('signIn')}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
