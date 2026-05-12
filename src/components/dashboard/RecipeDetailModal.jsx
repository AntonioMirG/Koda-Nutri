import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Plus, Activity } from 'lucide-react';

export default function RecipeDetailModal({ selectedRecipe, setSelectedRecipe }) {
  if (!selectedRecipe) return null;
  return (
    <AnimatePresence>
      {selectedRecipe && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-snow z-[60] overflow-y-auto"
        >
          <div className="relative h-72 md:h-96 w-full">
            <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-snow via-snow/20 to-transparent" />
            <button onClick={() => setSelectedRecipe(null)} className="absolute top-12 left-5 w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-soft text-ink z-20">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-5 md:px-8 pb-24 -mt-16 relative z-10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-3">
              <div>
                <span className="text-caption font-bold text-brand uppercase tracking-wider mb-1.5 block">{selectedRecipe.category}</span>
                <h1 className="font-display font-bold text-heading-sm md:text-heading leading-tight">{selectedRecipe.name}</h1>
              </div>
              <div className="bg-gradient-to-r from-brand to-azure text-snow px-5 py-2.5 rounded-xl flex items-center shadow-sm">
                <Clock className="w-4 h-4 mr-2" /><span className="text-body-sm font-bold">{selectedRecipe.time}</span>
              </div>
            </div>
            <p className="text-body text-graphite mb-8 leading-relaxed max-w-2xl">{selectedRecipe.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-10">
              {[
                { label: 'Calories', value: selectedRecipe.macros.calories, unit: 'kcal', bg: 'bg-fog', color: 'text-ink' },
                { label: 'Protein', value: selectedRecipe.macros.p, unit: 'g', bg: 'bg-coral/10', color: 'text-coral' },
                { label: 'Carbs', value: selectedRecipe.macros.c, unit: 'g', bg: 'bg-amber/10', color: 'text-amber' },
                { label: 'Fats', value: selectedRecipe.macros.f, unit: 'g', bg: 'bg-azure/10', color: 'text-azure' },
              ].map((m, i) => (
                <div key={i} className={`${m.bg} p-4 rounded-2xl`}>
                  <div className={`text-heading-sm font-bold ${m.color}`}>{m.value}<span className="text-caption font-medium text-graphite ml-0.5">{m.unit}</span></div>
                  <div className="text-[10px] font-bold text-graphite uppercase tracking-wider mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand to-azure text-snow rounded-xl flex items-center justify-center mr-3"><Plus className="w-4 h-4" /></div>
                  <h3 className="font-display font-bold text-body">Ingredients</h3>
                </div>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center p-3 bg-fog border border-silver-mist/40 rounded-xl text-body-sm text-graphite">
                      <div className="w-2 h-2 bg-brand rounded-full mr-3 flex-shrink-0" />{ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand to-azure text-snow rounded-xl flex items-center justify-center mr-3"><Activity className="w-4 h-4" /></div>
                  <h3 className="font-display font-bold text-body">Preparation</h3>
                </div>
                <div className="bg-fog p-6 rounded-2xl border border-silver-mist/40 leading-relaxed text-body text-ink">
                  <div className="whitespace-pre-line">{selectedRecipe.instructions}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
