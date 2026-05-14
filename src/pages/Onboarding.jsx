import React, { useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { Sparkles, ArrowRight, ArrowLeft, Target, Dumbbell, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateOnboardingMacros } from '../services/openai';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    lifestyle: '',
    username: ''
  });

  const forbiddenWords = ['nigger', 'faggot', 'puta', 'mierda']; // Basic filter as requested

  const handleNext = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Fetch OpenAI API to calculate optimal macros based on formData
      const calculatedMacros = await calculateOnboardingMacros(formData);

      const bmr = formData.gender === 'Male'
        ? 88.362 + (13.397 * Number(formData.weight)) + (4.799 * Number(formData.height)) - (5.677 * Number(formData.age))
        : 447.593 + (9.247 * Number(formData.weight)) + (3.098 * Number(formData.height)) - (4.330 * Number(formData.age));

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        profile: { ...formData, bmr: Math.round(bmr) },
        targets: calculatedMacros,
        username: formData.username,
        createdAt: new Date().toISOString()
      });

      // Save initial weight record
      const weightHistoryRef = doc(collection(db, 'users', auth.currentUser.uid, 'weight_history'));
      await setDoc(weightHistoryRef, {
        weight: Number(formData.weight),
        timestamp: new Date().toISOString()
      });

      onComplete();
    } catch (error) {
      console.error("Error saving profile or calculating macros:", error);
      alert("There was an error generating your plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stepIcons = [
    <UserCircle className="w-5 h-5" />,
    <Target className="w-5 h-5" />,
    <Dumbbell className="w-5 h-5" />,
  ];

  const stepTitles = [
    "Tell us about yourself.",
    "What's your goal?",
    "Your lifestyle.",
  ];

  const stepSubtitles = [
    "We need this to calculate your base metabolic rate.",
    "Our AI will adjust your macros to hit this target.",
    "This helps us account for your daily activity.",
  ];

  return (
    <div className="min-h-screen bg-fog text-ink font-sans flex flex-col justify-center px-5 pb-24 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-brand/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-md mx-auto w-full relative z-10">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  step >= s 
                    ? 'bg-gradient-to-br from-brand to-azure text-snow shadow-glow-brand' 
                    : 'bg-silver-mist/50 text-graphite'
                }`}>
                  {stepIcons[s - 1]}
                </div>
                {s < 3 && (
                  <div className="flex-1 mx-2">
                    <div className={`h-0.5 rounded-full transition-all duration-500 ${
                      step > s ? 'bg-brand' : 'bg-silver-mist'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-display font-bold text-heading tracking-tight leading-tight">
              {stepTitles[step - 1]}
            </h1>
            <p className="text-body text-graphite mt-2">
              {stepSubtitles[step - 1]}
            </p>
          </motion.div>
        </div>

        <div className="card-white shadow-card relative overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-caption font-semibold text-graphite mb-2">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Male', 'Female'].map(g => (
                        <button
                          key={g}
                          onClick={() => updateForm('gender', g)}
                          className={`py-3.5 rounded-xl border-2 font-semibold text-body-sm transition-all duration-200 ${
                            formData.gender === g
                              ? 'bg-brand text-snow border-brand shadow-glow-brand'
                              : 'bg-fog text-ink border-silver-mist/60 hover:border-graphite'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-caption font-semibold text-graphite mb-2">Age</label>
                    <input
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={e => updateForm('age', e.target.value)}
                      className="w-full bg-fog border-2 border-silver-mist/60 rounded-xl px-4 py-3 text-body-sm focus:border-brand transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-caption font-semibold text-graphite mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        placeholder="70"
                        value={formData.weight}
                        onChange={e => updateForm('weight', e.target.value)}
                        className="w-full bg-fog border-2 border-silver-mist/60 rounded-xl px-4 py-3 text-body-sm focus:border-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-caption font-semibold text-graphite mb-2">Height (cm)</label>
                      <input
                      type="number"
                      placeholder="175"
                      value={formData.height}
                      onChange={e => updateForm('height', e.target.value)}
                      className="w-full bg-fog border-2 border-silver-mist/60 rounded-xl px-4 py-3 text-body-sm focus:border-brand transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-caption font-semibold text-graphite mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={e => updateForm('username', e.target.value)}
                      className={`w-full bg-fog border-2 rounded-xl px-4 py-3 text-body-sm focus:border-brand transition-colors ${
                        forbiddenWords.some(w => formData.username.toLowerCase().includes(w)) ? 'border-red-500' : 'border-silver-mist/60'
                      }`}
                    />
                    {forbiddenWords.some(w => formData.username.toLowerCase().includes(w)) && (
                      <p className="text-red-500 text-[10px] mt-1">Invalid username</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div className="space-y-3">
                  {[
                    { id: 'lose', label: 'Lose weight', desc: 'Caloric deficit for fat loss', emoji: '🔥' },
                    { id: 'maintain', label: 'Maintain weight', desc: 'Keep your current physique', emoji: '⚖️' },
                    { id: 'gain', label: 'Gain muscle', desc: 'Caloric surplus for hypertrophy', emoji: '💪' }
                  ].map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => updateForm('goal', goal.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center ${
                        formData.goal === goal.id
                          ? 'bg-brand text-snow border-brand shadow-glow-brand'
                          : 'bg-fog text-ink border-silver-mist/60 hover:border-graphite'
                      }`}
                    >
                      <span className="text-[24px] mr-4">{goal.emoji}</span>
                      <div>
                        <div className="font-semibold text-body-sm">{goal.label}</div>
                        <div className={`text-caption mt-0.5 ${formData.goal === goal.id ? 'text-snow/70' : 'text-graphite'}`}>{goal.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div className="space-y-3">
                  {[
                    { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise', emoji: '🪑' },
                    { id: 'light', label: 'Lightly active', desc: '1-3 days per week', emoji: '🚶' },
                    { id: 'moderate', label: 'Moderately active', desc: '3-5 days per week', emoji: '🏃' },
                    { id: 'very', label: 'Very active', desc: '6-7 days per week', emoji: '🏋️' }
                  ].map(life => (
                    <button
                      key={life.id}
                      onClick={() => updateForm('lifestyle', life.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center ${
                        formData.lifestyle === life.id
                          ? 'bg-brand text-snow border-brand shadow-glow-brand'
                          : 'bg-fog text-ink border-silver-mist/60 hover:border-graphite'
                      }`}
                    >
                      <span className="text-[24px] mr-4">{life.emoji}</span>
                      <div>
                        <div className="font-semibold text-body-sm">{life.label}</div>
                        <div className={`text-caption mt-0.5 ${formData.lifestyle === life.id ? 'text-snow/70' : 'text-graphite'}`}>{life.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-snow/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-azure flex items-center justify-center animate-pulse mb-3">
                      <Sparkles className="w-6 h-6 text-snow" />
                    </div>
                    <span className="text-body-sm font-bold text-ink">AI is calculating your macros...</span>
                    <span className="text-caption text-graphite mt-1">This takes a moment</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-3">
          {step > 1 ? (
            <button onClick={handleBack} className="bg-fog border-2 border-silver-mist/60 text-ink px-6 py-3 rounded-xl font-semibold text-body-sm flex items-center hover:border-graphite transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && (!formData.gender || !formData.age || !formData.weight || !formData.height || !formData.username || forbiddenWords.some(w => formData.username.toLowerCase().includes(w))) || step === 2 && !formData.goal}
              className="bg-gradient-to-r from-brand to-azure text-snow px-8 py-3 rounded-xl font-bold text-body-sm flex items-center disabled:opacity-40 shadow-glow-brand hover:shadow-glow-blue transition-all duration-300"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!formData.lifestyle || loading}
              className="bg-gradient-to-r from-brand to-azure text-snow px-8 py-3 rounded-xl font-bold text-body-sm flex items-center disabled:opacity-40 shadow-glow-brand hover:shadow-glow-blue transition-all duration-300"
            >
              Calculate Plan <Sparkles className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
