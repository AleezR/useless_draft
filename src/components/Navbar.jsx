import React from 'react';
import { 
  Users, 
  Sparkles, 
  Vote, 
  TrendingUp, 
  ShieldAlert, 
  Swords, 
  Heart, 
  BarChart3, 
  Coins, 
  Flame
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, userCoins, onOpenSavior }) {
  const navItems = [
    { id: 'directory', label: 'Census Directory', icon: Users },
    { id: 'zodiac', label: 'Toilet Zodiacs', icon: Sparkles },
    { id: 'elections', label: 'Elections', icon: Vote },
    { id: 'tpse', label: 'TPSE Stocks', icon: TrendingUp },
    { id: 'courtroom', label: 'Courtroom & Crime', icon: ShieldAlert },
    { id: 'war', label: 'Floor Wars', icon: Swords },
    { id: 'tinder', label: 'FlushMatch', icon: Heart },
    { id: 'analytics', label: 'Analytics & Obituaries', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('directory')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 animate-float">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-xl">
                🚽
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
                  FLUSHVERSE
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase tracking-widest">
                  Satirical Sim
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Campus Toilet Civilization</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: User Balance & Captain Plunger Button */}
          <div className="flex items-center space-x-3">
            {/* FlushCoins Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-inner">
              <Coins className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>{userCoins.toLocaleString()}</span>
              <span className="text-[10px] text-amber-500 uppercase font-semibold">FC</span>
            </div>

            {/* Emergency Captain Plunger Button */}
            <button
              onClick={onOpenSavior}
              className="relative group overflow-hidden px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-1.5 border border-red-400/40"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Flame className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="tracking-wide">CAPTAIN PLUNGER</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 shrink-0 px-3 py-1.5 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
