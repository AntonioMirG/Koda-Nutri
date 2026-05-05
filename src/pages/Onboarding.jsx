import React, { useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
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
    lifestyle: ''
  });

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

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        profile: formData,
        targets: calculatedMacros,
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

  return (
    <div className="min-h-screen bg-fog text-ink font-sans flex flex-col justify-center px-6 pb-24 relative overflow-hidden">
      
      <div className="max-w-md mx-auto w-full relative z-10">
        <div className="mb-8">
          <div className="flex space-x-2 mb-6">
             <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-ink' : 'bg-silver-mist'}`}></div>
             <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-ink' : 'bg-silver-mist'}`}></div>
             <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-ink' : 'bg-silver-mist'}`}></div>
          </div>
          <h1 className="font-display font-semibold text-heading tracking-tight leading-tight">
            {step === 1 && "Tell us about yourself."}
            {step === 2 && "What's your goal?"}
            {step === 3 && "Your lifestyle."}
          </h1>
          <p className="text-body text-graphite mt-2">
            {step === 1 && "We need this to calculate your base metabolic rate."}
            {step === 2 && "Our AI will adjust your macros to hit this target."}
            {step === 3 && "This helps us account for your daily activity."}
          </p>
        </div>

        <div className="card-white shadow-lg-soft relative overflow-hidden mb-8 border border-silver-mist/50">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-caption font-medium text-graphite mb-2">Gender</label>
                    <div className="flex space-x-3">
                      {['Male', 'Female'].map(g => (
                        <button key={g} onClick={() => updateForm('gender', g)} className={`flex-1 py-3 rounded-small border ${formData.gender === g ? 'bg-ink text-snow border-ink' : 'bg-fog text-ink border-silver-mist'} font-medium text-body-sm transition-colors`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-caption font-medium text-graphite mb-2">Age</label>
                    <input type="number" placeholder="25" value={formData.age} onChange={e => updateForm('age', e.target.value)} className="w-full bg-fog border border-silver-mist rounded-small px-4 py-3 text-body-sm focus:outline-none focus:border-ink" />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-caption font-medium text-graphite mb-2">Weight (kg)</label>
                      <input type="number" placeholder="70" value={formData.weight} onChange={e => updateForm('weight', e.target.value)} className="w-full bg-fog border border-silver-mist rounded-small px-4 py-3 text-body-sm focus:outline-none focus:border-ink" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-caption font-medium text-graphite mb-2">Height (cm)</label>
                      <input type="number" placeholder="175" value={formData.height} onChange={e => updateForm('height', e.target.value)} className="w-full bg-fog border border-silver-mist rounded-small px-4 py-3 text-body-sm focus:outline-none focus:border-ink" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-3">
                  {[
                    { id: 'lose', label: 'Lose weight', desc: 'Caloric deficit for fat loss' },
                    { id: 'maintain', label: 'Maintain weight', desc: 'Keep your current physique' },
                    { id: 'gain', label: 'Gain muscle', desc: 'Caloric surplus for hypertrophy' }
                  ].map(goal => (
                    <button key={goal.id} onClick={() => updateForm('goal', goal.id)} className={`w-full text-left p-4 rounded-small border ${formData.goal === goal.id ? 'bg-ink text-snow border-ink' : 'bg-fog text-ink border-silver-mist'} transition-colors`}>
                      <div className="font-semibold text-body-sm">{goal.label}</div>
                      <div className={`text-caption mt-1 ${formData.goal === goal.id ? 'text-snow/70' : 'text-graphite'}`}>{goal.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-3">
                  {[
                    { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                    { id: 'light', label: 'Lightly active', desc: '1-3 days per week' },
                    { id: 'moderate', label: 'Moderately active', desc: '3-5 days per week' },
                    { id: 'very', label: 'Very active', desc: '6-7 days per week' }
                  ].map(life => (
                    <button key={life.id} onClick={() => updateForm('lifestyle', life.id)} className={`w-full text-left p-4 rounded-small border ${formData.lifestyle === life.id ? 'bg-ink text-snow border-ink' : 'bg-fog text-ink border-silver-mist'} transition-colors`}>
                      <div className="font-semibold text-body-sm">{life.label}</div>
                      <div className={`text-caption mt-1 ${formData.lifestyle === life.id ? 'text-snow/70' : 'text-graphite'}`}>{life.desc}</div>
                    </button>
                  ))}
                </div>
                
                {loading && (
                   <div className="absolute inset-0 bg-snow/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-card">
                     <Sparkles className="w-8 h-8 text-ink animate-pulse mb-3" />
                     <span className="text-body-sm font-semibold">AI is calculating your macros...</span>
                   </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between">
          {step > 1 ? (
            <button onClick={handleBack} className="btn-frosted !bg-fog text-ink px-6 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button onClick={handleNext} disabled={step === 1 && (!formData.gender || !formData.age || !formData.weight || !formData.height) || step === 2 && !formData.goal} className="btn-primary px-8 flex items-center disabled:opacity-50">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!formData.lifestyle || loading} className="btn-primary px-8 flex items-center disabled:opacity-50">
              Calculate Plan <Sparkles className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
