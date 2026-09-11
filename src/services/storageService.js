import { getInitialCitizensPrepared } from '../data/initialCitizens.js';
import { INITIAL_STOCKS } from '../data/stockMarket.js';

const STORAGE_KEYS = {
  CITIZENS: 'flushverse_citizens',
  USER_COINS: 'flushverse_user_coins',
  VOTES: 'flushverse_election_votes',
  PORTFOLIO: 'flushverse_user_portfolio',
  STOCKS: 'flushverse_stocks',
  OBITUARIES: 'flushverse_obituaries',
  DISPATCH_LOGS: 'flushverse_dispatch_logs'
};

export const storageService = {
  getCitizens() {
    const data = localStorage.getItem(STORAGE_KEYS.CITIZENS);
    if (!data) {
      const initial = getInitialCitizensPrepared();
      localStorage.setItem(STORAGE_KEYS.CITIZENS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(data);
    } catch {
      const initial = getInitialCitizensPrepared();
      return initial;
    }
  },

  saveCitizens(citizens) {
    localStorage.setItem(STORAGE_KEYS.CITIZENS, JSON.stringify(citizens));
  },

  addCitizen(newCitizen) {
    const citizens = this.getCitizens();
    citizens.push(newCitizen);
    this.saveCitizens(citizens);
    return citizens;
  },

  updateCitizen(updatedCitizen) {
    const citizens = this.getCitizens();
    const idx = citizens.findIndex(c => c.id === updatedCitizen.id);
    if (idx !== -1) {
      citizens[idx] = updatedCitizen;
      this.saveCitizens(citizens);
    }
    return citizens;
  },

  getUserCoins() {
    const val = localStorage.getItem(STORAGE_KEYS.USER_COINS);
    return val ? parseInt(val, 10) : 5000;
  },

  setUserCoins(amount) {
    localStorage.setItem(STORAGE_KEYS.USER_COINS, amount.toString());
  },

  getVotes() {
    const data = localStorage.getItem(STORAGE_KEYS.VOTES);
    return data ? JSON.parse(data) : {};
  },

  saveVote(role, candidateId) {
    const votes = this.getVotes();
    votes[role] = candidateId;
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
  },

  getStocks() {
    const data = localStorage.getItem(STORAGE_KEYS.STOCKS);
    return data ? JSON.parse(data) : INITIAL_STOCKS;
  },

  saveStocks(stocks) {
    localStorage.setItem(STORAGE_KEYS.STOCKS, JSON.stringify(stocks));
  },

  getPortfolio() {
    const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    return data ? JSON.parse(data) : { tp: 10, san: 5, bdet: 2, plng: 15 };
  },

  savePortfolio(portfolio) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
  },

  getObituaries() {
    const data = localStorage.getItem(STORAGE_KEYS.OBITUARIES);
    if (!data) {
      const defaultObits = [
        {
          id: 'obit-1',
          name: 'Stall 1A "The Pioneer"',
          location: 'Old Engineering Block, Floor 1',
          decommissionDate: '2026-01-10',
          eulogy: 'I served 12 years of structural mechanics students. My pipes were rusty, but my devotion was stainless steel.',
          zodiac: 'Porcelian'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.OBITUARIES, JSON.stringify(defaultObits));
      return defaultObits;
    }
    return JSON.parse(data);
  },

  addObituary(obit) {
    const obits = this.getObituaries();
    obits.unshift(obit);
    localStorage.setItem(STORAGE_KEYS.OBITUARIES, JSON.stringify(obits));
    return obits;
  },

  getDispatchLogs() {
    const data = localStorage.getItem(STORAGE_KEYS.DISPATCH_LOGS);
    return data ? JSON.parse(data) : [];
  },

  addDispatchLog(log) {
    const logs = this.getDispatchLogs();
    logs.unshift(log);
    localStorage.setItem(STORAGE_KEYS.DISPATCH_LOGS, JSON.stringify(logs));
    return logs;
  }
};
