import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Activity, Beef, Droplet, ImageIcon, Camera } from 'lucide-react';

export default function ScannerOverlay({ 
  isScanning, closeScanner, selectedImage, isAnalyzing, analysisResult, handleImageUpload, confirmMeal, loading 
}) {
  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] text-snow flex flex-col"
        >
          {/* Header */}
          <div className="pt-12 px-5 pb-4 flex justify-between items-center absolute top-0 left-0 right-0 z-20">
            <button onClick={closeScanner} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <span className="font-bold text-body">Scanner</span>
            <div className="w-10 h-10" />
          </div>

          {/* Camera View Area */}
          <div className="flex-1 relative bg-obsidian">
            {selectedImage ? (
              <img src={selectedImage} alt="Scanned" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Scan frame */}
                <div className="w-56 h-56 md:w-64 md:h-64 border-2 border-white/20 rounded-3xl relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-brand rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-brand rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-azure rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-azure rounded-br-3xl"></div>
                  
                  {/* Scan line animation */}
                  <motion.div
                    animate={{ y: [0, 200, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent opacity-60"
                  />
                </div>
                <p className="mt-6 text-body-sm text-white/50 font-medium">Point camera at your food</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-azure flex items-center justify-center animate-pulse mb-4">
                  <Activity className="w-7 h-7 text-snow" />
                </div>
                <span className="text-body font-bold">Analyzing meal...</span>
                <span className="text-caption text-white/40 mt-1">GPT-4o Vision at work</span>
              </div>
            )}
          </div>

          {/* Upload controls */}
          {!analysisResult && (
            <div className="pb-10 pt-6 px-5 absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-md rounded-full px-5 py-1.5 text-caption font-semibold text-white/60">
                  Scan or upload food
                </div>
              </div>
              <div className="flex justify-center items-center space-x-10">
                {/* Gallery */}
                <div className="relative cursor-pointer flex flex-col items-center">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-1.5 hover:bg-white/20 transition-colors">
                    <ImageIcon className="w-5 h-5 text-snow" />
                  </div>
                  <span className="text-[10px] font-semibold text-white/60">Gallery</span>
                </div>

                {/* Camera shutter */}
                <div className="relative cursor-pointer flex flex-col items-center">
                  <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-[72px] h-[72px] rounded-full border-4 border-white/80 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                    <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-brand to-azure" />
                  </div>
                </div>

                <div className="w-12" />
              </div>
            </div>
          )}

          {/* Analysis Result Panel */}
          <AnimatePresence>
            {analysisResult && !isAnalyzing && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 bg-snow text-ink rounded-t-3xl p-5 z-30 shadow-elevated max-h-[75vh] overflow-y-auto"
              >
                <div className="w-10 h-1 bg-silver-mist rounded-full mx-auto mb-5" />
                
                <div className="mb-5">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider mb-1 block">Nutrition Analysis</span>
                  <h2 className="font-display font-bold text-heading-sm mt-1 leading-tight">{analysisResult.name}</h2>
                  <p className="text-caption text-graphite mt-1 leading-relaxed">{analysisResult.review}</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {[
                    { label: 'Calories', value: analysisResult.calories, unit: 'kcal', icon: <Flame className="w-4 h-4" />, bg: 'bg-fog', color: 'text-ink' },
                    { label: 'Carbs', value: `${analysisResult.carbs}g`, icon: <Activity className="w-4 h-4" />, bg: 'bg-amber/10', color: 'text-amber' },
                    { label: 'Protein', value: `${analysisResult.protein}g`, icon: <Beef className="w-4 h-4" />, bg: 'bg-coral/10', color: 'text-coral' },
                    { label: 'Fats', value: `${analysisResult.fat}g`, icon: <Droplet className="w-4 h-4" />, bg: 'bg-azure/10', color: 'text-azure' },
                  ].map((m, i) => (
                    <div key={i} className={`flex items-center p-3 rounded-xl ${m.bg}`}>
                      <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mr-2.5 ${m.color}`}>
                        {m.icon}
                      </div>
                      <div>
                        <div className="text-[10px] text-graphite font-bold">{m.label}</div>
                        <div className="font-bold text-body-sm">{m.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Health Score */}
                <div className="flex items-center justify-between p-3.5 bg-mint/10 rounded-xl mb-6">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-mint mr-2.5" />
                    <span className="font-semibold text-body-sm">Health Score</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-body-sm mr-3">{analysisResult.healthScore}/10</span>
                    <div className="w-24 h-2 bg-mint/20 rounded-full overflow-hidden">
                      <div className="h-full bg-mint rounded-full" style={{ width: `${(analysisResult.healthScore / 10) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3 pb-4">
                  <button
                    onClick={closeScanner}
                    className="bg-fog text-ink flex-1 py-3.5 font-bold rounded-xl text-body-sm transition-colors hover:bg-silver-mist"
                  >
                    Discard
                  </button>
                  <button
                    onClick={confirmMeal}
                    disabled={loading}
                    className="bg-gradient-to-r from-brand to-azure text-snow flex-1 py-3.5 font-bold rounded-xl text-body-sm shadow-glow-brand hover:shadow-glow-blue transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
