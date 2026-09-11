import React, { useState } from 'react';
import { ShieldAlert, Gavel, Scale, AlertOctagon, CheckCircle2, MessageSquare, Coins } from 'lucide-react';
import { aiService } from '../services/aiService.js';
import { storageService } from '../services/storageService.js';
import { soundService } from '../services/soundService.js';

export default function CourtroomPage({ citizens, setCitizens, userCoins, setUserCoins, onOpenChat }) {
  const jailedCitizens = citizens.filter(c => c.status === 'jailed');
  const [defenses, setDefenses] = useState({});
  const [loadingDefenses, setLoadingDefenses] = useState({});

  const handleGenerateDefense = async (citizen) => {
    soundService.playFlushSound();
    setLoadingDefenses(prev => ({ ...prev, [citizen.id]: true }));
    const statement = await aiService.generateContentForCitizen(citizen, 'courtDefense');
    setDefenses(prev => ({ ...prev, [citizen.id]: statement }));
    setLoadingDefenses(prev => ({ ...prev, [citizen.id]: false }));
  };

  const handlePostBail = (citizen) => {
    const bailCost = 300;
    if (userCoins < bailCost) {
      alert('Insufficient FlushCoins to post bail!');
      return;
    }

    soundService.playMatchChime();
    const newCoins = userCoins - bailCost;
    setUserCoins(newCoins);
    storageService.setUserCoins(newCoins);

    const updatedCitizens = citizens.map(c => {
      if (c.id === citizen.id) {
        return {
          ...c,
          status: 'active'
        };
      }
      return c;
    });

    setCitizens(updatedCitizens);
    storageService.saveCitizens(updatedCitizens);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/30 via-slate-950 to-slate-950">
        <div>
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Gavel className="w-4 h-4" />
            <span>Ministry of Cleanliness</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">PUBLIC COURTROOM & JAILHOUSE</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Hear public trial citations for infractions against Flushverse plumbing code. Jailed toilets can be bailed out using community FlushCoins!
          </p>
        </div>

        <div className="bg-red-950 p-4 rounded-2xl border border-red-500/50 flex items-center space-x-3 shrink-0">
          <AlertOctagon className="w-8 h-8 text-red-400 animate-pulse" />
          <div>
            <div className="text-[10px] font-bold text-red-300 uppercase">JAILED CITIZENS</div>
            <div className="text-2xl font-black text-white">{jailedCitizens.length} STALLS IN CARCERATION</div>
          </div>
        </div>
      </div>

      {/* Jailed Citizens Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-100 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          <span>INCARCERATED TOILET MUGSHOTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jailedCitizens.map(citizen => {
            const defenseText = defenses[citizen.id] || citizen.criminalRecord?.[0]?.aiDefense;
            const isLoading = loadingDefenses[citizen.id];

            return (
              <div key={citizen.id} className="glass-panel p-6 rounded-3xl border border-red-500/50 bg-red-950/20 space-y-4">
                <div className="flex items-start space-x-4">
                  {/* Mugshot Placeholder */}
                  <div className="w-20 h-24 bg-slate-950 border-2 border-red-500 rounded-2xl flex flex-col items-center justify-center p-2 relative overflow-hidden shrink-0">
                    <div className="text-3xl">⛓️</div>
                    <span className="text-[9px] font-mono text-red-400 font-bold mt-1">MUGSHOT</span>
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                      JAILED CITIZEN
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-100 mt-1">{citizen.name}</h3>
                    <p className="text-xs text-slate-400">{citizen.location}</p>
                    
                    <div className="mt-2 text-xs text-red-300 font-semibold bg-slate-950 p-2 rounded-xl border border-red-900">
                      INFRACTION: {citizen.criminalRecord?.[0]?.infraction || 'Unsanctioned Water Waste'}
                    </div>
                  </div>
                </div>

                {/* AI Courtroom Defense Statement */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-amber-400 uppercase">
                    <span>⚖️ DEFENDANT'S STATEMENT TO THE COURT</span>
                    <span>AI PERSONA SPEECH</span>
                  </div>

                  {isLoading ? (
                    <p className="text-xs text-slate-400 italic animate-pulse">
                      Generating dramatic courtroom defense in {citizen.name}'s voice...
                    </p>
                  ) : (
                    <p className="text-xs text-slate-200 italic">
                      "{defenseText || 'I demand my constitutional right to a fair flapper hearing!'}"
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <button
                    onClick={() => handleGenerateDefense(citizen)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold"
                  >
                    Generate AI Defense 💬
                  </button>

                  <button
                    onClick={() => handlePostBail(citizen)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase shadow-md shadow-emerald-500/20 hover:scale-105 transition-all"
                  >
                    <Coins className="w-4 h-4 text-slate-950" />
                    <span>POST BAIL (300 FC)</span>
                  </button>
                </div>
              </div>
            );
          })}

          {jailedCitizens.length === 0 && (
            <div className="col-span-2 text-center py-8 glass-panel rounded-3xl border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-200">The Jailhouse is currently empty!</p>
              <p className="text-xs text-slate-400">All citizens of Flushverse are abiding by sanitation regulations.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
