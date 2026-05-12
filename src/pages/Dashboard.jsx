import React, { useState, useEffect, useMemo } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy, setDoc } from 'firebase/firestore';
import Profile from './Profile';
import { analyzeFoodImage } from '../services/openai';
import { RECIPES_DB } from '../data/recipes';
import { FOOD_DB, calculateRemainingMacros } from '../utils/nutrition';

//Components
import Sidebar from '../components/dashboard/Sidebar';
import BottomNav from '../components/dashboard/BottomNav';
import AnalyticsTab from '../components/dashboard/AnalyticsTab';
import EquilibradorTab from '../components/dashboard/EquilibradorTab';
import HomeTab from '../components/dashboard/HomeTab';
import ScannerOverlay from '../components/dashboard/ScannerOverlay';
import RecipeDetailModal from '../components/dashboard/RecipeDetailModal';
import MealDetailModal from '../components/dashboard/MealDetailModal';


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

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

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
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const mealsRef = collection(db, 'users', auth.currentUser.uid, 'meals');
        const qMeals = query(mealsRef, where('timestamp', '>=', thirtyDaysAgo.toISOString()), orderBy('timestamp', 'desc'));
        const querySnap = await getDocs(qMeals);
        const mealsData = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllMeals(mealsData);

        const weightRef = collection(db, 'users', auth.currentUser.uid, 'weight_history');
        const qWeight = query(weightRef, orderBy('timestamp', 'asc'));
        const weightSnap = await getDocs(qWeight);
        setWeightHistory(weightSnap.docs.map(doc => doc.data()));

        const d = new Date();
        if (selectedDay === 'yesterday') d.setDate(d.getDate() - 1);
        const dateStr = d.toISOString().split('T')[0];

        const waterRef = doc(db, 'users', auth.currentUser.uid, 'water', dateStr);
        const waterSnap = await getDoc(waterRef);
        if (waterSnap.exists()) {
          setWaterIntake(waterSnap.data().glasses || 0);
        } else {
          setWaterIntake(0);
        }

        const fastRef = doc(db, 'users', auth.currentUser.uid, 'fasting', 'current');
        const fastSnap = await getDoc(fastRef);
        if (fastSnap.exists()) {
          setFasting(fastSnap.data());
        }
      }
    };
    fetchData();
  }, [activeTab, selectedDay]);

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
        const fileExtension = currentFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const storageRef = ref(storage, `users/${auth.currentUser.uid}/meals/${fileName}`);

        await uploadBytes(storageRef, currentFile);
        const downloadURL = await getDownloadURL(storageRef);

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

  const filteredRecipes = useMemo(() => {
    return RECIPES_DB.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === 'All' || recipe.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const targets = userData?.targets || { targetCalories: 2000, targetProtein: 150, targetCarbs: 200, targetFats: 70 };

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

  const solution = useMemo(() => {
    return calculateRemainingMacros(targets, consumedMacros);
  }, [consumedMacros, targets]);

  const closeScanner = () => {
    setIsScanning(false);
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  const caloriesLeft = targets.targetCalories - consumedMacros.calories;
  const calPercent = Math.min((consumedMacros.calories / targets.targetCalories) * 100, 100) || 0;
  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference - (calPercent / 100) * circumference;
  const isOverGoal = consumedMacros.calories > targets.targetCalories;

  const protPercent = Math.min((consumedMacros.protein / targets.targetProtein) * 100, 100) || 0;
  const carbPercent = Math.min((consumedMacros.carbs / targets.targetCarbs) * 100, 100) || 0;
  const fatPercent = Math.min((consumedMacros.fat / targets.targetFats) * 100, 100) || 0;

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

  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || userData?.profile?.weight || 0;
  const startWeight = weightHistory[0]?.weight || currentWeight;
  const weightChange = currentWeight - startWeight;

  return (
    <div className="min-h-screen bg-snow font-sans text-ink flex flex-col md:flex-row overflow-x-hidden">
      <div className="hidden md:block w-64 h-screen fixed top-0 left-0 bg-snow border-r border-silver-mist z-40">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setIsScanning={setIsScanning} auth={auth} />
      </div>

      <main className={`flex-1 w-full md:ml-64 transition-opacity duration-300 ${isScanning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {activeTab === 'settings' ? (
          <Profile />
        ) : activeTab === 'analytics' ? (
          <AnalyticsTab
            weeklyTrendData={weeklyTrendData}
            targets={targets}
            macroStats={macroStats}
            topFoods={topFoods}
            currentWeight={currentWeight}
            weightChange={weightChange}
            weightHistory={weightHistory}
          />
        ) : activeTab === 'equilibrador' ? (
          <EquilibradorTab
            targets={targets}
            consumedMacros={consumedMacros}
            solution={solution}
            RECIPES_DB={RECIPES_DB}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filteredRecipes={filteredRecipes}
            setSelectedRecipe={setSelectedRecipe}
          />
        ) : (
          <HomeTab
            auth={auth}
            streak={streak}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            caloriesLeft={caloriesLeft}
            isOverGoal={isOverGoal}
            circumference={circumference}
            dashOffset={dashOffset}
            consumedMacros={consumedMacros}
            protPercent={protPercent}
            carbPercent={carbPercent}
            fatPercent={fatPercent}
            waterIntake={waterIntake}
            waterTarget={waterTarget}
            updateWater={updateWater}
            fasting={fasting}
            currentTime={currentTime}
            toggleFast={toggleFast}
            displayedMeals={displayedMeals}
            setSelectedLoggedMeal={setSelectedLoggedMeal}
          />
        )}

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} setIsScanning={setIsScanning} />
      </main>

      <ScannerOverlay
        isScanning={isScanning}
        closeScanner={closeScanner}
        selectedImage={selectedImage}
        isAnalyzing={isAnalyzing}
        analysisResult={analysisResult}
        handleImageUpload={handleImageUpload}
        confirmMeal={confirmMeal}
        loading={loading}
      />

      <RecipeDetailModal
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />

      <MealDetailModal
        selectedLoggedMeal={selectedLoggedMeal}
        setSelectedLoggedMeal={setSelectedLoggedMeal}
      />
    </div>
  );
}
