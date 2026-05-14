import React, { useState, useEffect, useMemo } from 'react';
import { User, Target, Calendar, Save, LogOut, ChevronRight, Sparkles, Check, Globe } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
  const { t, language, toggleLanguage } = useLanguage();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weekMeals, setWeekMeals] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData(data);
          setFormData(data.profile);
        }

        // Fetch meals for the current week
        try {
          const now = new Date();
          const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon...
          const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
          const monday = new Date(now);
          monday.setDate(now.getDate() + mondayOffset);
          monday.setHours(0, 0, 0, 0);

          const mealsRef = collection(db, 'users', auth.currentUser.uid, 'meals');
          const qMeals = query(mealsRef, where('timestamp', '>=', monday.toISOString()), orderBy('timestamp', 'desc'));
          const mealsSnap = await getDocs(qMeals);
          setWeekMeals(mealsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
          console.error('Error fetching week meals:', err);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, { profile: formData });

      // Create a weight history entry if the weight has changed
      if (Number(formData.weight) !== Number(profileData.profile.weight)) {
        const weightHistoryRef = collection(db, 'users', auth.currentUser.uid, 'weight_history');
        await addDoc(weightHistoryRef, {
          weight: Number(formData.weight),
          timestamp: new Date().toISOString()
        });
      }

      setProfileData(prev => ({ ...prev, profile: formData }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading && !profileData) {
    return (
      <div className="p-6 text-center text-graphite">
        <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
          <Sparkles className="w-4 h-4 text-brand" />
        </div>
        Loading profile...
      </div>
    );
  }

  return (
    <div className="pt-8 md:pt-10 px-4 md:px-6 pb-32 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="font-display font-bold text-heading tracking-tight mb-1">{t('settings')}</h1>
        <p className="text-body-sm text-graphite">{t('profileSubtitle') || 'Manage your goals and personal data.'}</p>
      </header>

      <div className="space-y-4">
        {/* User Info Card */}
        <div className="card-white shadow-card p-5">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-azure flex items-center justify-center mr-3 shadow-glow-brand">
              <User className="w-6 h-6 text-snow" />
            </div>
            <div>
              <div className="font-bold text-body-sm truncate max-w-[200px]">
                {auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0]}
              </div>
              <div className="text-caption text-brand font-semibold">Koda Pro Member</div>
            </div>
          </div>

          {formData && (
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: t('age'), key: 'age', suffix: 'yrs', type: 'number' },
                { label: t('gender'), key: 'gender', type: 'select', options: ['Male', 'Female'] },
                { label: t('weight'), key: 'weight', suffix: 'kg', type: 'number' },
                { label: t('height'), key: 'height', suffix: 'cm', type: 'number' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[10px] text-graphite uppercase font-bold tracking-wider mb-1.5">{field.label}</label>
                  {isEditing ? (
                    field.type === 'select' ? (
                      <select
                        value={formData[field.key]}
                        onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full bg-fog border-2 border-silver-mist/60 rounded-xl p-2.5 text-body-sm font-medium focus:border-brand transition-colors"
                      >
                        {field.options.map(opt => <option key={opt} value={opt}>{opt === 'Male' ? t('male') : t('female')}</option>)}
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={formData[field.key]}
                        onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full bg-fog border-2 border-silver-mist/60 rounded-xl p-2.5 text-body-sm font-medium focus:border-brand transition-colors"
                      />
                    )
                  ) : (
                    <div className="font-bold text-body-sm">
                      {field.key === 'gender' ? (formData[field.key] === 'Male' ? t('male') : t('female')) : formData[field.key]} {field.suffix || ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)} 
              className="w-full bg-fog border-2 border-silver-mist/60 py-3 rounded-xl text-ink text-body-sm font-bold hover:border-graphite transition-all flex items-center justify-center"
            >
              {t('editData') || 'Edit Personal Data'}
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </button>
          ) : (
            <button 
              onClick={handleSave} 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-brand to-azure text-snow py-3 rounded-xl text-body-sm font-bold shadow-glow-brand hover:shadow-glow-blue flex items-center justify-center active:scale-[0.98] transition-all"
            >
              <Save className="w-4 h-4 mr-2"/> {t('saveChanges') || 'Save Changes'}
            </button>
          )}
        </div>

        {/* Language Selection Card */}
        <div className="card-white shadow-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center mr-3">
                <Globe className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-display font-bold text-body-sm">{t('language')}</h3>
                <p className="text-[10px] text-graphite uppercase font-bold tracking-wider">{language === 'es' ? 'Español' : 'English'}</p>
              </div>
            </div>
            <div className="flex bg-fog rounded-lg p-1">
              <button 
                onClick={() => language !== 'es' && toggleLanguage()}
                className={`px-4 py-1.5 rounded-md text-caption font-bold transition-all ${language === 'es' ? 'bg-snow text-brand shadow-sm' : 'text-graphite hover:text-ink'}`}
              >
                ES
              </button>
              <button 
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`px-4 py-1.5 rounded-md text-caption font-bold transition-all ${language === 'en' ? 'bg-snow text-brand shadow-sm' : 'text-graphite hover:text-ink'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Goals & Targets */}
        {profileData?.targets && (
          <div className="card-white shadow-card p-5">
            <div className="flex items-center mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-display font-bold text-body-sm">{t('dailyTargets')}</h3>
                <p className="text-[10px] text-graphite">{t('aiCalculated')}</p>
              </div>
            </div>
            <p className="text-caption text-graphite mb-5">{t('basedOnGoal')} <span className="font-bold text-ink">{profileData.profile.goal === 'lose' ? t('loseWeight') : profileData.profile.goal === 'maintain' ? t('maintainWeight') : t('gainMuscle')}</span>.</p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t('calories'), value: profileData.targets.targetCalories, unit: 'kcal', color: 'text-ink', bg: 'bg-fog' },
                { label: t('protein'), value: profileData.targets.targetProtein, unit: 'g', color: 'text-coral', bg: 'bg-coral/10' },
                { label: t('carbs'), value: profileData.targets.targetCarbs, unit: 'g', color: 'text-amber', bg: 'bg-amber/10' },
                { label: t('fats'), value: profileData.targets.targetFats, unit: 'g', color: 'text-azure', bg: 'bg-azure/10' },
              ].map((t_item, i) => (
                <div key={i} className={`${t_item.bg} rounded-xl p-3.5`}>
                  <div className={`text-heading-sm font-bold ${t_item.color}`}>{t_item.value}<span className="text-caption text-graphite ml-0.5 font-medium">{t_item.unit}</span></div>
                  <div className="text-[10px] text-graphite font-bold uppercase tracking-wider mt-0.5">{t_item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consistency — real data */}
        {(() => {
          const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
          const now = new Date();
          const dayOfWeek = now.getDay(); // 0=Sun
          const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

          // Build array of dates for Mon–Sun of current week
          const weekDates = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(now);
            d.setDate(now.getDate() + mondayOffset + i);
            return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
          });

          // Which days had at least one meal?
          const loggedDays = new Set(
            weekMeals.map(m => m.timestamp?.split('T')[0])
          );

          const todayStr = now.toISOString().split('T')[0];
          const activeDays = weekDates.filter(d => loggedDays.has(d)).length;

          return (
            <div className="card-white shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-xl bg-mint/10 flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-body-sm">{t('thisWeek')}</h3>
                    <p className="text-[10px] text-graphite">{activeDays}/7 {t('daysLogged')}</p>
                  </div>
                </div>
                {activeDays >= 5 && (
                  <span className="text-[10px] bg-mint/10 text-mint px-2.5 py-1 rounded-lg font-bold">🔥 {t('greatWeek')}</span>
                )}
              </div>
              
              <div className="flex justify-between mt-3">
                {dayLabels.map((label, i) => {
                  const dateStr = weekDates[i];
                  const hasLog = loggedDays.has(dateStr);
                  const isToday = dateStr === todayStr;
                  const isFuture = dateStr > todayStr;

                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`text-[10px] font-bold mb-2 ${isToday ? 'text-brand' : 'text-graphite'}`}>{label}</div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        hasLog
                          ? 'bg-mint/15 border border-mint/30'
                          : isFuture
                            ? 'border border-silver-mist/40 bg-fog/50'
                            : isToday
                              ? 'border-2 border-brand/30 bg-brand/5'
                              : 'border border-silver-mist bg-fog'
                      }`}>
                        {hasLog ? <Check className="w-3.5 h-3.5 text-mint" /> : isToday && <div className="w-1.5 h-1.5 rounded-full bg-brand" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Sign Out */}
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center py-4 text-coral font-bold text-body-sm rounded-xl hover:bg-coral/5 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('signOut')}
        </button>
      </div>
    </div>
  );
}
