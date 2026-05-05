import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Utensils, History, Sparkles, X, ChevronRight, Activity, Droplet, Beef, ArrowRight, ArrowDown } from 'lucide-react';

// A helper for drawing simple expressive blob faces
const BlobCharacter = ({ color, face, className }) => (
  <motion.div 
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={`rounded-[72px] flex items-center justify-center relative overflow-hidden ${className}`}
    style={{ backgroundColor: color }}
  >
    <div className="text-2xl font-bold text-black/80">{face}</div>
  </motion.div>
);

function App() {
  const [activeView, setActiveView] = useState('analyze'); // 'analyze' or 'history'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        name: "Grilled Salmon Bowl",
        calories: 540,
        protein: 42,
        carbs: 45,
        fat: 22,
        review: "Excellent choice! High in omega-3 fatty acids and lean protein. Good balance of complex carbs.",
        healthScore: 92,
      });
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-canvas text-graphite font-sans pb-32">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-transparent shadow-subtle-outline h-16 flex items-center justify-between px-6 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ember rounded-lg flex items-center justify-center text-white font-bold font-display">N</div>
          <span className="font-display font-medium text-heading-sm text-charcoal">NutriAI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-charcoal">
          <button onClick={() => setActiveView('analyze')} className={`hover:text-ember transition-colors ${activeView === 'analyze' ? 'text-ember' : ''}`}>Analyze</button>
          <button onClick={() => setActiveView('history')} className={`hover:text-ember transition-colors ${activeView === 'history' ? 'text-ember' : ''}`}>History</button>
          <a href="#" className="hover:text-ember transition-colors flex items-center">Resources <ArrowDown className="w-4 h-4 ml-1" /></a>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-pill-light hidden sm:block">Log In</button>
          <button className="btn-pill-dark">Get Started</button>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 mt-20">
        <AnimatePresence mode="wait">
          {activeView === 'analyze' && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-24"
            >
              {/* Hero Section */}
              <section className="relative text-center max-w-2xl mx-auto mt-12 mb-32">
                {/* Decorative Blobs */}
                <BlobCharacter color="#ffbb26" face="^‿^" className="absolute -top-12 -left-16 w-24 h-24 hidden md:flex rotate-12" />
                <BlobCharacter color="#00ca48" face="ಠ_ಠ" className="absolute top-20 -right-20 w-20 h-20 hidden md:flex -rotate-12" />
                <BlobCharacter color="#ff58ae" face=">_>" className="absolute -bottom-10 -left-10 w-16 h-16 hidden md:flex rotate-6" />
                <BlobCharacter color="#0090ff" face="O.O" className="absolute -bottom-24 right-10 w-28 h-28 hidden md:flex -rotate-6" />

                <h1 className="font-display text-display font-medium text-charcoal mb-6 relative z-10">
                  Know exactly what's on your plate.
                </h1>
                <p className="text-body text-graphite max-w-lg mx-auto mb-10 relative z-10">
                  Snap a photo of your meal and let our playful AI instantly break down the calories, macros, and nutritional value. Eating healthy has never been this fun.
                </p>
                <div className="flex items-center justify-center space-x-4 relative z-10">
                  <button className="btn-pill-dark" onClick={() => document.getElementById('file-upload').click()}>
                    Analyze Meal
                  </button>
                  <button className="btn-pill-light flex items-center">
                    Watch Demo
                  </button>
                </div>
              </section>

              {/* Main Analysis Tool */}
              <section className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                {/* Upload Card */}
                <div className="feature-card-white relative z-10 hover:shadow-sm-soft transition-shadow duration-300">
                  <h2 className="font-sans text-heading font-semibold text-charcoal mb-2">Upload Meal</h2>
                  <p className="text-body text-ash mb-8">Take a photo or choose from your gallery.</p>

                  {!selectedImage ? (
                    <div className="bg-parchment border-2 border-dashed border-[#dcd9d4] rounded-card-lg p-12 text-center relative hover:border-ember/50 transition-colors group cursor-pointer">
                      <input 
                        id="file-upload"
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <div className="w-16 h-16 bg-white shadow-sm-soft rounded-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-8 h-8 text-ember" />
                      </div>
                      <span className="text-body font-medium text-charcoal block mb-1">Click to browse</span>
                      <span className="text-caption text-ash">JPG, PNG up to 10MB</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-card-lg overflow-hidden h-64 border border-[#e5e2db]">
                        <img src={selectedImage} alt="Meal" className="w-full h-full object-cover" />
                        <button 
                          onClick={resetAnalysis}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-icon flex items-center justify-center text-charcoal hover:bg-white transition shadow-sm-soft"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="btn-ghost flex items-center w-full justify-center" onClick={resetAnalysis}>
                        Upload a different photo
                      </button>
                    </div>
                  )}
                </div>

                {/* Results Panel */}
                <div className="relative">
                  {/* Phone Mockup Frame for Results */}
                  <div className="phone-mockup relative overflow-hidden h-[500px] w-full max-w-[340px] mx-auto md:mx-0">
                    <div className="bg-canvas w-full h-full rounded-[20px] p-5 overflow-y-auto">
                      {/* Status Header */}
                      <div className="flex justify-between items-center mb-6 pt-2">
                        <span className="text-caption font-semibold text-charcoal">NutriAI Review</span>
                        {isAnalyzing && <span className="text-caption text-sky animate-pulse flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Analyzing</span>}
                      </div>

                      {/* Content */}
                      {!selectedImage && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 pb-20">
                          <BlobCharacter color="#c6c6c6" face="-_-" className="w-16 h-16 mb-4" />
                          <p className="text-caption text-graphite">Awaiting a delicious meal photo to analyze...</p>
                        </div>
                      )}

                      {isAnalyzing && (
                        <div className="h-full flex flex-col items-center justify-center pb-20">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <BlobCharacter color="#0090ff" face="o_o" className="w-20 h-20 mb-6" />
                          </motion.div>
                          <div className="text-body font-medium text-charcoal">Processing image...</div>
                          <div className="text-caption text-ash mt-2">Identifying ingredients</div>
                        </div>
                      )}

                      <AnimatePresence>
                        {analysisResult && !isAnalyzing && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4 pb-6"
                          >
                            <h3 className="font-display font-medium text-heading text-charcoal leading-tight">
                              {analysisResult.name}
                            </h3>
                            
                            <div className="bg-white rounded-card p-4 shadow-subtle-outline">
                              <div className="flex justify-between items-baseline mb-4">
                                <span className="text-caption text-ash">Estimated Energy</span>
                                <div className="text-right">
                                  <span className="text-heading-sm font-bold text-charcoal">{analysisResult.calories}</span>
                                  <span className="text-caption text-ash ml-1">kcal</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-parchment rounded-tag p-2 text-center">
                                  <div className="text-caption font-bold text-charcoal">{analysisResult.protein}g</div>
                                  <div className="text-[10px] text-ash uppercase tracking-wider mt-1">Protein</div>
                                </div>
                                <div className="bg-parchment rounded-tag p-2 text-center">
                                  <div className="text-caption font-bold text-charcoal">{analysisResult.fat}g</div>
                                  <div className="text-[10px] text-ash uppercase tracking-wider mt-1">Fat</div>
                                </div>
                                <div className="bg-parchment rounded-tag p-2 text-center">
                                  <div className="text-caption font-bold text-charcoal">{analysisResult.carbs}g</div>
                                  <div className="text-[10px] text-ash uppercase tracking-wider mt-1">Carbs</div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-parchment rounded-card p-4">
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-meadow flex items-center justify-center mr-2 text-white">
                                  <Activity className="w-3 h-3" />
                                </div>
                                <span className="text-caption font-semibold text-charcoal">Health Score: {analysisResult.healthScore}</span>
                              </div>
                              <p className="text-caption text-graphite leading-relaxed">
                                {analysisResult.review}
                              </p>
                            </div>

                            <button className="btn-pill-dark w-full mt-4 flex justify-center items-center">
                              Save to History <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3-Column Features */}
              <section className="grid md:grid-cols-3 gap-6 pt-20">
                <div className="feature-card-white">
                  <div className="w-12 h-12 rounded-icon bg-[#fff5f2] text-ember flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-semibold text-heading-sm text-charcoal mb-3">GPT-4o Vision</h3>
                  <p className="text-body text-graphite">Our playful AI doesn't just guess; it accurately identifies ingredients, portions, and macros from a single photo.</p>
                </div>
                <div className="feature-card-white">
                  <div className="w-12 h-12 rounded-icon bg-[#f0f8ff] text-ocean flex items-center justify-center mb-6">
                    <History className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-semibold text-heading-sm text-charcoal mb-3">Track Progress</h3>
                  <p className="text-body text-graphite">Every meal is saved to your personal history. Look back and see how your eating habits evolve over time.</p>
                </div>
                <div className="feature-card-white">
                  <div className="w-12 h-12 rounded-icon bg-[#e6faee] text-meadow flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-semibold text-heading-sm text-charcoal mb-3">Health Insights</h3>
                  <p className="text-body text-graphite">Get actionable reviews and a health score for every meal to help you make better nutritional choices.</p>
                </div>
              </section>
            </motion.div>
          )}

          {activeView === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12 mt-12"
            >
              <div className="max-w-3xl mx-auto">
                <h1 className="font-display text-heading-lg font-medium text-charcoal mb-4">Your Culinary Journey</h1>
                <p className="text-body text-graphite mb-10">A look back at your recent meals and their nutritional impact.</p>
                
                <div className="space-y-4">
                  {[
                    { name: "Avocado Toast", cals: 320, time: "Today, 9:00 AM", score: 85, img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=200&q=80" },
                    { name: "Chicken Salad", cals: 450, time: "Yesterday, 1:30 PM", score: 90, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80" },
                    { name: "Cheeseburger", cals: 850, time: "Monday, 8:00 PM", score: 40, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80" },
                  ].map((item, idx) => (
                    <div key={idx} className="feature-card-white !p-4 flex items-center space-x-6 hover:shadow-sm-soft transition-shadow cursor-pointer">
                      <img src={item.img} alt={item.name} className="w-20 h-20 rounded-card object-cover" />
                      <div className="flex-1">
                        <h3 className="font-sans font-semibold text-heading-sm text-charcoal">{item.name}</h3>
                        <p className="text-caption text-ash mt-1">{item.time}</p>
                      </div>
                      <div className="hidden sm:flex space-x-6 items-center">
                         <div className="text-right">
                          <span className="text-caption text-ash block">Score</span>
                          <span className={`font-semibold ${item.score >= 80 ? 'text-meadow' : item.score >= 60 ? 'text-sunburst' : 'text-ember'}`}>{item.score}/100</span>
                        </div>
                        <div className="text-right w-20">
                          <span className="text-heading-sm font-bold text-charcoal">{item.cals}</span>
                          <span className="text-caption text-ash ml-1">kcal</span>
                        </div>
                        <button className="btn-ghost !py-2"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-[1200px] mx-auto px-6 mt-32 border-t border-stone-surface pt-12 pb-12">
        <div className="flex justify-between items-center text-caption text-ash">
          <span>© 2026 NutriAI. Designed in the style of Family.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-charcoal transition-colors">Twitter</a>
            <a href="#" className="hover:text-charcoal transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
