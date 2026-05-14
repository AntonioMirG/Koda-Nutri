import { Trophy, Activity, Search, Clock, Beef, Droplet, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function EquilibradorTab({
  targets, consumedMacros, solution, refreshRecommendation, RECIPES_DB,
  searchQuery, setSearchQuery, activeFilter, setActiveFilter,
  filteredRecipes, setSelectedRecipe
}) {
  const { t, language } = useLanguage();
  return (
    <div className="pt-8 md:pt-10 px-4 md:px-6 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-azure flex items-center justify-center mx-auto mb-4 shadow-glow-brand">
          <Trophy className="w-7 h-7 text-snow" />
        </div>
        <h1 className="font-display font-bold text-heading tracking-tight mb-2">{t('equilibrador') || 'Macro Equilibrador'}</h1>
        <p className="text-body-sm text-graphite max-w-sm mx-auto">{t('equilibradorDesc')}</p>
      </header>

      <div className="space-y-4">
        {/* Remaining macros */}
        <div className="card-white shadow-card p-5">
          <h3 className="text-caption font-bold text-graphite uppercase tracking-wider mb-5 text-center">{t('remainingToHit')}</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t('protein'), value: Math.max(0, targets.targetProtein - consumedMacros.protein), color: '#FF6B6B', bg: 'bg-coral/10' },
              { label: t('carbs'), value: Math.max(0, targets.targetCarbs - consumedMacros.carbs), color: '#FF9F0A', bg: 'bg-amber/10' },
              { label: t('fats'), value: Math.max(0, targets.targetFats - consumedMacros.fat), color: '#0A84FF', bg: 'bg-azure/10' },
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

          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-azure flex items-center justify-center mr-3">
                <Sparkles className="w-4 h-4 text-snow" />
              </div>
              <h3 className="font-display font-bold text-body">{t('recommendedMeal')}</h3>
            </div>
            {solution && typeof solution !== 'string' && (
              <button
                onClick={refreshRecommendation}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
                title={t('shuffle') || 'Shuffle'}
              >
                <Activity className="w-4 h-4 text-snow" />
              </button>
            )}
          </div>

          {typeof solution === 'string' || !solution ? (
            <p className="text-snow/50 italic text-body-sm relative z-10">{solution || t('allTargetsMet') || "You've hit your targets!"}</p>
          ) : solution.type === 'recipe' ? (
            <div className="relative z-10 group cursor-pointer" onClick={() => setSelectedRecipe(solution.data)}>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-soft flex-shrink-0">
                  <img src={solution.data.image} alt={solution.data.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider mb-1 block">{solution.data.category}</span>
                  <h4 className="font-bold text-snow text-body-sm mb-1 truncate">{solution.data.name[language]}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-white/10 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      <Clock className="w-3 h-3 mr-1" /> {solution.data.time}
                    </div>
                    <div className="text-[10px] text-snow/40 font-medium">
                      {solution.data.macros.p}P · {solution.data.macros.c}C · {solution.data.macros.f}F
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-snow/20 group-hover:text-snow/50 transition-colors" />
              </div>
              <p className="text-[10px] text-snow/30 italic mt-4">{t('cookedWeights')}</p>
            </div>
          ) : (
            <div className="space-y-3 relative z-10">
              {solution.data.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/8 pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-body-sm max-w-[60%] text-snow/90">{item.name}</span>
                  <div className="flex items-baseline">
                    <span className="text-[20px] md:text-[24px] font-bold mr-1">{item.amount}</span>
                    <span className="text-[12px] text-snow/40 font-medium">{item.unit}</span>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-snow/30 italic pt-2">{t('cookedWeights')}</p>
            </div>
          )}
        </div>

        {/* Zero Token Info */}
        <div className="flex items-center p-3.5 bg-brand/5 rounded-xl border border-brand/10">
          <div className="w-7 h-7 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
            <Activity className="w-3.5 h-3.5 text-brand" />
          </div>
          <p className="text-[11px] text-graphite leading-snug">
            {t('zeroTokenLogic')}
          </p>
        </div>

        {/* Recipe Explorer */}
        <div className="pt-6 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-body tracking-tight">{t('recipeBook')}</h2>
            <span className="text-caption bg-brand/10 text-brand px-2.5 py-1 rounded-lg font-bold">{RECIPES_DB.length} {t('recipes')}</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-graphite/40" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-snow border-2 border-silver-mist/60 rounded-xl py-3 pl-10 pr-4 text-body-sm focus:border-brand outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { id: 'All', label: t('filterAll') },
              { id: 'High Protein', label: t('filterHighProtein') },
              { id: 'Balanced', label: t('filterBalanced') },
              { id: 'Low Carb', label: t('filterLowCarb') },
              { id: 'Vegan', label: t('filterVegan') },
              { id: 'Quick Snack', label: t('filterQuickSnack') }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-caption font-bold transition-all duration-200 ${activeFilter === filter.id
                  ? 'bg-brand text-snow shadow-sm'
                  : 'bg-fog text-graphite hover:bg-silver-mist'
                  }`}
              >
                {filter.label}
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
                    alt={recipe.name[language]}
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
                  <h4 className="font-bold text-body-sm mb-1 group-hover:text-brand transition-colors">{recipe.name[language]}</h4>
                  <p className="text-[11px] text-graphite line-clamp-2 leading-relaxed mb-3">{recipe.description[language]}</p>

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
