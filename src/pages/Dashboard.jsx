import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Home, BarChart2, Settings, Plus, X, Activity, Flame, Droplet, Beef, TrendingDown, TrendingUp, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import Profile from './Profile';
import { analyzeFoodImage } from '../services/openai';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
  PieChart, Pie, Sector, 
  LineChart, Line
} from 'recharts';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDay, setSelectedDay] = useState('today'); // 'today' or 'yesterday'
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [userData, setUserData] = useState(null);
  const [allMeals, setAllMeals] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        // Fetch User Profile
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Fetch Meals (Last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const mealsRef = collection(db, 'users', auth.currentUser.uid, 'meals');
        const qMeals = query(mealsRef, where('timestamp', '>=', thirtyDaysAgo.toISOString()), orderBy('timestamp', 'desc'));
        const querySnap = await getDocs(qMeals);
        const mealsData = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllMeals(mealsData);

        // Fetch Weight History
        const weightRef = collection(db, 'users', auth.currentUser.uid, 'weight_history');
        const qWeight = query(weightRef, orderBy('timestamp', 'asc'));
        const weightSnap = await getDocs(qWeight);
        setWeightHistory(weightSnap.docs.map(doc => doc.data()));
      }
    };
    fetchData();
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const compressImage = (file, maxWidth = 512, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", { type: 'image/webp' }));
          }, 'image/webp', quality);
        };
      };
    });
  };

  const handleImageUpload = async (e) => {
    const originalFile = e.target.files[0];
    if (originalFile) {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      
      try {
        const compressedFile = await compressImage(originalFile);
        const localUrl = URL.createObjectURL(compressedFile);
        setSelectedImage(localUrl);
        setCurrentFile(compressedFile);

        const result = await analyzeFoodImage(compressedFile);
        const mealWithMetadata = { 
          ...result, 
          image: localUrl, 
          timestamp: new Date().toISOString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setAnalysisResult(mealWithMetadata);
      } catch (error) {
        console.error("Analysis failed", error);
        alert("Failed to analyze image.");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const confirmMeal = async () => {
    if (analysisResult && auth.currentUser && currentFile) {
      try {
        setLoading(true);
        // 1. Upload to Firebase Storage
        const fileExtension = currentFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const storageRef = ref(storage, `users/${auth.currentUser.uid}/meals/${fileName}`);
        
        await uploadBytes(storageRef, currentFile);
        const downloadURL = await getDownloadURL(storageRef);

        // 2. Save to Firestore with the REAL URL
        const mealsRef = collection(db, 'users', auth.currentUser.uid, 'meals');
        await addDoc(mealsRef, {
          name: analysisResult.name,
          calories: analysisResult.calories,
          protein: analysisResult.protein,
          carbs: analysisResult.carbs,
          fat: analysisResult.fat,
          healthScore: analysisResult.healthScore,
          review: analysisResult.review,
          timestamp: analysisResult.timestamp,
          time: analysisResult.time,
          image: downloadURL
        });
        
        setAllMeals(prev => [{ ...analysisResult, image: downloadURL }, ...prev]);
      } catch (error) {
        console.error("Error saving meal:", error);
        alert("Failed to save meal image. Check your Firebase Storage rules.");
      } finally {
        setLoading(false);
      }
    }
    closeScanner();
  };

  const closeScanner = () => {
    setIsScanning(false);
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  const targets = userData?.targets || { targetCalories: 2000, targetProtein: 150, targetCarbs: 200, targetFats: 70 };
  
  // Calculate selected day's macros
  const dayDate = useMemo(() => {
    const d = new Date();
    if (selectedDay === 'yesterday') d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }, [selectedDay]);

  const displayedMeals = allMeals.filter(m => m.timestamp.startsWith(dayDate));
  
  const consumedMacros = useMemo(() => {
    return displayedMeals.reduce((acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [displayedMeals]);

  const caloriesLeft = Math.max(0, targets.targetCalories - consumedMacros.calories);
  const calPercent = Math.min((consumedMacros.calories / targets.targetCalories) * 100, 100) || 0;
  const circumference = 2 * Math.PI * 34;
  const dashOffset = circumference - (calPercent / 100) * circumference;

  const protPercent = Math.min((consumedMacros.protein / targets.targetProtein) * 100, 100) || 0;
  const carbPercent = Math.min((consumedMacros.carbs / targets.targetCarbs) * 100, 100) || 0;
  const fatPercent = Math.min((consumedMacros.fat / targets.targetFats) * 100, 100) || 0;

  // --- Analytics Data Processing ---

  // 1. Weekly Calorie Trend (Traffic Light)
  const weeklyTrendData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const dayMeals = allMeals.filter(m => m.timestamp.startsWith(dateStr));
      const totalCal = dayMeals.reduce((acc, m) => acc + m.calories, 0);
      return {
        day: d.toLocaleDateString([], { weekday: 'short' }),
        calories: totalCal,
        target: targets.targetCalories
      };
    });
    return last7Days;
  }, [allMeals, targets.targetCalories]);

  // 2. Macro Composition (Last 30 Days)
  const macroStats = useMemo(() => {
    const totalP = allMeals.reduce((acc, m) => acc + m.protein, 0);
    const totalC = allMeals.reduce((acc, m) => acc + m.carbs, 0);
    const totalF = allMeals.reduce((acc, m) => acc + m.fat, 0);
    const total = totalP + totalC + totalF || 1;
    
    return [
      { name: 'Protein', value: totalP, percent: Math.round((totalP/total)*100), color: '#ff3b30' },
      { name: 'Carbs', value: totalC, percent: Math.round((totalC/total)*100), color: '#ff9500' },
      { name: 'Fats', value: totalF, percent: Math.round((totalF/total)*100), color: '#0071e3' }
    ];
  }, [allMeals]);

  // 3. Top 5 Foods
  const topFoods = useMemo(() => {
    const counts = {};
    allMeals.forEach(m => {
      counts[m.name] = (counts[m.name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [allMeals]);

  // 4. Weight Progress
  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || userData?.profile?.weight || 0;
  const startWeight = weightHistory[0]?.weight || currentWeight;
  const weightChange = currentWeight - startWeight;

  return (
    <div className="min-h-screen bg-fog text-ink font-sans pb-24 relative overflow-hidden">

      {/* --- Main Dashboard Content --- */}
      <div className={`transition-opacity duration-300 ${isScanning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {activeTab === 'settings' ? (
          <Profile />
        ) : activeTab === 'analytics' ? (
          <div className="pt-12 px-6 pb-32 max-w-lg mx-auto overflow-y-auto max-h-screen">
            <header className="mb-8">
              <h1 className="font-display font-semibold text-heading-sm mb-1">Analytics</h1>
              <p className="text-body-sm text-graphite">Monthly performance & insights</p>
            </header>

            {/* 1. Weekly Caloric Balance (Traffic Light) */}
            <div className="card-white p-6 mb-6 shadow-sm-soft border border-silver-mist">
              <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-4">Weekly Calorie Balance</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyTrendData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 500}} />
                    <Tooltip cursor={{fill: '#f2f2f7'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <ReferenceLine y={targets.targetCalories} stroke="#8e8e93" strokeDasharray="3 3" />
                    <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
                      {weeklyTrendData.map((entry, index) => {
                        const isOver = entry.calories > entry.target;
                        const isWayUnder = entry.calories < entry.target * 0.7;
                        let color = '#34c759'; // Green (Good/Normal)
                        if (isOver) color = '#ff3b30'; // Red (Excess)
                        if (isWayUnder && entry.calories > 0) color = '#ffcc00'; // Yellow (Under)
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-4 text-[10px] text-graphite font-medium">
                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#ff3b30] mr-1"></div> Over</span>
                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#34c759] mr-1"></div> Target</span>
                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#ffcc00] mr-1"></div> Under</span>
              </div>
            </div>

            {/* 2. Macro Composition (Donut Chart) */}
            <div className="card-white p-6 mb-6 border border-silver-mist">
              <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-6">30-Day Macro Distribution</h3>
              <div className="flex items-center">
                <div className="w-1/2 h-32">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie data={macroStats} innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value">
                         {macroStats.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                       </Pie>
                     </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-3">
                  {macroStats.map((m, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: m.color}}></div>
                        <span className="text-[11px] font-semibold">{m.name}</span>
                      </div>
                      <span className="text-[11px] font-bold">{m.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Top 5 Foods */}
            <div className="card-white p-6 mb-6 border border-silver-mist">
              <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-4">Most Tracked Meals</h3>
              <div className="space-y-4">
                {topFoods.length > 0 ? topFoods.map((food, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-fog rounded-full flex items-center justify-center mr-3 text-[10px] font-bold">{i+1}</div>
                      <span className="text-body-sm font-medium">{food.name}</span>
                    </div>
                    <div className="bg-fog px-3 py-1 rounded-full text-[10px] font-bold">{food.count}x</div>
                  </div>
                )) : <p className="text-caption text-graphite italic">No meals logged yet.</p>}
              </div>
            </div>

            {/* 4. Weight Progress */}
            <div className="card-white p-6 border border-silver-mist">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-1">Weight Progress</h3>
                  <div className="text-heading-sm font-bold">{currentWeight} kg</div>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full ${weightChange <= 0 ? 'bg-[#34c759]/10 text-[#34c759]' : 'bg-[#ff3b30]/10 text-[#ff3b30]'} text-[11px] font-bold`}>
                  {weightChange <= 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                  {Math.abs(weightChange).toFixed(1)} kg
                </div>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightHistory}>
                    <Line type="monotone" dataKey="weight" stroke="#1c1c1e" strokeWidth={3} dot={{ r: 4, fill: '#1c1c1e' }} />
                    <Tooltip cursor={false} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        ) : activeTab === 'history' ? (
          <div className="pt-12 px-6 max-w-lg mx-auto">
            <h1 className="font-display font-semibold text-heading-sm mb-6">Meal History</h1>
            <div className="space-y-4">
              {allMeals.length === 0 ? (
                <p className="text-caption text-graphite text-center py-12 bg-snow rounded-[20px] border border-dashed border-silver-mist">No history found yet.</p>
              ) : (
                allMeals.map((meal, index) => (
                  <div key={index} className="card-white !p-4 flex items-center space-x-4 rounded-[20px] border border-silver-mist/50">
                    <img src={meal.image} alt={meal.name} className="w-16 h-16 rounded-2xl object-cover bg-fog" />
                    <div className="flex-1">
                       <h4 className="font-semibold text-body-sm">{meal.name}</h4>
                       <div className="text-caption text-graphite">{meal.calories} kcal • {new Date(meal.timestamp).toLocaleDateString()} {meal.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <header className="pt-12 px-6 pb-6 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="font-display font-semibold text-heading-sm">
                  Hi, {auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "User"}
                </span>
              </div>
            </div>

            {/* Day Selector */}
            {/* Day Selector */}
            <div className="flex space-x-6 text-body-sm font-medium mb-6 border-b border-silver-mist pb-2">
              <button 
                onClick={() => setSelectedDay('today')}
                className={`${selectedDay === 'today' ? 'text-ink border-b-2 border-ink' : 'text-graphite'} pb-2 -mb-[9px] transition-colors`}
              >
                Today
              </button>
              <button 
                onClick={() => setSelectedDay('yesterday')}
                className={`${selectedDay === 'yesterday' ? 'text-ink border-b-2 border-ink' : 'text-graphite'} pb-2 -mb-[9px] transition-colors`}
              >
                Yesterday
              </button>
            </div>

            {/* Calorie Card */}
            <div className="card-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8 flex justify-between items-center relative overflow-hidden rounded-[24px]">
              <div>
                <div className="font-display font-bold text-[48px] tracking-tight leading-none">{caloriesLeft}</div>
                <div className="text-caption text-graphite mt-1 font-medium">Calories left</div>
              </div>

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
                {displayedMeals.length === 0 ? (
                  <p className="text-caption text-graphite text-center py-4 bg-snow rounded-[20px] border border-silver-mist/50">You haven't scanned any meals {selectedDay}.</p>
                ) : (
                  displayedMeals.map((meal, index) => (
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
          <div className="max-w-lg mx-auto grid grid-cols-5 items-center h-[80px] relative px-2">
            <button className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('home')}>
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button className={`flex flex-col items-center space-y-1 ${activeTab === 'analytics' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('analytics')}>
              <BarChart2 className="w-5 h-5" />
              <span className="text-[10px] font-medium">Analytics</span>
            </button>

            {/* Middle Slot for FAB */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10"></div>
            </div>

            <button className={`flex flex-col items-center space-y-1 ${activeTab === 'history' ? 'text-ink' : 'text-graphite'}`} onClick={() => setActiveTab('history')}>
              <Activity className="w-5 h-5" />
              <span className="text-[10px] font-medium">History</span>
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

            {!analysisResult && (
              <div className="pb-12 pt-6 px-6 absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-obsidian to-transparent">
                <div className="flex justify-center space-x-6 mb-8">
                  <div className="bg-snow/20 backdrop-blur-md rounded-full px-6 py-2 text-caption font-medium">Scan or Upload food</div>
                </div>
                <div className="flex justify-center items-center space-x-12">
                  <div className="relative cursor-pointer flex flex-col items-center">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-12 h-12 rounded-full bg-snow/20 backdrop-blur-md flex items-center justify-center mb-2 hover:bg-snow/30 transition-colors">
                      <svg className="w-5 h-5 text-snow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-snow/80">Gallery</span>
                  </div>

                  <div className="relative cursor-pointer flex flex-col items-center">
                    <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-20 h-20 rounded-full border-[5px] border-snow flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                      <div className="w-14 h-14 rounded-full bg-snow"></div>
                    </div>
                  </div>
                  <div className="w-12"></div>
                </div>
              </div>
            )}

            <AnimatePresence>
              {analysisResult && !isAnalyzing && (
                <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: "spring", bounce: 0, duration: 0.5 }} className="absolute bottom-0 left-0 right-0 bg-snow text-ink rounded-t-[32px] p-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
                  <div className="w-12 h-1 bg-silver-mist rounded-full mx-auto mb-6"></div>
                  <div className="mb-6">
                    <span className="text-[10px] font-semibold text-graphite uppercase tracking-wider mb-1 block">Nutrition</span>
                    <h2 className="font-display font-bold text-[22px] mt-1 leading-tight">{analysisResult.name}</h2>
                    <p className="text-caption text-graphite mt-1">{analysisResult.review}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3"><Flame className="w-4 h-4 text-ink" /></div>
                      <div><div className="text-[10px] text-graphite font-semibold">Calories</div><div className="font-bold text-body-sm">{analysisResult.calories}</div></div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3"><Activity className="w-4 h-4 text-[#ff9500]" /></div>
                      <div><div className="text-[10px] text-graphite font-semibold">Carbs</div><div className="font-bold text-body-sm">{analysisResult.carbs}g</div></div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3"><Beef className="w-4 h-4 text-[#ff3b30]" /></div>
                      <div><div className="text-[10px] text-graphite font-semibold">Protein</div><div className="font-bold text-body-sm">{analysisResult.protein}g</div></div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-8 h-8 rounded-full bg-fog flex items-center justify-center mr-3"><Droplet className="w-4 h-4 text-[#0071e3]" /></div>
                      <div><div className="text-[10px] text-graphite font-semibold">Fats</div><div className="font-bold text-body-sm">{analysisResult.fat}g</div></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2 mb-8">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-2"><Activity className="w-5 h-5 text-[#34c759]" /></div>
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
                    <button 
                      onClick={confirmMeal} 
                      disabled={loading}
                      className="bg-ink text-snow flex-1 py-4 font-semibold rounded-[24px] text-body-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Save Meal'}
                    </button>
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
