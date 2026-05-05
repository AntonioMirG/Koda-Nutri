import React, { useState, useEffect } from 'react';
import { Camera, Home, BarChart2, Settings, Plus, X, Activity, Flame, Droplet, Beef } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Profile from './Profile';
import { analyzeFoodImage } from '../services/openai';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [userData, setUserData] = useState(null);
  const [consumedMacros, setConsumedMacros] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [recentMeals, setRecentMeals] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setSelectedImage(localUrl);

      setIsAnalyzing(true);
      setAnalysisResult(null);

      try {
        const result = await analyzeFoodImage(file);
        // Save the image URL in the result so it shows up in the recent meals list
        const mealWithImage = { ...result, image: localUrl, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

        setAnalysisResult(mealWithImage);
      } catch (error) {
        console.error("Analysis failed", error);
        alert("Failed to analyze image. Check console for details.");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const confirmMeal = () => {
    if (analysisResult) {
      setConsumedMacros(prev => ({
        calories: prev.calories + analysisResult.calories,
        protein: prev.protein + analysisResult.protein,
        carbs: prev.carbs + analysisResult.carbs,
        fat: prev.fat + analysisResult.fat
      }));
      setRecentMeals(prev => [analysisResult, ...prev]);
    }
    closeScanner();
  };

  const closeScanner = () => {
    setIsScanning(false);
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  const targetCalories = userData?.targets?.targetCalories || 2000;
  const targetProtein = userData?.targets?.targetProtein || 150;
  const targetCarbs = userData?.targets?.targetCarbs || 200;
  const targetFats = userData?.targets?.targetFats || 70;

  const caloriesLeft = Math.max(0, targetCalories - consumedMacros.calories);

  // Calculate Progress Percentages
  const calPercent = Math.min((consumedMacros.calories / targetCalories) * 100, 100) || 0;
  const protPercent = Math.min((consumedMacros.protein / targetProtein) * 100, 100) || 0;
  const carbPercent = Math.min((consumedMacros.carbs / targetCarbs) * 100, 100) || 0;
  const fatPercent = Math.min((consumedMacros.fat / targetFats) * 100, 100) || 0;

  const circumference = 2 * Math.PI * 34; // r=34
  const dashOffset = circumference - (calPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-fog text-ink font-sans pb-24 relative overflow-hidden">

      {/* --- Main Dashboard Content --- */}
      <div className={`transition-opacity duration-300 ${isScanning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {activeTab === 'settings' ? (
          <Profile />
        ) : (
          <header className="pt-12 px-6 pb-6 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="font-display font-semibold text-heading-sm">
                  Hi, {auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "User"}
                </span>
              </div>
            </div>

            <div className="flex space-x-6 text-body-sm font-medium mb-6 border-b border-silver-mist pb-2">
              <span className="text-ink border-b-2 border-ink pb-2 -mb-[9px]">Today</span>
              <span className="text-graphite">Yesterday</span>
            </div>

            {/* Calorie Card */}
            <div className="card-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8 flex justify-between items-center relative overflow-hidden rounded-[24px]">
              <div>
                <div className="font-display font-bold text-[48px] tracking-tight leading-none">{caloriesLeft}</div>
                <div className="text-caption text-graphite mt-1 font-medium">Calories left</div>
              </div>

              {/* Circular Progress */}
              <div className="w-20 h-20 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#e5e5ea" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="currentColor" strokeWidth="6" fill="transparent"
                    className="text-ink transition-all duration-1000 ease-out"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <Flame className="w-6 h-6 text-ink z-10" />
              </div>
            </div>

            {/* Macros */}
            <div className="flex justify-between mb-10 px-2">
              <div className="text-center">
                <div className="text-caption font-semibold">{consumedMacros.protein}g</div>
                <div className="text-[10px] text-graphite font-semibold mb-2">Protein</div>
                <div className="w-12 h-12 mx-auto rounded-full bg-fog border-[3px] border-[#e5e5ea] relative overflow-hidden flex items-end">
                  <div className="w-full bg-[#ff3b30] transition-all duration-1000" style={{ height: `${protPercent}%` }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-caption font-semibold">{consumedMacros.carbs}g</div>
                <div className="text-[10px] text-graphite font-semibold mb-2">Carbs</div>
                <div className="w-12 h-12 mx-auto rounded-full bg-fog border-[3px] border-[#e5e5ea] relative overflow-hidden flex items-end">
                  <div className="w-full bg-[#ff9500] transition-all duration-1000" style={{ height: `${carbPercent}%` }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-caption font-semibold">{consumedMacros.fat}g</div>
                <div className="text-[10px] text-graphite font-semibold mb-2">Fats</div>
                <div className="w-12 h-12 mx-auto rounded-full bg-fog border-[3px] border-[#e5e5ea] relative overflow-hidden flex items-end">
                  <div className="w-full bg-[#0071e3] transition-all duration-1000" style={{ height: `${fatPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* Recent Meals */}
            <div>
              <h3 className="font-display font-semibold text-body mb-4">Recently uploaded</h3>
              <div className="space-y-4">
                {recentMeals.length === 0 ? (
                  <p className="text-caption text-graphite text-center py-4 bg-snow rounded-[20px] border border-silver-mist/50">You haven't scanned any meals today.</p>
                ) : (
                  recentMeals.map((meal, index) => (
                    <div key={index} className="card-white !p-4 flex items-center space-x-4 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-silver-mist/50">
                      <img src={meal.image || "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=150&q=80"} alt={meal.name} className="w-16 h-16 rounded-2xl object-cover bg-fog" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-body-sm truncate pr-2">{meal.name}</h4>
                          <span className="text-[10px] text-graphite shrink-0">{meal.time}</span>
                        </div>
                        <div className="text-caption text-graphite flex items-center mt-1 mb-2 font-medium">
                          <Flame className="w-3 h-3 mr-1" /> {meal.calories} kcal
                        </div>
                        <div className="flex space-x-3 text-[10px] text-graphite font-medium">
                          <span className="flex items-center"><Beef className="w-3 h-3 mr-1 text-[#ff3b30]" /> {meal.protein}g</span>
                          <span className="flex items-center"><Activity className="w-3 h-3 mr-1 text-[#ff9500]" /> {meal.carbs}g</span>
                          <span className="flex items-center"><Droplet className="w-3 h-3 mr-1 text-[#0071e3]" /> {meal.fat}g</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </header>
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-snow/90 backdrop-blur-md border-t border-silver-mist pb-safe z-40">
          <div className="max-w-lg mx-auto flex justify-between items-center px-8 h-[80px] relative">
            <button className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('home')}>
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button className={`flex flex-col items-center space-y-1 mr-8 ${activeTab === 'analytics' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('analytics')}>
              <BarChart2 className="w-6 h-6" />
              <span className="text-[10px] font-medium">Analytics</span>
            </button>

            {/* FAB */}
            <button
              onClick={() => setIsScanning(true)}
              className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 bg-ink rounded-full flex items-center justify-center text-snow shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>

            <button className={`flex flex-col items-center space-y-1 ${activeTab === 'settings' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('settings')}>
              <Settings className="w-6 h-6" />
              <span className="text-[10px] font-medium">Settings</span>
            </button>
          </div>
        </nav>
      </div>

      {/* --- Scanner Full Screen Overlay --- */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#1a1a1a] text-snow flex flex-col"
          >
            {/* Header */}
            <div className="pt-12 px-6 pb-4 flex justify-between items-center absolute top-0 left-0 right-0 z-20">
              <button onClick={closeScanner} className="w-10 h-10 rounded-full bg-snow/20 flex items-center justify-center backdrop-blur-md">
                <X className="w-5 h-5" />
              </button>
              <span className="font-semibold text-body">Scanner</span>
              <div className="w-10 h-10 rounded-full bg-snow/20 flex items-center justify-center backdrop-blur-md">
                <Settings className="w-5 h-5" />
              </div>
            </div>

            {/* Camera View Area */}
            <div className="flex-1 relative bg-obsidian">
              {selectedImage ? (
                <img src={selectedImage} alt="Scanned" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Scanner focus box */}
                  <div className="w-64 h-64 border-2 border-snow/50 rounded-[40px] relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-snow rounded-tl-[40px]"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-snow rounded-tr-[40px]"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-snow rounded-bl-[40px]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-snow rounded-br-[40px]"></div>
                  </div>
                  <p className="mt-8 text-body text-snow/70">Point camera at your food</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-obsidian/40 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <div className="w-16 h-16 border-4 border-snow border-t-transparent rounded-full animate-spin mb-4"></div>
                  <span className="text-body font-medium">Analyzing meal...</span>
                </div>
              )}

            </div>

            {/* Bottom Controls (if not analyzed yet) */}
            {!analysisResult && (
              <div className="pb-12 pt-6 px-6 absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-obsidian to-transparent">
                <div className="flex justify-center space-x-6 mb-8">
                  <div className="bg-snow/20 backdrop-blur-md rounded-full px-6 py-2 text-caption font-medium">Scan or Upload food</div>
                </div>
                <div className="flex justify-center items-center space-x-12">
                  
                  {/* Gallery Upload */}
                  <div className="relative cursor-pointer flex flex-col items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-12 h-12 rounded-full bg-snow/20 backdrop-blur-md flex items-center justify-center mb-2 hover:bg-snow/30 transition-colors">
                      <svg className="w-5 h-5 text-snow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-snow/80">Gallery</span>
                  </div>

                  {/* Camera Shutter */}
                  <div className="relative cursor-pointer flex flex-col items-center">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-20 h-20 rounded-full border-[5px] border-snow flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                      <div className="w-14 h-14 rounded-full bg-snow"></div>
                    </div>
                  </div>

                  {/* Empty space to balance the gallery icon */}
                  <div className="w-12"></div>
                </div>
              </div>
            )}

            {/* Bottom Sheet Results */}
            <AnimatePresence>
              {analysisResult && !isAnalyzing && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-snow text-ink rounded-t-[32px] p-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-12 h-1 bg-silver-mist rounded-full mx-auto mb-6"></div>

                  <div className="mb-6">
                    <span className="text-[10px] font-semibold text-graphite uppercase tracking-wider mb-1 block">Nutrition</span>
                    <h2 className="font-display font-bold text-[22px] mt-1 leading-tight">{analysisResult.name}</h2>
                    <p className="text-caption text-graphite mt-1">{analysisResult.review}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3">
                        <Flame className="w-4 h-4 text-ink" />
                      </div>
                      <div>
                        <div className="text-[10px] text-graphite font-semibold">Calories</div>
                        <div className="font-bold text-body-sm">{analysisResult.calories}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3">
                        <Activity className="w-4 h-4 text-[#ff9500]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-graphite font-semibold">Carbs</div>
                        <div className="font-bold text-body-sm">{analysisResult.carbs}g</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3">
                        <Beef className="w-4 h-4 text-[#ff3b30]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-graphite font-semibold">Protein</div>
                        <div className="font-bold text-body-sm">{analysisResult.protein}g</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3">
                        <Droplet className="w-4 h-4 text-[#0071e3]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-graphite font-semibold">Fats</div>
                        <div className="font-bold text-body-sm">{analysisResult.fat}g</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-2 mb-8">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-2">
                        <Activity className="w-5 h-5 text-[#34c759]" />
                      </div>
                      <span className="font-medium text-body-sm">Health score</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-body-sm mr-4">{analysisResult.healthScore}/10</span>
                      <div className="w-32 h-1 bg-silver-mist rounded-full overflow-hidden">
                        <div className="h-full bg-[#34c759]" style={{ width: `${(analysisResult.healthScore / 10) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pb-6">
                    <button onClick={closeScanner} className="bg-fog text-ink flex-1 py-4 font-semibold rounded-[24px] text-body-sm transition-colors hover:bg-silver-mist">Discard</button>
                    <button onClick={confirmMeal} className="bg-ink text-snow flex-1 py-4 font-semibold rounded-[24px] text-body-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02]">Save Meal</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
