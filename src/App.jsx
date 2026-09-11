import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import NewsTicker from './components/NewsTicker.jsx';
import SaviorButton from './components/SaviorButton.jsx';
import CitizenChatModal from './components/CitizenChatModal.jsx';

import DirectoryPage from './pages/DirectoryPage.jsx';
import ZodiacPage from './pages/ZodiacPage.jsx';
import ElectionsPage from './pages/ElectionsPage.jsx';
import StockExchangePage from './pages/StockExchangePage.jsx';
import CourtroomPage from './pages/CourtroomPage.jsx';
import WarDiplomacyPage from './pages/WarDiplomacyPage.jsx';
import TinderPage from './pages/TinderPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';

import { storageService } from './services/storageService.js';
import { soundService } from './services/soundService.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('directory');
  const [citizens, setCitizens] = useState(storageService.getCitizens());
  const [userCoins, setUserCoins] = useState(storageService.getUserCoins());
  const [activeChatCitizen, setActiveChatCitizen] = useState(null);
  const [showSaviorModal, setShowSaviorModal] = useState(false);
  const [selectedZodiac, setSelectedZodiac] = useState(null);

  // Sync state to storage
  const handleUpdateCitizens = (updated) => {
    setCitizens(updated);
    storageService.saveCitizens(updated);
  };

  const handleReact = (citizenId, reactionType) => {
    soundService.playFlushSound();
    const updated = citizens.map(c => {
      if (c.id === citizenId) {
        const delta = reactionType === 'like' ? 2 : -2;
        return {
          ...c,
          approvalRating: Math.max(0, Math.min(100, c.approvalRating + delta))
        };
      }
      return c;
    });
    handleUpdateCitizens(updated);
  };

  const handleAddCitizen = (newCitizen) => {
    const updated = storageService.addCitizen(newCitizen);
    setCitizens(updated);
  };

  const handleSelectZodiacFromCard = (zodiac) => {
    setSelectedZodiac(zodiac);
    setActiveTab('zodiac');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCoins={userCoins}
        onOpenSavior={() => {
          soundService.playSirenSound();
          setShowSaviorModal(true);
        }}
      />

      {/* Flushverse News Network Ticker Banner */}
      <NewsTicker citizens={citizens} />

      {/* Main Feature View Container */}
      <main className="flex-1 pb-16">
        {activeTab === 'directory' && (
          <DirectoryPage
            citizens={citizens}
            onOpenChat={(c) => setActiveChatCitizen(c)}
            onReact={handleReact}
            onAddCitizen={handleAddCitizen}
            onSelectZodiac={handleSelectZodiacFromCard}
          />
        )}

        {activeTab === 'zodiac' && (
          <ZodiacPage
            citizens={citizens}
            selectedZodiac={selectedZodiac}
            onSelectZodiac={setSelectedZodiac}
            onOpenChat={(c) => setActiveChatCitizen(c)}
          />
        )}

        {activeTab === 'elections' && (
          <ElectionsPage
            citizens={citizens}
            onOpenChat={(c) => setActiveChatCitizen(c)}
          />
        )}

        {activeTab === 'tpse' && (
          <StockExchangePage
            userCoins={userCoins}
            setUserCoins={setUserCoins}
          />
        )}

        {activeTab === 'courtroom' && (
          <CourtroomPage
            citizens={citizens}
            setCitizens={handleUpdateCitizens}
            userCoins={userCoins}
            setUserCoins={setUserCoins}
            onOpenChat={(c) => setActiveChatCitizen(c)}
          />
        )}

        {activeTab === 'war' && (
          <WarDiplomacyPage
            citizens={citizens}
          />
        )}

        {activeTab === 'tinder' && (
          <TinderPage
            citizens={citizens}
            onOpenChat={(c) => setActiveChatCitizen(c)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage
            citizens={citizens}
            setCitizens={handleUpdateCitizens}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="w-full border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🚽 <strong>FLUSHVERSE</strong> — Comedic Hackathon Project for TinkerHub Useless Projects</span>
          <span className="text-[11px] text-slate-600">Powered by Gemini AI Free Tier • 100% Absurdist Sanitation Physics</span>
        </div>
      </footer>

      {/* Live AI Toilet Chat Modal */}
      {activeChatCitizen && (
        <CitizenChatModal
          citizen={activeChatCitizen}
          onClose={() => setActiveChatCitizen(null)}
        />
      )}

      {/* Captain Plunger Emergency Savior Modal */}
      {showSaviorModal && (
        <SaviorButton
          citizens={citizens}
          onClose={() => setShowSaviorModal(false)}
        />
      )}

    </div>
  );
}
