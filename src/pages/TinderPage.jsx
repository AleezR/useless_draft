import React, { useState, useEffect } from 'react';
import { Heart, X, Sparkles, MessageSquare, Flame, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { aiService } from '../services/aiService.js';
import { soundService } from '../services/soundService.js';

export default function TinderPage({ citizens, onOpenChat }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBio, setCurrentBio] = useState('');
  const [isLoadingBio, setIsLoadingBio] = useState(false);
  const [matchedCitizen, setMatchedCitizen] = useState(null);

  const currentToilet = citizens[currentIndex % citizens.length];

  useEffect(() => {
    if (currentToilet) {
      fetchBio(currentToilet);
    }
  }, [currentIndex]);

  const fetchBio = async (toilet) => {
    setIsLoadingBio(true);
    const bioText = await aiService.generateContentForCitizen(toilet, 'tinderBio');
    setCurrentBio(bioText);
    setIsLoadingBio(false);
  };

  const handleSwipeRight = () => {
    soundService.playMatchChime();
    
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setMatchedCitizen(currentToilet);
  };

  const handleSwipeLeft = () => {
    soundService.playFlushSound();
    setCurrentIndex(prev => prev + 1);
  };

  const handleNextMatch = () => {
    setMatchedCitizen(null);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>FlushMatch Dating Network</span>
        </div>
        <h1 className="text-3xl font-black text-slate-100">PORCELAIN DATING APP</h1>
        <p className="text-xs text-slate-400">
          Match complementary usage patterns! High-frequency stalls meet low-maintenance quiet bidets for hydrodynamic romance.
        </p>
      </div>

      {/* Swipeable Card Stack Container */}
      <div className="max-w-sm mx-auto relative">
        {currentToilet && (
          <div className="glass-panel rounded-3xl border border-rose-500/30 p-6 space-y-4 shadow-2xl relative overflow-hidden bg-slate-950/90">
            
            {/* Gradient Avatar */}
            <div className={`w-full h-48 rounded-2xl bg-gradient-to-tr ${currentToilet.avatarGradient} p-1 shadow-lg relative flex items-center justify-center`}>
              <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex flex-col items-center justify-center relative">
                <span className="text-6xl animate-float">🚽</span>
                <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-rose-300 border border-rose-800">
                  {currentToilet.zodiacSign?.icon} {currentToilet.zodiacSign?.name}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-100">{currentToilet.name}</h3>
                <span className="text-xs font-bold text-emerald-400">{currentToilet.stats.flushStrength}% Strength</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentToilet.location}</p>
            </div>

            {/* AI Generated Bio Box */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-rose-400 uppercase">
                <span>💬 AI PERSONA DATING BIO</span>
                <span>MATCH COMPATIBILITY 94%</span>
              </div>
              {isLoadingBio ? (
                <p className="text-xs text-slate-400 italic animate-pulse">
                  Generating dating bio in {currentToilet.name}'s voice...
                </p>
              ) : (
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{currentBio || currentToilet.cachedContent?.tinderBio}"
                </p>
              )}
            </div>

            {/* Traits */}
            <div className="flex flex-wrap gap-1.5">
              {currentToilet.personalityTraits.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium">
                  {t}
                </span>
              ))}
            </div>

            {/* Swiping Action Buttons */}
            <div className="flex items-center justify-center space-x-6 pt-2">
              <button
                onClick={handleSwipeLeft}
                className="w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-rose-500 border border-rose-900 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                title="Pass"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={handleSwipeRight}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/40 hover:scale-110 active:scale-95 transition-all"
                title="FlushMatch!"
              >
                <Heart className="w-8 h-8 fill-white" />
              </button>
            </div>

          </div>
        )}
      </div>

      {/* IT'S A FLUSH! Match Overlay Modal */}
      {matchedCitizen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl border-2 border-rose-400 text-center space-y-4 shadow-2xl bg-slate-950">
            <div className="text-5xl animate-bounce">💖</div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400">
              IT'S A FLUSH!
            </h2>
            <p className="text-xs text-slate-300">
              You and <strong>{matchedCitizen.name}</strong> have mutual hydrodynamic attraction!
            </p>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-rose-300 font-semibold">
              "Your water pressure profile matches my siphon mechanics perfectly!"
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  const citizenToChat = matchedCitizen;
                  setMatchedCitizen(null);
                  onOpenChat(citizenToChat);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30"
              >
                SEND A CHAT MESSAGE 💬
              </button>

              <button
                onClick={handleNextMatch}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
              >
                KEEP SWIPING
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
