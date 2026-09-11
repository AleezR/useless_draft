import React from 'react';
import { 
  MessageSquare, 
  Volume2, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  ThumbsUp, 
  ThumbsDown, 
  Flame,
  Award
} from 'lucide-react';
import { soundService } from '../services/soundService.js';

export default function CitizenCard({ citizen, onOpenChat, onReact, onSelectZodiac }) {
  const isJailed = citizen.status === 'jailed';
  const isImmigrant = citizen.citizenshipStatus === 'immigrant';

  const handlePlaySound = (e) => {
    e.stopPropagation();
    soundService.playZodiacSting(citizen.zodiacSign?.id);
    soundService.playFlushSound();
  };

  return (
    <div className={`glass-panel-interactive rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between ${
      isJailed ? 'border-red-500/40 bg-red-950/20' : ''
    }`}>
      {/* Background ID Glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${citizen.avatarGradient || 'from-cyan-500 to-blue-600'} opacity-20 blur-2xl pointer-events-none`}></div>

      <div>
        {/* Header Bar: Status Pills & ID Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {isJailed ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 text-[10px] font-extrabold uppercase tracking-wider">
                <ShieldAlert className="w-3 h-3 text-red-400 animate-pulse" />
                <span>JAILED CITIZEN</span>
              </span>
            ) : isImmigrant ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-extrabold uppercase tracking-wider">
                <Award className="w-3 h-3 text-amber-400" />
                <span>IMMIGRANT</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>FULL CITIZEN</span>
              </span>
            )}
          </div>

          {/* Zodiac Sign Clickable Badge */}
          {citizen.zodiacSign && (
            <button
              onClick={() => onSelectZodiac && onSelectZodiac(citizen.zodiacSign)}
              className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[11px] font-semibold transition-colors"
              title="Click to view Zodiac Profile"
            >
              <span>{citizen.zodiacSign.icon}</span>
              <span>{citizen.zodiacSign.name}</span>
            </button>
          )}
        </div>

        {/* Toilet Profile Header */}
        <div className="flex items-start space-x-3 mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${citizen.avatarGradient || 'from-cyan-500 to-blue-600'} p-0.5 shrink-0 shadow-md`}>
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl relative overflow-hidden">
              {isJailed ? '⛓️' : '🚽'}
              <button
                onClick={handlePlaySound}
                className="absolute bottom-0 right-0 p-1 bg-slate-900/90 text-cyan-400 hover:text-cyan-200 text-xs rounded-tl-md border-t border-l border-slate-700"
                title="Play Audio Sting"
              >
                <Volume2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <h3 className="font-extrabold text-base text-slate-100 truncate tracking-tight">
              {citizen.name}
            </h3>
            <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{citizen.location}</span>
            </p>
            <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-slate-400">
              <span>Installed: <strong className="text-slate-200">{citizen.installDate}</strong></span>
              <span>•</span>
              <span className="text-amber-400 font-bold">{citizen.flushCoins} FC</span>
            </div>
          </div>
        </div>

        {/* Traits Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {citizen.personalityTraits.map((trait, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] font-medium border border-slate-700/60">
              {trait}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1">
              <span>Flush Strength</span>
              <span className="text-cyan-400 font-bold">{citizen.stats.flushStrength}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${citizen.stats.flushStrength}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1">
              <span>Lock Reliability</span>
              <span className={citizen.stats.lockReliability < 50 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {citizen.stats.lockReliability}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${citizen.stats.lockReliability < 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${citizen.stats.lockReliability}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
        {/* Quick Sentiment Reactions */}
        <div className="flex items-center space-x-1 text-xs">
          <button
            onClick={() => onReact(citizen.id, 'like')}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
            title="Approve Flush Performance"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onReact(citizen.id, 'dislike')}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
            title="Disapprove Flush Performance"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-bold text-cyan-400 ml-1">
            {citizen.approvalRating}% approval
          </span>
        </div>

        {/* Headline AI Chat Button */}
        <button
          onClick={() => onOpenChat(citizen)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
          <span>Talk to Toilet</span>
        </button>
      </div>
    </div>
  );
}
