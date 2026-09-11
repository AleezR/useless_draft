import React, { useState } from 'react';
import { X, Sparkles, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getZodiacByDateAndType } from '../data/zodiacs.js';
import { generateSystemPrompt } from '../data/initialCitizens.js';
import { soundService } from '../services/soundService.js';

export default function ImmigrationModal({ onAddCitizen, onClose }) {
  const [name, setName] = useState('');
  const [building, setBuilding] = useState('BioTech Wing');
  const [location, setLocation] = useState('BioTech Wing, Floor 2, Stall 4');
  const [installDate, setInstallDate] = useState('2026-09-01');
  const [flushType, setFlushType] = useState('Dual Flush Ergonomic');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const handleStartImmigration = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsProcessing(true);
    soundService.playFlushSound();

    const steps = [
      { pct: 25, text: 'Inspecting Porcelain Quality & Trapway Dimensions...' },
      { pct: 50, text: 'Calculating Zodiac Sign & Water Pressure Rating...' },
      { pct: 75, text: 'Generating Unique AI Persona System Prompt...' },
      { pct: 100, text: 'Citizenship Oath Sworn! Welcome to Flushverse!' }
    ];

    for (const step of steps) {
      setProgress(step.pct);
      setStatusText(step.text);
      await new Promise(res => setTimeout(res, 600));
    }

    const zodiac = getZodiacByDateAndType(installDate, flushType);
    const newCitizen = {
      id: `toilet-${Date.now()}`,
      name,
      location,
      building,
      installDate,
      flushType,
      stats: {
        flushStrength: Math.floor(Math.random() * 30) + 70,
        usageFrequency: Math.floor(Math.random() * 40) + 50,
        lockReliability: Math.floor(Math.random() * 50) + 40,
        cleanlinessRating: Math.floor(Math.random() * 20) + 80
      },
      personalityTraits: ['Eager', 'Newly Installed', 'Clean Porcelain', 'Optimistic'],
      flushCoins: 500,
      approvalRating: 75,
      status: 'active',
      citizenshipStatus: 'citizen', // Promoted to full citizen on ceremony completion!
      avatarGradient: 'from-emerald-400 to-cyan-600',
      zodiacSign: zodiac,
      criminalRecord: [],
      cachedContent: {
        manifesto: `I am ${name}! Newly naturalized citizen of Flushverse. I promise clean water and shiny handles!`,
        tinderBio: `Freshly installed in ${location}. Zero water stains. Seeking a compatible pressure tank!`,
        obituary: `Here lies ${name}, a pristine stall that served Flushverse with distinction.`,
        newsQuote: `I am proud to be granted full citizenship in Flushverse today!`
      }
    };

    newCitizen.personalitySystemPrompt = generateSystemPrompt(newCitizen);

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}

    soundService.playMatchChime();
    onAddCitizen(newCitizen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-cyan-500/40 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isProcessing ? (
          <div>
            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 mx-auto mb-2 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
                  🏛️
                </div>
              </div>
              <h2 className="text-xl font-black text-slate-100">IMMIGRATION BUREAU</h2>
              <p className="text-xs text-slate-400">Naturalize a new toilet citizen into Flushverse</p>
            </div>

            <form onSubmit={handleStartImmigration} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">TOILET CITIZEN NAME:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stall 5 'The Challenger'"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">BUILDING / WING:</label>
                <select
                  value={building}
                  onChange={e => setBuilding(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="CS Department">CS Department</option>
                  <option value="Library Wing">Library Wing</option>
                  <option value="Mechanical Block">Mechanical Block</option>
                  <option value="BioTech Wing">BioTech Wing</option>
                  <option value="Student Center">Student Center</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">EXACT LOCATION:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BioTech Wing, Floor 2, Stall 4"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">INSTALL DATE:</label>
                  <input
                    type="date"
                    required
                    value={installDate}
                    onChange={e => setInstallDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">FLUSH TYPE:</label>
                  <select
                    value={flushType}
                    onChange={e => setFlushType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Dual Flush Ergonomic">Dual Flush</option>
                    <option value="Warm Bidet Jet Stream">Warm Bidet</option>
                    <option value="Commercial Flushometer">Flushometer</option>
                    <option value="Pressure-Assisted Turbo">Turbo Pressure</option>
                    <option value="Waterless Eco-Cartridge">Waterless Eco</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
              >
                SWEAR CITIZENSHIP OATH
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 mx-auto flex items-center justify-center text-3xl animate-spin">
              🌀
            </div>
            <h3 className="text-lg font-black text-cyan-400">PROCESSING CITIZENSHIP...</h3>
            <p className="text-xs text-slate-300 italic">{statusText}</p>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
