import React from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
  PieChart, Pie,
  LineChart, Line
} from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';

export default function AnalyticsTab({ weeklyTrendData, targets, macroStats, topFoods, currentWeight, weightChange, weightHistory }) {
  return (
    <div className="pt-12 px-6 pb-32 max-w-7xl mx-auto">
      <header className="mb-10 text-center md:text-left">
        <h1 className="font-display font-semibold text-heading-sm md:text-heading-md mb-1">Analytics</h1>
        <p className="text-body-sm text-graphite">Monthly performance & health insights</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Weekly Caloric Balance (Traffic Light) */}
        <div className="card-white p-6 shadow-sm-soft border border-silver-mist lg:col-span-2">
          <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-4">Weekly Calorie Balance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrendData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: '#f2f2f7' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <ReferenceLine y={targets.targetCalories} stroke="#8e8e93" strokeDasharray="3 3" />
                <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
                  {weeklyTrendData.map((entry, index) => {
                    const isOver = entry.calories > entry.target;
                    const isWayUnder = entry.calories < entry.target * 0.7;
                    let color = '#34c759';
                    if (isOver) color = '#ff3b30';
                    if (isWayUnder && entry.calories > 0) color = '#ffcc00';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-4 text-[10px] text-graphite font-medium">
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#ff3b30] mr-1"></div> Over</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#34c759] mr-1"></div> Target</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#ffcc00] mr-1"></div> Under</span>
          </div>
        </div>

        {/* 2. Macro Composition (Donut Chart) */}
        <div className="card-white p-6 border border-silver-mist">
          <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-6">30-Day Macro Distribution</h3>
          <div className="flex flex-col items-center">
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={macroStats} innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                    {macroStats.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full mt-6 space-y-3">
              {macroStats.map((m, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: m.color }}></div>
                    <span className="text-[11px] font-semibold">{m.name}</span>
                  </div>
                  <span className="text-[11px] font-bold">{m.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Top 5 Foods */}
        <div className="card-white p-6 border border-silver-mist">
          <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-4">Most Tracked Meals</h3>
          <div className="space-y-4">
            {topFoods.length > 0 ? topFoods.map((food, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-fog rounded-full flex items-center justify-center mr-3 text-[10px] font-bold">{i + 1}</div>
                  <span className="text-body-sm font-medium">{food.name}</span>
                </div>
                <div className="bg-fog px-3 py-1 rounded-full text-[10px] font-bold">{food.count}x</div>
              </div>
            )) : <p className="text-caption text-graphite italic">No meals logged yet.</p>}
          </div>
        </div>

        {/* 4. Weight Progress */}
        <div className="card-white p-6 border border-silver-mist md:col-span-2 lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[11px] font-bold text-graphite uppercase tracking-widest mb-1">Weight Progress</h3>
              <div className="text-heading-sm font-bold">{currentWeight} kg</div>
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full ${weightChange <= 0 ? 'bg-[#34c759]/10 text-[#34c759]' : 'bg-[#ff3b30]/10 text-[#ff3b30]'} text-[11px] font-bold`}>
              {weightChange <= 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
              {Math.abs(weightChange).toFixed(1)} kg
            </div>
          </div>
          <div className="h-48 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightHistory}>
                <Line type="monotone" dataKey="weight" stroke="#1c1c1e" strokeWidth={3} dot={{ r: 4, fill: '#1c1c1e' }} />
                <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weight Timeline */}
          <div className="space-y-3 border-t border-silver-mist pt-6">
            <h4 className="text-[10px] font-bold text-graphite uppercase tracking-widest mb-4">Weight Logs</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...weightHistory].reverse().slice(0, 6).map((log, i) => (
                <div key={i} className="flex justify-between items-center text-body-sm p-3 bg-fog rounded-xl">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-ink/20 mr-3"></div>
                    <span className="text-graphite">{new Date(log.timestamp).toLocaleDateString([], { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <span className="font-bold">{log.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
