import React, { useState } from 'react';
import { Search, PlusCircle, Users, Award, ShieldAlert, Sparkles, SlidersHorizontal } from 'lucide-react';
import CitizenCard from '../components/CitizenCard.jsx';
import ImmigrationModal from '../components/ImmigrationModal.jsx';

export default function DirectoryPage({ citizens, onOpenChat, onReact, onAddCitizen, onSelectZodiac }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'citizen' | 'immigrant' | 'jailed'
  const [showImmigrationModal, setShowImmigrationModal] = useState(false);

  const filteredCitizens = citizens.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.zodiacSign?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'jailed') return matchesSearch && c.status === 'jailed';
    if (filterStatus === 'immigrant') return matchesSearch && c.citizenshipStatus === 'immigrant';
    if (filterStatus === 'citizen') return matchesSearch && c.citizenshipStatus === 'citizen' && c.status !== 'jailed';
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Flushverse Census & Registry</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">
            TOILET CITIZEN DIRECTORY
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Browse all registered campus porcelain citizens, inspect their zodiac signs, test their flush stats, and talk to them live in 1-on-1 AI chat sessions!
          </p>
        </div>

        {/* Immigration CTA */}
        <button
          onClick={() => setShowImmigrationModal(true)}
          className="shrink-0 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>NATURALIZE NEW TOILET</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, location, or zodiac..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${citizens.length})` },
            { id: 'citizen', label: `Full Citizens (${citizens.filter(c => c.citizenshipStatus === 'citizen' && c.status !== 'jailed').length})` },
            { id: 'immigrant', label: `Immigrants (${citizens.filter(c => c.citizenshipStatus === 'immigrant').length})` },
            { id: 'jailed', label: `Jailed (${citizens.filter(c => c.status === 'jailed').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterStatus === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Citizens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCitizens.map(citizen => (
          <CitizenCard
            key={citizen.id}
            citizen={citizen}
            onOpenChat={onOpenChat}
            onReact={onReact}
            onSelectZodiac={onSelectZodiac}
          />
        ))}
      </div>

      {filteredCitizens.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-3xl border border-slate-800">
          <p className="text-base font-bold text-slate-300">No toilet citizens found matching your filter.</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or naturalizing a new toilet!</p>
        </div>
      )}

      {/* Immigration Modal */}
      {showImmigrationModal && (
        <ImmigrationModal
          onAddCitizen={(newCitizen) => {
            onAddCitizen(newCitizen);
            setShowImmigrationModal(false);
          }}
          onClose={() => setShowImmigrationModal(false)}
        />
      )}
    </div>
  );
}
