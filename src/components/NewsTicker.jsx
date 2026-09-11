import React from 'react';
import { Radio, Sparkles } from 'lucide-react';

export default function NewsTicker({ citizens }) {
  // Generate satirical news headlines using citizen data
  const headlines = [
    "🚨 FNN BREAKING: Stall 3B wins re-election, tells reporters: 'I've always believed in strong water pressure and stronger community.'",
    "📈 TPSE FLASH: Toilet Paper ($TP) skyrockets +30% after Cafeteria serves extra spicy tacos!",
    "🏛️ COURT ALERT: Baron von Clog's bail set at 500 FlushCoins following paper towel incident in Mechanical Block.",
    "👑 ZODIAC FORECAST: Squatuarius toilets experience peak alignment during midterm exam week.",
    "🔥 FLUSHMATCH DRAMA: Madame Bidet IX swipes right on Sir Flush-a-Lot; calls it 'a hydro-dynamic romance'.",
    "💧 WATERLESS VICTORY: Eco-Urinal 3000 passes zero-water conservation act in Student Senate.",
    "🚨 EMERGENCY: Captain Plunger dispatches automated maintenance unit to CS Department Floor 2!"
  ];

  return (
    <div className="w-full bg-slate-900/90 border-b border-cyan-500/20 text-xs py-2 overflow-hidden shadow-inner flex items-center">
      {/* Live Badge */}
      <div className="shrink-0 flex items-center space-x-1.5 px-3 py-0.5 bg-red-600/90 text-white font-bold tracking-wider rounded-r-md shadow-md z-10 mr-2 text-[11px]">
        <Radio className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
        <span>FNN LIVE</span>
      </div>

      {/* Marquee Container */}
      <div className="overflow-hidden whitespace-nowrap w-full">
        <div className="animate-marquee inline-flex space-x-8 font-medium text-slate-300">
          {headlines.map((text, idx) => (
            <span key={idx} className="flex items-center space-x-2 text-slate-200">
              <span>{text}</span>
              <span className="text-cyan-500 font-bold">•</span>
            </span>
          ))}
          {/* Duplicate set for smooth infinite marquee loop */}
          {headlines.map((text, idx) => (
            <span key={`dup-${idx}`} className="flex items-center space-x-2 text-slate-200">
              <span>{text}</span>
              <span className="text-cyan-500 font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
