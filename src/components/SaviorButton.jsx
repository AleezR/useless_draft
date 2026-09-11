import React, { useState } from 'react';
import { Flame, X, AlertTriangle, ShieldAlert, CheckCircle2, Radio, Volume2 } from 'lucide-react';
import { soundService } from '../services/soundService.js';
import { storageService } from '../services/storageService.js';

export default function SaviorButton({ citizens, onClose }) {
  const [selectedStall, setSelectedStall] = useState(citizens[0]?.location || 'CS Department, Floor 2, Stall 3B');
  const [emergencyReason, setEmergencyReason] = useState('Severe Trapway Blockage & Impending Overflow');
  const [isDispatched, setIsDispatched] = useState(false);
  const [dispatchDetails, setDispatchDetails] = useState(null);

  const handleTriggerEmergency = () => {
    soundService.playSirenSound();

    const dispatchLog = {
      id: `DISPATCH-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      location: selectedStall,
      reason: emergencyReason,
      status: 'UNIT EN ROUTE 🚓',
      eta: '45 SECONDS'
    };

    storageService.addDispatchLog(dispatchLog);
    setDispatchDetails(dispatchLog);
    setIsDispatched(true);

    // Console Webhook Simulation for Hackathon Demo
    console.log('%c🚨 CAPTAIN PLUNGER EMERGENCY DISPATCH WEBHOOK TRIGGERED 🚨', 'color: red; font-size: 16px; font-weight: bold;');
    console.log('Location:', selectedStall);
    console.log('Reason:', emergencyReason);
    console.log('Webhook Payload Sent to Campus Facilities API.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-lg animate-fadeIn siren-active">
      <div className="glass-panel w-full max-w-lg rounded-3xl border-2 border-red-500 shadow-2xl p-6 relative overflow-hidden bg-slate-950/90 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDispatched ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-yellow-500 p-1 mx-auto mb-3 animate-pulse shadow-lg shadow-red-500/50">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-3xl">
                  🪠
                </div>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-500">
                CAPTAIN PLUNGER PROTOCOL
              </h2>
              <p className="text-xs text-red-300 font-semibold tracking-wide uppercase mt-1">
                Emergency Sanitation Dispatch System
              </p>
            </div>

            {/* Form inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  SELECT DISTRESSED CITIZEN STALL:
                </label>
                <select
                  value={selectedStall}
                  onChange={(e) => setSelectedStall(e.target.value)}
                  className="w-full bg-slate-900 border border-red-500/40 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-400"
                >
                  {citizens.map(c => (
                    <option key={c.id} value={c.location}>
                      {c.name} — ({c.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  EMERGENCY INFRACTION TYPE:
                </label>
                <select
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  className="w-full bg-slate-900 border border-red-500/40 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-400"
                >
                  <option value="Severe Trapway Blockage & Impending Overflow">Severe Trapway Blockage & Impending Overflow</option>
                  <option value="Uncontrolled High-Pressure Flapper Leakage">Uncontrolled High-Pressure Flapper Leakage</option>
                  <option value="Paper Towel Terrorism Attack">Paper Towel Terrorism Attack</option>
                  <option value="Broken Lock Lockout during Hackathon">Broken Lock Lockout during Hackathon</option>
                </select>
              </div>
            </div>

            {/* BIG RED DISPATCH BUTTON */}
            <button
              onClick={handleTriggerEmergency}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-lg tracking-wider shadow-xl shadow-red-600/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 border-2 border-red-400/60"
            >
              <Flame className="w-6 h-6 text-yellow-300 animate-bounce" />
              <span>LAUNCH CAPTAIN PLUNGER DISPATCH</span>
            </button>
          </div>
        ) : (
          /* Confirmation Dispatch View */
          <div className="text-center py-4 space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 mx-auto flex items-center justify-center text-4xl text-emerald-400 shadow-xl shadow-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h3 className="text-2xl font-black text-emerald-400">DISPATCH CONFIRMED!</h3>
            <p className="text-xs text-slate-300">
              Captain Plunger's rapid response unit has been dispatched to:
            </p>
            <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40 text-xs font-mono text-emerald-300">
              <div><strong>TICKET ID:</strong> {dispatchDetails.id}</div>
              <div><strong>LOCATION:</strong> {dispatchDetails.location}</div>
              <div><strong>STATUS:</strong> {dispatchDetails.status}</div>
              <div><strong>ESTIMATED ARRIVAL:</strong> {dispatchDetails.eta}</div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Webhook alert dispatched to Campus Facilities Department. Logged to console.
            </p>

            <button
              onClick={() => setIsDispatched(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
            >
              DISPATCH ANOTHER UNIT
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
