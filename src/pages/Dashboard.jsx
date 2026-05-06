import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Home, BarChart2, Settings, Plus, X, Activity, Flame, Droplet, Beef, TrendingDown, TrendingUp, Trophy, Search, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy, limit, setDoc } from 'firebase/firestore';
import Profile from './Profile';
import { analyzeFoodImage } from '../services/openai';
import { RECIPES_DB } from '../data/recipes';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
  PieChart, Pie, Sector,
  LineChart, Line
} from 'recharts';

const FOOD_DB = [
  { name: 'Chicken Breast', p: 31, c: 0, f: 3.6, cat: 'Protein' },
  { name: 'Salmon', p: 20, c: 0, f: 13, cat: 'Protein/Fat' },
  { name: 'Eggs (2 units)', p: 13, c: 1, f: 11, cat: 'Protein/Fat' },
  { name: 'Greek Yogurt', p: 10, c: 4, f: 0, cat: 'Protein' },
  { name: 'White Rice (cooked)', p: 2.7, c: 28, f: 0.3, cat: 'Carbs' },
  { name: 'Potato (boiled)', p: 2, c: 17, f: 0.1, cat: 'Carbs' },
  { name: 'Oats', p: 13, c: 66, f: 7, cat: 'Carbs' },
  { name: 'Avocado', p: 2, c: 9, f: 15, cat: 'Fat/Carbs' },
  { name: 'Olive Oil (1 tbsp)', p: 0, c: 0, f: 14, cat: 'Fat' },
  { name: 'Broccoli', p: 2.8, c: 7, f: 0.4, cat: 'Veggie' },
  { name: 'Walnuts', p: 15, c: 14, f: 65, cat: 'Fat' }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDay, setSelectedDay] = useState('today'); // 'today' or 'yesterday'
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedLoggedMeal, setSelectedLoggedMeal] = useState(null);

  const [userData, setUserData] = useState(null);
  const [allMeals, setAllMeals] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0); // in glasses
  const [fasting, setFasting] = useState({ active: false, startTime: null, protocol: 16 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const streak = useMemo(() => {
    if (!allMeals.length || !userData?.targets) return 0;
    let count = 0;
    const target = userData.targets.targetCalories;
    const dates = [...new Set(allMeals.map(m => m.timestamp.split('T')[0]))].sort().reverse();

    let checkDate = new Date();
    for (let i = 0; i < 30; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const dayMeals = allMeals.filter(m => m.timestamp.startsWith(dateStr));
      const total = dayMeals.reduce((acc, m) => acc + m.calories, 0);

      if (total > 0 && Math.abs(total - target) < target * 0.2) {
        count++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (i === 0 && total === 0) {
        // Still today, don't break streak yet
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [allMeals, userData]);
  const waterTarget = useMemo(() => {
    const weight = weightHistory[weightHistory.length - 1]?.weight || userData?.profile?.weight || 70;
    return Math.round((weight * 35) / 250); // 35ml per kg, 250ml per glass
  }, [weightHistory, userData]);

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
        // Fetch Water Intake for today
        const dateStr = new Date().toISOString().split('T')[0];
        const waterRef = doc(db, 'users', auth.currentUser.uid, 'water', dateStr);
        const waterSnap = await getDoc(waterRef);
        if (waterSnap.exists()) {
          setWaterIntake(waterSnap.data().glasses || 0);
        }
        // Fetch Fasting State
        const fastRef = doc(db, 'users', auth.currentUser.uid, 'fasting', 'current');
        const fastSnap = await getDoc(fastRef);
        if (fastSnap.exists()) {
          setFasting(fastSnap.data());
        }
      }
    };
    fetchData();
  }, [activeTab, selectedDay]);

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

  const updateWater = async (amount) => {
    const newAmount = Math.max(0, waterIntake + amount);
    setWaterIntake(newAmount);
    if (auth.currentUser) {
      const dateStr = new Date().toISOString().split('T')[0];
      const waterRef = doc(db, 'users', auth.currentUser.uid, 'water', dateStr);
      await setDoc(waterRef, { glasses: newAmount }, { merge: true });
    }
  };

  const toggleFast = async (protocol = 16) => {
    if (!auth.currentUser) return;
    const newState = {
      active: !fasting.active,
      startTime: !fasting.active ? new Date().toISOString() : null,
      protocol: protocol
    };
    setFasting(newState);
    const fastRef = doc(db, 'users', auth.currentUser.uid, 'fasting', 'current');
    await setDoc(fastRef, newState);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRecipes = useMemo(() => {
    return RECIPES_DB.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === 'All' || recipe.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

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

  const solveMacros = () => {
    const remP = Math.max(0, targets.targetProtein - consumedMacros.protein);
    const remC = Math.max(0, targets.targetCarbs - consumedMacros.carbs);
    const remF = Math.max(0, targets.targetFats - consumedMacros.fat);

    if (remP < 5 && remC < 5 && remF < 5) return "You've already hit your targets!";

    // Simple heuristic solver: pick 1 main protein, 1 main carb
    const mainP = FOOD_DB.find(f => f.cat === 'Protein' || f.cat === 'Protein/Fat');
    const mainC = FOOD_DB.find(f => f.cat === 'Carbs');

    const gramsP = Math.round((remP / mainP.p) * 100);
    const gramsC = Math.round((remC / mainC.c) * 100);

    return [
      { name: mainP.name, amount: gramsP, unit: 'g' },
      { name: mainC.name, amount: gramsC, unit: 'g' }
    ];
  };

  const solution = useMemo(() => solveMacros(), [consumedMacros, targets]);

  const closeScanner = () => {
    setIsScanning(false);
    setSelectedImage(null);
    setAnalysisResult(null);
  };



  const caloriesLeft = Math.max(0, targets.targetCalories - consumedMacros.calories);
  const calPercent = Math.min((consumedMacros.calories / targets.targetCalories) * 100, 100) || 0;
  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference - (calPercent / 100) * circumference;
  const isOverGoal = consumedMacros.calories > targets.targetCalories;

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

  // 2. Macro Composition (Donut Chart)
  const macroStats = useMemo(() => {
    const totalP = allMeals.reduce((acc, m) => acc + m.protein, 0);
    const totalC = allMeals.reduce((acc, m) => acc + m.carbs, 0);
    const totalF = allMeals.reduce((acc, m) => acc + m.fat, 0);
    const total = totalP + totalC + totalF || 1;

    return [
      { name: 'Protein', value: totalP, percent: Math.round((totalP / total) * 100), color: '#ff3b30' },
      { name: 'Carbs', value: totalC, percent: Math.round((totalC / total) * 100), color: '#ff9500' },
      { name: 'Fats', value: totalF, percent: Math.round((totalF / total) * 100), color: '#0071e3' }
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
    <div className="min-h-screen bg-snow font-sans text-ink flex flex-col md:flex-row overflow-x-hidden">

      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:flex flex-col w-64 bg-snow border-r border-silver-mist h-screen sticky top-0 z-40 p-6">
        <div className="mb-10">
          <span className="font-display font-bold text-heading-sm tracking-tight">Koda</span>
        </div>

        {/* Scan Meal at the Top */}
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

      {/* --- Main Dashboard Content Area --- */}
      <main className={`flex-1 transition-opacity duration-300 ${isScanning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {activeTab === 'settings' ? (
          <Profile />
        ) : activeTab === 'analytics' ? (
          <div className="pt-12 px-6 pb-32 max-w-7xl mx-auto">
            <header className="mb-10 text-center md:text-left">
              <h1 className="font-display font-semibold text-heading-sm md:text-heading-md mb-1">Analytics</h1>
              <p className="text-body-sm text-graphite">Monthly performance & health insights</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Weekly Caloric Balance (Traffic Light) */}
              <div className="card-white p-6 shadow-sm-soft border border-silver-mist lg:col-span-2">
                <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-4">Weekly Calorie Balance</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyTrendData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 500 }} />
                      <Tooltip cursor={{ fill: '#f2f2f7' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <ReferenceLine y={targets.targetCalories} stroke="#8e8e93" strokeDasharray="3 3" />
                      <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
                        {weeklyTrendData.map((entry, index) => {
                          const isOver = entry.calories > entry.target;
                          const isWayUnder = entry.calories < entry.target * 0.7;
                          let color = '#34c759';
                          if (isOver) color = '#ff3b30';
                          if (isWayUnder && entry.calories > 0) color = '#ffcc00';
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
              <div className="card-white p-6 border border-silver-mist">
                <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-6">30-Day Macro Distribution</h3>
                <div className="flex flex-col items-center">
                  <div className="w-full h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={macroStats} innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                          {macroStats.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full mt-6 space-y-3">
                    {macroStats.map((m, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: m.color }}></div>
                          <span className="text-[11px] font-semibold">{m.name}</span>
                        </div>
                        <span className="text-[11px] font-bold">{m.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Top 5 Foods */}
              <div className="card-white p-6 border border-silver-mist">
                <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-4">Most Tracked Meals</h3>
                <div className="space-y-4">
                  {topFoods.length > 0 ? topFoods.map((food, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-fog rounded-full flex items-center justify-center mr-3 text-[10px] font-bold">{i + 1}</div>
                        <span className="text-body-sm font-medium">{food.name}</span>
                      </div>
                      <div className="bg-fog px-3 py-1 rounded-full text-[10px] font-bold">{food.count}x</div>
                    </div>
                  )) : <p className="text-caption text-graphite italic">No meals logged yet.</p>}
                </div>
              </div>

              {/* 4. Weight Progress */}
              <div className="card-white p-6 border border-silver-mist md:col-span-2 lg:col-span-2">
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
                <div className="h-48 w-full mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightHistory}>
                      <Line type="monotone" dataKey="weight" stroke="#1c1c1e" strokeWidth={3} dot={{ r: 4, fill: '#1c1c1e' }} />
                      <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Weight Timeline */}
                <div className="space-y-3 border-t border-silver-mist pt-6">
                  <h4 className="text-[10px] font-bold text-graphite uppercase tracking-widest mb-4">Weight Logs</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...weightHistory].reverse().slice(0, 6).map((log, i) => (
                      <div key={i} className="flex justify-between items-center text-body-sm p-3 bg-fog rounded-xl">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-ink/20 mr-3"></div>
                          <span className="text-graphite">{new Date(log.timestamp).toLocaleDateString([], { day: 'numeric', month: 'short' })}</span>
                        </div>
                        <span className="font-bold">{log.weight} kg</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'equilibrador' ? (
          <div className="pt-12 px-6 max-w-7xl mx-auto">
            <header className="mb-10 text-center">
              <div className="w-16 h-16 bg-ink text-snow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>
              <h1 className="font-display font-semibold text-heading-sm mb-2">Macro Equilibrador</h1>
              <p className="text-body-sm text-graphite px-4">Based on what you've eaten today, here is the ideal combination for your next meal.</p>
            </header>

            <div className="space-y-6">
              <div className="card-white p-6 border border-silver-mist/50 shadow-sm-soft">
                <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-6 text-center">Remaining to hit target</h3>
                <div className="flex justify-around mb-2">
                  <div className="text-center">
                    <div className="text-heading-sm font-bold text-[#ff3b30]">{Math.max(0, targets.targetProtein - consumedMacros.protein)}g</div>
                    <div className="text-[10px] text-graphite font-bold uppercase">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-heading-sm font-bold text-[#ff9500]">{Math.max(0, targets.targetCarbs - consumedMacros.carbs)}g</div>
                    <div className="text-[10px] text-graphite font-bold uppercase">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-heading-sm font-bold text-[#0071e3]">{Math.max(0, targets.targetFats - consumedMacros.fat)}g</div>
                    <div className="text-[10px] text-graphite font-bold uppercase">Fats</div>
                  </div>
                </div>
              </div>

              <div className="bg-ink text-snow rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-snow/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="font-display font-semibold text-body mb-6 relative z-10">Koda Recommended Meal</h3>

                {typeof solution === 'string' ? (
                  <p className="text-snow/70 italic">{solution}</p>
                ) : (
                  <div className="space-y-4 relative z-10">
                    {solution.map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-snow/10 pb-4 last:border-0 last:pb-0">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-baseline">
                          <span className="text-[24px] font-bold mr-1">{item.amount}</span>
                          <span className="text-[14px] opacity-60 font-medium">{item.unit}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 mt-2">
                      <p className="text-[11px] text-snow/50 italic leading-relaxed">
                        *Weights are for cooked food. This combination perfectly balances your remaining macros for the day.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-fog rounded-2xl flex items-center space-x-3 border border-silver-mist/30 mb-8">
                <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-ink" />
                </div>
                <p className="text-[11px] text-graphite leading-snug">
                  This calculator uses <b>Zero-Token Logic</b> based on local mathematical heuristics.
                </p>
              </div>

              {/* Recipe Explorer */}
              <div className="pt-4 pb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-body">Koda Recipe Book</h2>
                  <span className="text-[10px] bg-fog px-2 py-1 rounded font-bold">{RECIPES_DB.length} RECIPES</span>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="text"
                    placeholder="Search by ingredient or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-snow border border-silver-mist rounded-2xl py-4 pl-11 pr-4 text-body-sm focus:border-ink outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-6 scrollbar-hide">
                  {['All', 'High Protein', 'Balanced', 'Low Carb', 'Vegan', 'Quick Snack'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold transition-all ${activeFilter === filter ? 'bg-ink text-snow' : 'bg-fog text-graphite'}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRecipes.map(recipe => (
                    <motion.div
                      key={recipe.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedRecipe(recipe)}
                      className="card-white !p-0 overflow-hidden border border-silver-mist/50 shadow-sm-soft group cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 w-full overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-azure uppercase tracking-wider">{recipe.category}</span>
                          <div className="flex items-center text-[10px] text-graphite">
                            <Clock className="w-3 h-3 mr-1" /> {recipe.time}
                          </div>
                        </div>
                        <h4 className="font-semibold text-body-sm mb-1 group-hover:text-azure transition-colors">{recipe.name}</h4>
                        <p className="text-[11px] text-graphite line-clamp-2 mb-4 leading-relaxed">{recipe.description}</p>

                        <div className="flex items-center space-x-2 mt-4">
                          <div className="flex items-center bg-[#ff3b30]/10 text-[#ff3b30] px-2 py-1 rounded-lg border border-[#ff3b30]/10">
                            <Beef className="w-3 h-3 mr-1" />
                            <span className="text-[10px] font-bold">{recipe.macros.p}g</span>
                          </div>
                          <div className="flex items-center bg-[#ff9500]/10 text-[#ff9500] px-2 py-1 rounded-lg border border-[#ff9500]/10">
                            <Activity className="w-3 h-3 mr-1" />
                            <span className="text-[10px] font-bold">{recipe.macros.c}g</span>
                          </div>
                          <div className="flex items-center bg-[#0071e3]/10 text-[#0071e3] px-2 py-1 rounded-lg border border-[#0071e3]/10">
                            <Droplet className="w-3 h-3 mr-1" />
                            <span className="text-[10px] font-bold">{recipe.macros.f}g</span>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 pt-4 border-t border-silver-mist/30">
                          <button className="w-8 h-8 bg-fog rounded-full flex items-center justify-center group-hover:bg-ink group-hover:text-snow transition-all duration-300">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-12 px-6 pb-32 max-w-7xl mx-auto">
            <header className="mb-10 text-center md:text-left">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <span className="font-display font-semibold text-heading-sm">
                    Hi, {auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "User"}
                  </span>
                  {streak > 0 && (
                    <div className="flex items-center bg-[#ff9500]/10 px-3 py-1 rounded-full border border-[#ff9500]/20">
                      <Flame className="w-4 h-4 text-[#ff9500] mr-1" />
                      <span className="text-[12px] font-bold text-[#ff9500]">{streak}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-6 text-body-sm font-medium border-b border-silver-mist pb-2 justify-center md:justify-start">
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
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Main Progress Circle */}
              <div className="card-white p-8 flex flex-col items-center justify-center border border-silver-mist/50 shadow-sm-soft">
                <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-6">Daily Calories</h3>
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <defs>
                      <linearGradient id="calGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0071e3" />
                        <stop offset="100%" stopColor="#2bd9ff" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke="#f2f2f7" strokeWidth="8" fill="transparent" />
                    <motion.circle
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: dashOffset }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="80" cy="80" r="70"
                      stroke={isOverGoal ? "#ff3b30" : "url(#calGradient)"}
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-heading-md font-bold text-ink leading-none">{caloriesLeft}</span>
                    <span className="text-[10px] text-graphite font-bold uppercase mt-1">kcal left</span>
                  </div>
                </div>
              </div>

              {/* Macros Rings */}
              <div className="card-white p-8 flex flex-col justify-center border border-silver-mist/50 shadow-sm-soft">
                <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-8 text-center">Macros Status</h3>
                <div className="flex justify-around">
                  {[
                    { label: 'Prot', value: consumedMacros.protein, percent: protPercent, color: '#ff3b30', icon: <Beef className="w-3 h-3" /> },
                    { label: 'Carbs', value: consumedMacros.carbs, percent: carbPercent, color: '#ff9500', icon: <Activity className="w-3 h-3" /> },
                    { label: 'Fats', value: consumedMacros.fat, percent: fatPercent, color: '#0071e3', icon: <Droplet className="w-3 h-3" /> }
                  ].map((macro, i) => {
                    const r = 20;
                    const circ = 2 * Math.PI * r;
                    const offset = circ - (macro.percent / 100) * circ;
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="relative w-14 h-14 flex items-center justify-center mb-3">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="28" cy="28" r={r} stroke="#f2f2f7" strokeWidth="3" fill="transparent" />
                            <motion.circle
                              initial={{ strokeDashoffset: circ }}
                              animate={{ strokeDashoffset: offset }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              cx="28" cy="28" r={r}
                              stroke={macro.color} strokeWidth="3" fill="transparent"
                              strokeDasharray={circ}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center" style={{ color: macro.color }}>
                            {macro.icon}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-[12px] font-bold text-ink">{macro.value}g</div>
                          <div className="text-[9px] text-graphite font-bold uppercase">{macro.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Water & Fasting Column */}
              <div className="grid grid-cols-1 gap-4">
                {/* Water Widget */}
                <div className="card-white p-5 flex items-center justify-between border border-silver-mist/50 shadow-sm-soft">
                  <div className="flex items-center">
                    <motion.div key={waterIntake} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-10 h-10 bg-fog rounded-xl flex items-center justify-center mr-3 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-[#0071e3]/20" style={{ height: `${Math.min((waterIntake / waterTarget) * 100, 100)}%` }} />
                      <Droplet className={`w-5 h-5 z-10 ${waterIntake > 0 ? 'text-[#0071e3]' : 'text-graphite/40'}`} />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-[11px] uppercase tracking-wider text-graphite mb-1">Water</h3>
                      <div className="text-body-sm font-bold">{waterIntake}/{waterTarget}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => updateWater(-1)} className="w-7 h-7 rounded-full border border-silver-mist flex items-center justify-center text-graphite">-</button>
                    <button onClick={() => updateWater(1)} className="w-7 h-7 rounded-full bg-ink text-snow flex items-center justify-center shadow-sm"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Fasting Widget */}
                <div className="card-white p-5 border border-silver-mist/50 shadow-sm-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#5856d6]/10 rounded-xl flex items-center justify-center mr-3">
                        <Activity className={`w-5 h-5 ${fasting.active ? 'text-[#5856d6] animate-pulse' : 'text-graphite/40'}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[11px] uppercase tracking-wider text-graphite">Fasting</h3>
                        <div className="text-body-sm font-bold">
                          {fasting.active ? (
                            <span>{(() => {
                              const diff = Math.floor((currentTime - new Date(fasting.startTime)) / 1000);
                              const h = Math.floor(diff / 3600);
                              const m = Math.floor((diff % 3600) / 60);
                              return `${h}h ${m}m`;
                            })()}</span>
                          ) : 'Not active'}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleFast(16)} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-colors ${fasting.active ? 'bg-[#ff3b30] text-snow' : 'bg-[#5856d6] text-snow'}`}>
                      {fasting.active ? 'Stop' : 'Start'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Meals Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-body">Recent Meals</h3>
                <div className="flex items-center text-caption text-graphite bg-fog px-3 py-1 rounded-full font-medium">
                  {displayedMeals.length} logged
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayedMeals.length === 0 ? (
                  <p className="col-span-full text-caption text-graphite text-center py-12 bg-snow rounded-[20px] border border-dashed border-silver-mist">No meals logged for {selectedDay}.</p>
                ) : (
                  displayedMeals.map((meal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedLoggedMeal(meal)}
                      className="card-white !p-0 overflow-hidden border border-silver-mist/50 shadow-sm-soft group cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 w-full overflow-hidden">
                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-body-sm mb-1 truncate">{meal.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-ink bg-fog px-2 py-0.5 rounded-full">{meal.calories} kcal</span>
                          <span className="text-[10px] text-graphite/40 uppercase font-medium">{meal.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation (Mobile Only) */}
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

            {/* Middle Slot for FAB */}
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
      </main>

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

      {/* --- Recipe Detail Full Screen Overlay --- */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-snow z-[60] overflow-y-auto"
          >
            <div className="relative h-96 w-full">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-snow via-transparent to-transparent"></div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-12 left-6 w-12 h-12 bg-snow/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-ink z-20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 pb-24 -mt-20 relative z-10 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-azure uppercase tracking-widest mb-2 block">{selectedRecipe.category}</span>
                  <h1 className="font-display font-bold text-heading-sm md:text-heading-md leading-tight">{selectedRecipe.name}</h1>
                </div>
                <div className="bg-ink text-snow px-6 py-3 rounded-2xl flex items-center shadow-xl self-start">
                  <Clock className="w-5 h-5 mr-3" />
                  <span className="text-body font-bold">{selectedRecipe.time}</span>
                </div>
              </div>

              <p className="text-body text-graphite mb-10 leading-relaxed max-w-2xl">{selectedRecipe.description}</p>

              {/* Macros Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { label: 'Calories', value: selectedRecipe.macros.calories, unit: 'kcal', color: 'ink' },
                  { label: 'Protein', value: selectedRecipe.macros.p, unit: 'g', color: '[#ff3b30]' },
                  { label: 'Carbs', value: selectedRecipe.macros.c, unit: 'g', color: '[#ff9500]' },
                  { label: 'Fats', value: selectedRecipe.macros.f, unit: 'g', color: '[#0071e3]' }
                ].map((m, i) => (
                  <div key={i} className="bg-fog p-6 rounded-3xl border border-silver-mist/30">
                    <div className={`text-heading-sm font-bold text-${m.color}`}>{m.value}<span className="text-body-sm font-medium opacity-40 ml-1">{m.unit}</span></div>
                    <div className="text-[10px] font-bold text-graphite uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-ink text-snow rounded-xl flex items-center justify-center mr-4">
                      <Plus className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-body">Ingredients</h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center p-4 bg-snow border border-silver-mist rounded-2xl text-body-sm text-graphite shadow-sm">
                        <div className="w-2 h-2 bg-azure rounded-full mr-4"></div>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-ink text-snow rounded-xl flex items-center justify-center mr-4">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-body">Preparation Steps</h3>
                  </div>
                  <div className="bg-fog p-8 rounded-[40px] border border-silver-mist/30 leading-relaxed text-body text-ink shadow-inner">
                    <div className="whitespace-pre-line prose prose-sm max-w-none">
                      {selectedRecipe.instructions}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Logged Meal Detail Full Screen Overlay --- */}
      <AnimatePresence>
        {selectedLoggedMeal && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-snow z-[60] overflow-y-auto"
          >
            <div className="relative h-96 w-full">
              <img src={selectedLoggedMeal.image} alt={selectedLoggedMeal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-snow via-transparent to-transparent"></div>
              <button
                onClick={() => setSelectedLoggedMeal(null)}
                className="absolute top-12 left-6 w-12 h-12 bg-snow/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-ink z-20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 pb-24 -mt-20 relative z-10 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-azure uppercase tracking-widest mb-2 block">Logged Meal</span>
                  <h1 className="font-display font-bold text-heading-sm md:text-heading-md leading-tight">{selectedLoggedMeal.name}</h1>
                </div>
                <div className="bg-ink text-snow px-6 py-3 rounded-2xl flex items-center shadow-xl self-start">
                  <Clock className="w-5 h-5 mr-3" />
                  <span className="text-body font-bold">{selectedLoggedMeal.time}</span>
                </div>
              </div>

              {/* Macros Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { label: 'Calories', value: selectedLoggedMeal.calories, unit: 'kcal', color: 'ink' },
                  { label: 'Protein', value: selectedLoggedMeal.protein, unit: 'g', color: '[#ff3b30]' },
                  { label: 'Carbs', value: selectedLoggedMeal.carbs, unit: 'g', color: '[#ff9500]' },
                  { label: 'Fats', value: selectedLoggedMeal.fat, unit: 'g', color: '[#0071e3]' }
                ].map((m, i) => (
                  <div key={i} className="bg-fog p-6 rounded-3xl border border-silver-mist/30">
                    <div className={`text-heading-sm font-bold text-${m.color}`}>{m.value}<span className="text-body-sm font-medium opacity-40 ml-1">{m.unit}</span></div>
                    <div className="text-[10px] font-bold text-graphite uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-ink text-snow rounded-xl flex items-center justify-center mr-4">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-body">Health Score</h3>
                  </div>
                  <div className="p-6 bg-fog rounded-3xl border border-silver-mist/30 flex flex-col items-center">
                    <div className="text-[48px] font-bold text-[#34c759]">{selectedLoggedMeal.healthScore}<span className="text-body text-graphite opacity-30">/10</span></div>
                    <div className="w-full h-2 bg-silver-mist rounded-full overflow-hidden mt-4">
                      <div className="h-full bg-[#34c759]" style={{ width: `${(selectedLoggedMeal.healthScore / 10) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-ink text-snow rounded-xl flex items-center justify-center mr-4">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-body">AI Review</h3>
                  </div>
                  <div className="bg-fog p-8 rounded-[40px] border border-silver-mist/30 leading-relaxed text-body text-ink shadow-inner">
                    <div className="prose prose-sm max-w-none italic text-graphite">
                      "{selectedLoggedMeal.review}"
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
