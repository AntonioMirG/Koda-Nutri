import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Flame, Activity, Beef, Droplet } from 'lucide-react';

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
  );
}
