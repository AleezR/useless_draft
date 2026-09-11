import React, { useState } from 'react';
import { TOILET_ZODIACS } from '../data/zodiacs.js';
import { Sparkles, Compass, HeartHandshake, Shield, Flame } from 'lucide-react';
import { soundService } from '../services/soundService.js';

export default function ZodiacPage({ citizens, selectedZodiac, onSelectZodiac, onOpenChat }) {
  const [activeSign, setActiveSign] = useState(selectedZodiac || TOILET_ZODIACS[0]);
  const [matchSign1, setMatchSign1] = useState(TOILET_ZODIACS[0].id);
  const [matchSign2, setMatchSign2] = useState(TOILET_ZODIACS[1].id);
  const [compatibilityResult, setCompatibilityResult] = useState(null);

  const matchingCitizens = citizens.filter(
    c => c.zodiacSign?.id === activeSign.id
  );

  const handleCalculateMatch = () => {
    soundService.playMatchChime();
    const z1 = TOILET_ZODIACS.find(z => z.id === matchSign1);
    const z2 = TOILET_ZODIACS.find(z => z.id === matchSign2);

    const matchScore = Math.floor(Math.random() * 35) + 65; // 65-99%
    setCompatibilityResult({
      score: matchScore,
      summary: `When a ${z1.name} (${z1.element}) meets a ${z2.name} (${z2.element}), their combined flapper harmonics generate a high-pressure ${matchScore}% flush harmony!`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-slate-950 via-purple-950/20 to-slate-950">
        <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Celestial Porcelain Horoscope</span>
        </div>
        <h1 className="text-3xl font-black text-slate-100">THE 12 TOILET ZODIAC SIGNS</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Every campus toilet is governed by celestial flush physics based on its installation date and valve type. Explore their cosmic personalities below.
        </p>
      </div>

      {/* 12 Zodiac Cards Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {TOILET_ZODIACS.map(zodiac => {
          const isSelected = activeSign.id === zodiac.id;
          return (
            <button
              key={zodiac.id}
              onClick={() => {
                setActiveSign(zodiac);
                soundService.playZodiacSting(zodiac.id);
              }}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-purple-950/80 border-purple-400 shadow-lg shadow-purple-500/20 scale-105'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <div className="text-3xl mb-1">{zodiac.icon}</div>
              <div className="font-extrabold text-xs text-slate-100">{zodiac.name}</div>
              <div className="text-[10px] text-purple-300 font-semibold">{zodiac.dates}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Zodiac Spotlight Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sign Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl p-3 rounded-2xl bg-purple-950 border border-purple-500/40">{activeSign.icon}</span>
            <div>
              <h2 className="text-2xl font-black text-slate-100">{activeSign.name}</h2>
              <p className="text-xs font-bold text-purple-400">{activeSign.dates} • Element: {activeSign.element}</p>
              <p className="text-xs text-slate-400 mt-0.5">Flush Mechanism: {activeSign.flushType}</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {activeSign.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-slate-300 mb-2">KEY CELESTIAL TRAITS:</h4>
            <div className="flex flex-wrap gap-2">
              {activeSign.traits.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-purple-950 text-purple-300 border border-purple-800 text-xs font-semibold">
                  ✨ {t}
                </span>
              ))}
            </div>
          </div>

          {/* Daily Horoscope Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/30">
            <h4 className="text-xs font-extrabold text-indigo-300 flex items-center space-x-1.5 mb-1">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>DAILY PORCELAIN HOROSCOPE</span>
            </h4>
            <p className="text-xs text-slate-200 italic">"{activeSign.horoscope}"</p>
          </div>
        </div>

        {/* Right Column: Citizens with this Zodiac */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-200 mb-3 uppercase tracking-wider">
              CITIZENS OF {activeSign.name.toUpperCase()} ({matchingCitizens.length})
            </h3>
            
            <div className="space-y-2.5">
              {matchingCitizens.map(c => (
                <div key={c.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-100">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.location}</div>
                  </div>
                  <button
                    onClick={() => onOpenChat(c)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold"
                  >
                    Chat 💬
                  </button>
                </div>
              ))}
              {matchingCitizens.length === 0 && (
                <p className="text-xs text-slate-500 italic">No registered toilets currently have this zodiac sign.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zodiac Matchmaker Feature */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase">
          <HeartHandshake className="w-4 h-4" />
          <span>CELESTIAL PLUMBING MATCHMAKER</span>
        </div>
        <h3 className="text-lg font-black text-slate-100">TEST ZODIAC FLUSH COMPATIBILITY</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <select
            value={matchSign1}
            onChange={e => setMatchSign1(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
          >
            {TOILET_ZODIACS.map(z => (
              <option key={z.id} value={z.id}>{z.icon} {z.name}</option>
            ))}
          </select>

          <button
            onClick={handleCalculateMatch}
            className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-slate-950 font-black text-xs uppercase shadow-md shadow-purple-500/20 hover:scale-105 transition-all"
          >
            CALCULATE SYNERGY ✨
          </button>

          <select
            value={matchSign2}
            onChange={e => setMatchSign2(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
          >
            {TOILET_ZODIACS.map(z => (
              <option key={z.id} value={z.id}>{z.icon} {z.name}</option>
            ))}
          </select>
        </div>

        {compatibilityResult && (
          <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center animate-fadeIn">
            <div className="text-2xl font-black text-cyan-300 mb-1">{compatibilityResult.score}% FLUSH HARMONY</div>
            <p className="text-xs text-slate-200">{compatibilityResult.summary}</p>
          </div>
        )}
      </div>

    </div>
  );
}
