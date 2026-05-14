import React, { memo } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
  PieChart, Pie,
  LineChart, Line
} from 'recharts';
import { TrendingDown, TrendingUp, Scale } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLanguage } from '../../context/LanguageContext';

const AnalyticsTab = memo(({ weeklyTrendData, targets, macroStats, topFoods, currentWeight, weightChange, weightHistory, allMeals }) => {
  const { t, language } = useLanguage();
  const exportPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text(`Koda - ${t('weeklyReport')}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`${t('generatedOn')}: ${new Date().toLocaleDateString()}`, 14, 30);

    // Add Summary Table
    const tableColumn = ["Date", "Time", "Meal", "Calories", "Protein", "Carbs", "Fat"];
    const tableRows = allMeals.map(m => [
      m.timestamp.split('T')[0],
      m.time,
      m.name,
      `${m.calories} kcal`,
      `${m.protein}g`,
      `${m.carbs}g`,
      `${m.fat}g`
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: '#6C5CE7', textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 250] }
    });

    doc.save("Koda_report.pdf");
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 md:pt-10 px-4 md:px-6 pb-32 max-w-5xl mx-auto"
    >
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-heading tracking-tight mb-1">{t('analytics')}</h1>
          <p className="text-body-sm text-graphite">{t('monthlyInsights')}</p>
        </div>
        <button
          onClick={exportPDF}
          className="bg-brand/10 text-brand px-4 py-2 rounded-xl text-caption font-bold hover:bg-brand/20 transition-colors"
        >
          {t('exportPDF')}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly Caloric Balance */}
        <motion.div variants={itemVariants} className="card-white shadow-card p-5 md:col-span-2">
          <h3 className="text-caption font-bold text-graphite uppercase tracking-wider mb-4">{t('weeklyCalorieBalance')}</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrendData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#8e8e93' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(108,92,231,0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 600 }}
                  animationDuration={200}
                />
                <ReferenceLine y={targets.targetCalories} stroke="#8e8e93" strokeDasharray="4 4" strokeWidth={1} />
                <Bar
                  dataKey="calories"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {weeklyTrendData.map((entry, index) => {
                    const isOver = entry.calories > entry.target;
                    const isWayUnder = entry.calories < entry.target * 0.7;
                    let color = '#30D158';
                    if (isOver) color = '#FF6B6B';
                    if (isWayUnder && entry.calories > 0) color = '#FF9F0A';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center space-x-5 text-[10px] text-graphite font-semibold">
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-coral mr-1.5"></div>{t('over')}</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-mint mr-1.5"></div>{t('onTarget')}</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber mr-1.5"></div>{t('under')}</span>
          </div>
        </motion.div>

        {/* Macro Composition */}
        <motion.div variants={itemVariants} className="card-white shadow-card p-5">
          <h3 className="text-caption font-bold text-graphite uppercase tracking-wider mb-5">{t('macroSplit')}</h3>
          <div className="flex flex-col items-center">
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroStats}
                    innerRadius={45}
                    outerRadius={62}
                    paddingAngle={4}
                    dataKey="value"
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {macroStats.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full mt-4 space-y-2.5">
              {macroStats.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-[3px] mr-2.5" style={{ backgroundColor: m.color }}></div>
                    <span className="text-body-sm font-semibold">{m.name === 'Protein' ? t('protein') : m.name === 'Carbs' ? t('carbs') : t('fats')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-caption text-graphite">{Math.round(m.value)}g</span>
                    <span className="text-caption font-bold bg-fog px-2 py-0.5 rounded-md">{m.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top 5 Foods */}
        <motion.div variants={itemVariants} className="card-white shadow-card p-5">
          <h3 className="text-caption font-bold text-graphite uppercase tracking-wider mb-4">{t('mostTracked')}</h3>
          <div className="space-y-3">
            {topFoods.length > 0 ? topFoods.map((food, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 text-[10px] font-bold ${i === 0 ? 'bg-brand/10 text-brand' : 'bg-fog text-graphite'
                    }`}>
                    {i + 1}
                  </div>
                  <span className="text-body-sm font-medium truncate max-w-[160px]">{food.name}</span>
                </div>
                <span className="bg-fog px-2.5 py-0.5 rounded-lg text-caption font-bold text-graphite">{food.count}×</span>
              </div>
            )) : <p className="text-caption text-graphite italic">{t('noMealsLogged')}</p>}
          </div>
        </motion.div>

        {/* Weight Progress */}
        <motion.div variants={itemVariants} className="card-white shadow-card p-5 md:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mr-3">
                <Scale className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="text-caption font-bold text-graphite uppercase tracking-wider">{t('weightProgress')}</h3>
                <div className="text-heading-sm font-bold">{currentWeight} kg</div>
              </div>
            </div>
            <div className={`flex items-center px-3 py-1.5 rounded-xl text-caption font-bold ${weightChange <= 0
              ? 'bg-mint/10 text-mint'
              : 'bg-coral/10 text-coral'
              }`}>
              {weightChange <= 0 ? <TrendingDown className="w-3.5 h-3.5 mr-1.5" /> : <TrendingUp className="w-3.5 h-3.5 mr-1.5" />}
              {Math.abs(weightChange).toFixed(1)} kg
            </div>
          </div>
          <div className="h-44 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightHistory}>
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#6C5CE7"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#6C5CE7', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: '#6C5CE7', stroke: '#fff', strokeWidth: 2 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 600 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weight Timeline */}
          <div className="border-t border-silver-mist/60 pt-4">
            <h4 className="text-[10px] font-bold text-graphite uppercase tracking-wider mb-3">{t('recentEntries')}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[...weightHistory].reverse().slice(0, 6).map((log, i) => (
                <div key={i} className="flex justify-between items-center text-body-sm p-3 bg-fog rounded-xl">
                  <span className="text-caption text-graphite">{new Date(log.timestamp).toLocaleDateString([], { day: 'numeric', month: 'short' })}</span>
                  <span className="font-bold text-caption">{log.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default AnalyticsTab;
