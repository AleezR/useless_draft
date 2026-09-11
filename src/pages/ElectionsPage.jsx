import React, { useState, useEffect } from 'react';
import { Vote, Trophy, Sparkles, Award, Radio, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { aiService } from '../services/aiService.js';
import { storageService } from '../services/storageService.js';
import { soundService } from '../services/soundService.js';

export default function ElectionsPage({ citizens, onOpenChat }) {
  const [activeRole, setActiveRole] = useState('President'); // 'President' | 'Vice President' | 'MLA'
  const [votes, setVotes] = useState(storageService.getVotes());
  const [manifestos, setManifestos] = useState({});
  const [loadingManifestos, setLoadingManifestos] = useState({});

  // Pick candidates for each role from active citizens
  const candidates = citizens.slice(0, 4);

  useEffect(() => {
    // Generate AI Manifestos for candidates
    candidates.forEach(async (c) => {
      if (!manifestos[c.id]) {
        setLoadingManifestos(prev => ({ ...prev, [c.id]: true }));
        const manifestoText = await aiService.generateContentForCitizen(c, 'manifesto');
        setManifestos(prev => ({ ...prev, [c.id]: manifestoText }));
        setLoadingManifestos(prev => ({ ...prev, [c.id]: false }));
      }
    });
  }, [activeRole]);

  const handleCastVote = (candidateId) => {
    soundService.playFlushSound();
    storageService.saveVote(activeRole, candidateId);
    setVotes(prev => ({ ...prev, [activeRole]: candidateId }));

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  const currentWinner = candidates[0]; // Lead candidate for demo banner

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Satirical Breaking News Winner Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-yellow-500/40 bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-amber-950/40 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-yellow-500 text-slate-950 font-black text-xl animate-pulse shrink-0">
            🏆
          </div>
          <div>
            <div className="flex items-center space-x-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>BREAKING NEWS: ELECTION RESULTS LEADER</span>
            </div>
            <h2 className="text-xl font-black text-slate-100">
              {currentWinner?.name} LEADS PRESIDENTIAL RACE!
            </h2>
            <p className="text-xs text-slate-300 italic mt-0.5">
              "{currentWinner?.cachedContent?.newsQuote || 'I will fight for universal water pressure!'}"
            </p>
          </div>
        </div>
      </div>

      {/* Elections Header & Role Selector */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Vote className="w-4 h-4" />
            <span>Flushverse Democratic Process</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">SUPREME TOILET ELECTIONS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Cast your vote for the leaders of Flushverse. Read AI-generated candidate manifestos spoken in each toilet citizen's unique voice!
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {['President', 'Vice President', 'MLA'].map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === role
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map(candidate => {
          const hasVotedForThis = votes[activeRole] === candidate.id;
          const isManifestoLoading = loadingManifestos[candidate.id];

          return (
            <div
              key={candidate.id}
              className={`glass-panel p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                hasVotedForThis ? 'border-cyan-400 bg-cyan-950/20 shadow-xl shadow-cyan-500/10' : 'border-slate-800'
              }`}
            >
              <div>
                {/* Candidate Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${candidate.avatarGradient} p-0.5 shadow-md`}>
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
                        🚽
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                        CANDIDATE FOR {activeRole.toUpperCase()}
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-100 mt-1">{candidate.name}</h3>
                      <p className="text-xs text-slate-400">{candidate.location}</p>
                    </div>
                  </div>

                  {hasVotedForThis && (
                    <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>YOUR BALLOT</span>
                    </span>
                  )}
                </div>

                {/* AI Manifesto Box */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 relative">
                  <div className="flex justify-between items-center mb-1 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    <span>📢 OFFICIAL CAMPAIGN MANIFESTO</span>
                    <span className="text-[9px] text-slate-500 font-mono">Generated by Citizen AI</span>
                  </div>

                  {isManifestoLoading ? (
                    <p className="text-xs text-slate-400 italic animate-pulse">
                      Generating candidate manifesto in {candidate.name}'s voice...
                    </p>
                  ) : (
                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      "{manifestos[candidate.id] || candidate.cachedContent?.manifesto}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  onClick={() => onOpenChat(candidate)}
                  className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-300 font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Debate Candidate</span>
                </button>

                <button
                  onClick={() => handleCastVote(candidate.id)}
                  disabled={hasVotedForThis}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all ${
                    hasVotedForThis
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  {hasVotedForThis ? 'VOTE CAST' : `VOTE FOR ${candidate.name.split(' ')[0]}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
