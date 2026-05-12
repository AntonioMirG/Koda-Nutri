import React from 'react';
import { Trophy, Activity, Search, Clock, Beef, Droplet, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EquilibradorTab({ 
  targets, consumedMacros, solution, RECIPES_DB, 
  searchQuery, setSearchQuery, activeFilter, setActiveFilter, 
  filteredRecipes, setSelectedRecipe 
}) {
  return (
    <div className="pt-8 md:pt-10 px-4 md:px-6 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-azure flex items-center justify-center mx-auto mb-4 shadow-glow-brand">
          <Trophy className="w-7 h-7 text-snow" />
        </div>
        <h1 className="font-display font-bold text-heading tracking-tight mb-2">Macro Equilibrador</h1>
        <p className="text-body-sm text-graphite max-w-sm mx-auto">Based on what you've eaten today, here is the ideal combination.</p>
      </header>

      <div className="space-y-4">
        {/* Remaining macros */}
        <div className="card-white shadow-card p-5">
          <h3 className="text-caption font-bold text-graphite uppercase tracking-wider mb-5 text-center">Remaining to hit target</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Protein', value: Math.max(0, targets.targetProtein - consumedMacros.protein), color: '#FF6B6B', bg: 'bg-coral/10' },
              { label: 'Carbs', value: Math.max(0, targets.targetCarbs - consumedMacros.carbs), color: '#FF9F0A', bg: 'bg-amber/10' },
              { label: 'Fats', value: Math.max(0, targets.targetFats - consumedMacros.fat), color: '#0A84FF', bg: 'bg-azure/10' },
            ].map((m, i) => (
              <div key={i} className={`${m.bg} rounded-xl p-3 text-center`}>
                <div className="text-[20px] md:text-heading-sm font-bold" style={{ color: m.color }}>{m.value}g</div>
                <div className="text-[10px] text-graphite font-bold uppercase mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommended Meal */}
        <div className="rounded-2xl p-5 md:p-7 relative overflow-hidden bg-gradient-to-br from-surface via-surface-2 to-surface text-snow">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-azure/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex items-center mb-5 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-azure flex items-center justify-center mr-3">
              <Sparkles className="w-4 h-4 text-snow" />
            </div>
            <h3 className="font-display font-bold text-body">Koda Recommended Meal</h3>
          </div>

          {typeof solution === 'string' ? (
            <p className="text-snow/50 italic text-body-sm relative z-10">{solution}</p>
          ) : (
            <div className="space-y-3 relative z-10">
              {solution.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/8 pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-body-sm max-w-[60%] text-snow/90">{item.name}</span>
                  <div className="flex items-baseline">
                    <span className="text-[20px] md:text-[24px] font-bold mr-1">{item.amount}</span>
                    <span className="text-[12px] text-snow/40 font-medium">{item.unit}</span>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-snow/30 italic pt-2">*Weights are for cooked food.</p>
            </div>
          )}
        </div>

        {/* Zero Token Info */}
        <div className="flex items-center p-3.5 bg-brand/5 rounded-xl border border-brand/10">
          <div className="w-7 h-7 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
            <Activity className="w-3.5 h-3.5 text-brand" />
          </div>
          <p className="text-[11px] text-graphite leading-snug">
            Uses <b className="text-ink">Zero-Token Logic</b> — local mathematical heuristics, no AI tokens consumed.
          </p>
        </div>

        {/* Recipe Explorer */}
        <div className="pt-6 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-body tracking-tight">Recipe Book</h2>
            <span className="text-caption bg-brand/10 text-brand px-2.5 py-1 rounded-lg font-bold">{RECIPES_DB.length} recipes</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-graphite/40" />
            <input
              type="text"
              placeholder="Search by ingredient or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-snow border-2 border-silver-mist/60 rounded-xl py-3 pl-10 pr-4 text-body-sm focus:border-brand outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {['All', 'High Protein', 'Balanced', 'Low Carb', 'Vegan', 'Quick Snack'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-caption font-bold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-brand text-snow shadow-sm'
                    : 'bg-fog text-graphite hover:bg-silver-mist'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredRecipes.map(recipe => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="card-white !p-0 overflow-hidden shadow-soft group cursor-pointer hover:shadow-card transition-all duration-300"
              >
                <div className="h-36 w-full overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[10px] font-bold text-brand uppercase tracking-wider">{recipe.category}</span>
                    <div className="flex items-center text-[10px] text-graphite">
                      <Clock className="w-3 h-3 mr-1" /> {recipe.time}
                    </div>
                  </div>
                  <h4 className="font-bold text-body-sm mb-1 group-hover:text-brand transition-colors">{recipe.name}</h4>
                  <p className="text-[11px] text-graphite line-clamp-2 leading-relaxed mb-3">{recipe.description}</p>

                  <div className="flex items-center space-x-1.5">
                    <div className="flex items-center bg-coral/10 text-coral px-2 py-0.5 rounded-lg">
                      <Beef className="w-3 h-3 mr-1" />
                      <span className="text-[10px] font-bold">{recipe.macros.p}g</span>
                    </div>
                    <div className="flex items-center bg-amber/10 text-amber px-2 py-0.5 rounded-lg">
                      <Activity className="w-3 h-3 mr-1" />
                      <span className="text-[10px] font-bold">{recipe.macros.c}g</span>
                    </div>
                    <div className="flex items-center bg-azure/10 text-azure px-2 py-0.5 rounded-lg">
                      <Droplet className="w-3 h-3 mr-1" />
                      <span className="text-[10px] font-bold">{recipe.macros.f}g</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
