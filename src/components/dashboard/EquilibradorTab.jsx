import React from 'react';
import { Trophy, Activity, Search, Clock, Beef, Droplet, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EquilibradorTab({ 
  targets, consumedMacros, solution, RECIPES_DB, 
  searchQuery, setSearchQuery, activeFilter, setActiveFilter, 
  filteredRecipes, setSelectedRecipe 
}) {
  return (
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
  );
}
