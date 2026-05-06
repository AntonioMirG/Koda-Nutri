import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplet, Plus, Activity, Beef } from 'lucide-react';

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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-12 px-4 md:px-6 pb-32 max-w-7xl mx-auto"
    >
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
        <motion.div variants={itemVariants} className="card-white p-8 flex flex-col items-center justify-center border border-silver-mist/50 shadow-sm-soft">
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
              <span className="text-heading-md font-bold text-ink leading-none">{caloriesLeft > 0 ? caloriesLeft : Math.abs(caloriesLeft)}</span>
              <span className="text-[10px] text-graphite font-bold uppercase mt-1">{caloriesLeft > 0 ? 'kcal left' : 'kcal over'}</span>
            </div>
          </div>
        </motion.div>

        {/* Macros Rings */}
        <motion.div variants={itemVariants} className="card-white p-8 flex flex-col justify-center border border-silver-mist/50 shadow-sm-soft">
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
        </motion.div>

        {/* Water & Fasting Column */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
          {/* Water Widget */}
          <div className="card-white p-5 flex items-center justify-between border border-silver-mist/50 shadow-sm-soft">
            <div className="flex items-center">
              <motion.div key={waterIntake} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-10 h-10 bg-fog rounded-xl flex items-center justify-center mr-3 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-[#0071e3]/20" style={{ height: `${Math.min((waterIntake / waterTarget) * 100, 100)}%` }} />
                <Droplet className={`w-5 h-5 z-10 ${waterIntake > 0 ? 'text-[#0071e3]' : 'text-graphite/40'}`} />
              </motion.div>
              <div>
                <h3 className="font-bold text-[11px] uppercase tracking-wider text-graphite mb-1">Water</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-body-sm font-bold">{((waterIntake * 250) / 1000).toFixed(2)}L</span>
                  <span className="text-[10px] text-graphite opacity-60">/ {((waterTarget * 250) / 1000).toFixed(1)}L</span>
                </div>
                <div className="text-[9px] text-azure font-bold mt-1">
                  {Math.round((waterIntake / waterTarget) * 100)}% reach
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => updateWater(-1)} className="w-8 h-8 rounded-full border border-silver-mist flex items-center justify-center text-graphite hover:bg-fog transition-colors">-</button>
              <button onClick={() => updateWater(1)} className="w-8 h-8 rounded-full bg-ink text-snow flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"><Plus className="w-4 h-4" /></button>
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
        </motion.div>
      </div>

      {/* Recent Meals Section */}
      <motion.div variants={itemVariants}>
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
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
      </motion.div>
    </motion.div>
  );
});

export default HomeTab;
