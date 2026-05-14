import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplet, Plus, Activity, Beef, Minus } from 'lucide-react';

const HomeTab = memo(({ 
  auth, streak, selectedDay, setSelectedDay, caloriesLeft, isOverGoal, 
  circumference, dashOffset, consumedMacros, protPercent, carbPercent, fatPercent, 
  waterIntake, waterTarget, updateWater, fasting, currentTime, toggleFast, 
  displayedMeals, setSelectedLoggedMeal 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const macros = [
    { label: 'Protein', value: consumedMacros.protein, percent: protPercent, color: '#FF6B6B', bg: 'bg-coral/10' },
    { label: 'Carbs', value: consumedMacros.carbs, percent: carbPercent, color: '#FF9F0A', bg: 'bg-amber/10' },
    { label: 'Fats', value: consumedMacros.fat, percent: fatPercent, color: '#0A84FF', bg: 'bg-azure/10' },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 md:pt-10 px-4 md:px-6 pb-32 max-w-5xl mx-auto"
    >
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-caption text-graphite font-medium mb-0.5">Welcome back</p>
            <h1 className="font-display font-bold text-heading-sm tracking-tight">
              {auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "User"}
            </h1>
          </div>
          {streak > 0 && (
            <div className="flex items-center bg-gradient-to-r from-amber/15 to-coral/15 px-3.5 py-1.5 rounded-xl border border-amber/20">
              <Flame className="w-4 h-4 text-amber mr-1.5" />
              <span className="text-caption font-bold text-amber">{streak} day streak</span>
            </div>
          )}
        </div>

        {/* Day tabs */}
        <div className="flex bg-fog rounded-xl p-1">
          {['today', 'yesterday'].map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-2 rounded-lg text-body-sm font-semibold transition-all duration-200 capitalize ${
                selectedDay === day
                  ? 'bg-snow text-ink shadow-soft'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </header>

      {/* Main calories card */}
      <motion.div variants={itemVariants} className="card-white shadow-card mb-4 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circle */}
          <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="calGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6C5CE7" />
                  <stop offset="100%" stopColor="#0A84FF" />
                </linearGradient>
              </defs>
              <circle cx="72" cy="72" r="62" stroke="#f2f2f7" strokeWidth="8" fill="transparent" />
              <motion.circle
                initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                animate={{ strokeDashoffset: circumference > 0 ? dashOffset * (62/70) : 2 * Math.PI * 62 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                cx="72" cy="72" r="62"
                stroke={isOverGoal ? "#FF6B6B" : "url(#calGradient)"}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 62}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[28px] font-extrabold text-ink leading-none">
                {caloriesLeft > 0 ? caloriesLeft : Math.abs(caloriesLeft)}
              </span>
              <span className="text-[10px] text-graphite font-bold uppercase mt-1 tracking-wide">
                {caloriesLeft > 0 ? 'kcal left' : 'kcal over'}
              </span>
            </div>
          </div>

          {/* Macros */}
          <div className="flex-1 w-full space-y-3">
            {macros.map((macro, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2`} style={{ background: macro.color }} />
                    <span className="text-caption font-semibold text-graphite">{macro.label}</span>
                  </div>
                  <span className="text-caption font-bold text-ink">{macro.value}g</span>
                </div>
                <div className="w-full h-2 bg-fog rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${macro.percent}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: macro.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Water & Fasting row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Water */}
        <motion.div variants={itemVariants} className="card-white shadow-soft p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-azure/10 flex items-center justify-center mr-3 relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-azure/20 transition-all duration-500"
                  style={{ height: `${Math.min((waterIntake / waterTarget) * 100, 100)}%` }}
                />
                <Droplet className={`w-5 h-5 z-10 ${waterIntake > 0 ? 'text-azure' : 'text-graphite/30'}`} />
              </div>
              <div>
                <h3 className="font-bold text-caption uppercase tracking-wider text-graphite mb-0.5">Water</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-body-sm font-bold">{((waterIntake * 250) / 1000).toFixed(1)}L</span>
                  <span className="text-[10px] text-graphite">/ {((waterTarget * 250) / 1000).toFixed(1)}L</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => updateWater(-1)}
                className="w-8 h-8 rounded-lg border border-silver-mist flex items-center justify-center text-graphite hover:bg-fog transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateWater(1)}
                className="w-8 h-8 rounded-lg bg-azure text-snow flex items-center justify-center shadow-sm hover:bg-azure/90 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {/* Mini progress */}
          <div className="mt-3 w-full h-1.5 bg-fog rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((waterIntake / waterTarget) * 100, 100)}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-azure"
            />
          </div>
        </motion.div>

        {/* Fasting */}
        <motion.div variants={itemVariants} className="card-white shadow-soft p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mr-3">
                <Activity className={`w-5 h-5 ${fasting.active ? 'text-brand animate-pulse' : 'text-graphite/30'}`} />
              </div>
              <div>
                <h3 className="font-bold text-caption uppercase tracking-wider text-graphite mb-0.5">Fasting</h3>
                <div className="text-body-sm font-bold">
                  {fasting.active ? (() => {
                    const diff = Math.floor((currentTime - new Date(fasting.startTime)) / 1000);
                    const h = Math.floor(diff / 3600);
                    const m = Math.floor((diff % 3600) / 60);
                    return `${h}h ${m}m`;
                  })() : 'Not active'}
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleFast(16)}
              className={`px-4 py-2 rounded-xl text-caption font-bold transition-all duration-200 ${
                fasting.active
                  ? 'bg-coral/10 text-coral hover:bg-coral/20'
                  : 'bg-brand text-snow shadow-sm hover:bg-brand-dark'
              }`}
            >
              {fasting.active ? 'Stop' : 'Start'}
            </button>
          </div>
          {/* Fasting progress */}
          {fasting.active && (
            <div className="mt-3 w-full h-1.5 bg-fog rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((() => {
                  const diff = Math.floor((currentTime - new Date(fasting.startTime)) / 1000);
                  const h = diff / 3600;
                  return (h / fasting.protocol) * 100;
                })(), 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Meals */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-body tracking-tight">Recent Meals</h3>
          <div className="bg-brand/10 text-brand px-3 py-1 rounded-lg text-caption font-bold">
            {displayedMeals.length} logged
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedMeals.length === 0 ? (
            <div className="col-span-full bg-fog rounded-2xl border-2 border-dashed border-silver-mist py-12 text-center">
              <p className="text-body-sm text-graphite font-medium">No meals logged for {selectedDay}.</p>
              <p className="text-caption text-graphite/60 mt-1">Tap + to scan your first meal</p>
            </div>
          ) : (
            displayedMeals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedLoggedMeal(meal)}
                className="card-white !p-0 overflow-hidden shadow-soft group cursor-pointer hover:shadow-card transition-all duration-300"
              >
                <div className="h-36 w-full overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3.5 relative">
                  {meal.trafficColor && (
                    <div className={`absolute top-3.5 right-3.5 w-3 h-3 rounded-full shadow-sm ${
                      meal.trafficColor === 'green' ? 'bg-emerald-500' :
                      meal.trafficColor === 'yellow' ? 'bg-amber-400' : 'bg-rose-500'
                    }`} />
                  )}
                  <h4 className="font-bold text-body-sm mb-1.5 truncate">{meal.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-caption font-bold text-brand bg-brand/10 px-2.5 py-0.5 rounded-lg">{meal.calories} kcal</span>
                    <span className="text-[10px] text-graphite font-medium">{meal.time}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

export default HomeTab;
