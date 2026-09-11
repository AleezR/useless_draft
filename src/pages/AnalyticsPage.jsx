import React, { useState } from 'react';
import { BarChart3, ThumbsUp, Heart, Flower2, Sparkles, AlertCircle, PlusCircle } from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { aiService } from '../services/aiService.js';
import { soundService } from '../services/soundService.js';

export default function AnalyticsPage({ citizens, setCitizens }) {
  const [obituaries, setObituaries] = useState(storageService.getObituaries());
  const [decommissioningId, setDecommissioningId] = useState('');
  const [isGeneratingEulogy, setIsGeneratingEulogy] = useState(false);

  // Sorted citizens by approval rating
  const leaderboard = [...citizens].sort((a, b) => b.approvalRating - a.approvalRating);

  const handleDecommission = async (citizen) => {
    soundService.playFlushSound();
    setIsGeneratingEulogy(true);

    const eulogyText = await aiService.generateContentForCitizen(citizen, 'obituary');

    const newObit = {
      id: `obit-${Date.now()}`,
      name: citizen.name,
      location: citizen.location,
      decommissionDate: new Date().toISOString().split('T')[0],
      eulogy: eulogyText,
      zodiac: citizen.zodiacSign?.name || 'Squatuarius'
    };

    const updatedObits = storageService.addObituary(newObit);
    setObituaries(updatedObits);

    // Update status of citizen to decommissioned
    const updatedCitizens = citizens.map(c => {
      if (c.id === citizen.id) {
        return { ...c, status: 'decommissioned' };
      }
      return c;
    });

    setCitizens(updatedCitizens);
    storageService.saveCitizens(updatedCitizens);
    setIsGeneratingEulogy(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Flushverse Analytics & History</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">SENTIMENT LEADERBOARD & MEMORIAL WALL</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track live citizen approval ratings and pay respects to decommissioned toilets on the public memorial wall.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Live Approval Rating Leaderboard */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-xl font-black text-slate-100 flex items-center space-x-2">
            <ThumbsUp className="w-5 h-5 text-cyan-400" />
            <span>APPROVAL RATING LEADERBOARD</span>
          </h2>

          <div className="space-y-3">
            {leaderboard.map((citizen, idx) => (
              <div key={citizen.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                    idx === 0 ? 'bg-amber-400 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="font-extrabold text-xs text-slate-100">{citizen.name}</div>
                    <div className="text-[10px] text-slate-400">{citizen.location}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-black text-cyan-400">{citizen.approvalRating}%</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase">APPROVAL</div>
                  </div>

                  {citizen.status !== 'decommissioned' && (
                    <button
                      onClick={() => handleDecommission(citizen)}
                      disabled={isGeneratingEulogy}
                      className="px-2.5 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] font-bold transition-all"
                      title="Decommission & Post Obituary"
                    >
                      Decommission 🥀
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Public Memorial Wall (Obituaries) */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-100 flex items-center space-x-2">
              <Flower2 className="w-5 h-5 text-purple-400" />
              <span>PUBLIC MEMORIAL WALL</span>
            </h2>
            <span className="text-xs text-purple-400 font-bold">{obituaries.length} MEMORIALS</span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {obituaries.map(obit => (
              <div key={obit.id} className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🕯️</span>
                    <h4 className="font-extrabold text-sm text-slate-100">{obit.name}</h4>
                  </div>
                  <span className="text-[10px] text-purple-300 font-mono">Decommissioned: {obit.decommissionDate}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-purple-900 text-xs italic text-slate-200">
                  "{obit.eulogy}"
                </div>

                <div className="text-[10px] text-slate-400 text-right">
                  Zodiac: <strong className="text-purple-300">{obit.zodiac}</strong> • Location: {obit.location}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
