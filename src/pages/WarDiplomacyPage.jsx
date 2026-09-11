import React, { useState } from 'react';
import { Swords, Shield, Trophy, Flame, Zap, MapPin } from 'lucide-react';
import { soundService } from '../services/soundService.js';
import confetti from 'canvas-confetti';

export default function WarDiplomacyPage({ citizens }) {
  const [nations, setNations] = useState([
    {
      id: 'nation-1',
      name: 'CS Department Republic',
      building: 'CS Department',
      motto: 'Dual Flush, Zero Downtime!',
      score: 1420,
      stallsCount: 3,
      leader: 'Stall 3B "The Sentinel"'
    },
    {
      id: 'nation-2',
      name: 'Library West Wing Empire',
      building: 'Library Wing',
      motto: 'Silence, Heat, and Warm Bidet Jets!',
      score: 1380,
      stallsCount: 2,
      leader: 'Madame Bidet IX'
    },
    {
      id: 'nation-3',
      name: 'Mechanical Block Fortress',
      building: 'Mechanical Block',
      motto: 'Indestructible Ceramic Under Pressure!',
      score: 1150,
      stallsCount: 2,
      leader: 'Baron von Clog'
    },
    {
      id: 'nation-4',
      name: 'BioTech Innovation Alliance',
      building: 'BioTech Wing',
      motto: 'Zero-Water Cartridges & Gene Siphonage!',
      score: 1290,
      stallsCount: 2,
      leader: 'Novice Commode'
    }
  ]);

  const [warResult, setWarResult] = useState(null);

  const handleSimulateWar = (nationA, nationB) => {
    soundService.playFlushSound();
    const winner = Math.random() > 0.5 ? nationA : nationB;
    const loser = winner.id === nationA.id ? nationB : nationA;

    const pointsGained = Math.floor(Math.random() * 80) + 40;

    const updated = nations.map(n => {
      if (n.id === winner.id) return { ...n, score: n.score + pointsGained };
      if (n.id === loser.id) return { ...n, score: Math.max(0, n.score - Math.floor(pointsGained / 2)) };
      return n;
    });

    setNations(updated);
    setWarResult({
      winner: winner.name,
      loser: loser.name,
      details: `${winner.name} overwhelmed ${loser.name} with superior 95 PSI water jet velocity! Gained +${pointsGained} TPL points!`
    });

    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-red-500/30">
        <div>
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Swords className="w-4 h-4" />
            <span>Toilet Premier League (TPL)</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">FLOOR WARS & DIPLOMACY</h1>
          <p className="text-xs text-slate-400 mt-1">
            Campus buildings have formed Sovereign Toilet Nations. Declare war between rival floors and compete for the supreme TPL Championship Trophy!
          </p>
        </div>
      </div>

      {/* TPL Premier League Standings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Sovereign Nations Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-black text-slate-100 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>SOVEREIGN FLOOR NATIONS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nations.map((nation, idx) => (
              <div key={nation.id} className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    RANK #{idx + 1}
                  </span>
                  <span className="text-xs font-extrabold text-amber-400">{nation.score} TPL PTS</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-100">{nation.name}</h3>
                  <p className="text-xs text-slate-400 italic mt-0.5">"{nation.motto}"</p>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div><strong>Leader:</strong> {nation.leader}</div>
                  <div><strong>Territory:</strong> {nation.building}</div>
                  <div><strong>Citizens:</strong> {nation.stallsCount} Stalls</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: War Clash Arena */}
        <div className="glass-panel p-6 rounded-3xl border border-red-500/30 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase mb-1">
              <Flame className="w-4 h-4" />
              <span>WAR CLASH SIMULATOR</span>
            </div>
            <h3 className="text-lg font-black text-slate-100">DECLARE FLOOR WAR</h3>
            <p className="text-xs text-slate-400 mt-1">
              Pitting the CS Department against Library West Wing in a high-pressure water jet showdown!
            </p>

            <button
              onClick={() => handleSimulateWar(nations[0], nations[1])}
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <Swords className="w-4 h-4" />
              <span>LAUNCH BATTLE OF THE FLOORS</span>
            </button>
          </div>

          {warResult && (
            <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-center animate-fadeIn mt-4">
              <div className="text-sm font-black text-yellow-300 mb-1">🏆 {warResult.winner} VICTORIOUS!</div>
              <p className="text-xs text-slate-200">{warResult.details}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
