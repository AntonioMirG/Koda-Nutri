import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Activity, Search } from 'lucide-react';

export default function MealDetailModal({ selectedLoggedMeal, setSelectedLoggedMeal }) {
  return (
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
  );
}
