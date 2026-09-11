import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { MARKET_EVENTS } from '../data/stockMarket.js';
import { storageService } from '../services/storageService.js';
import { soundService } from '../services/soundService.js';

export default function StockExchangePage({ userCoins, setUserCoins }) {
  const [stocks, setStocks] = useState(storageService.getStocks());
  const [portfolio, setPortfolio] = useState(storageService.getPortfolio());
  const [activeEvent, setActiveEvent] = useState(MARKET_EVENTS[0]);
  const [tradeAmount, setTradeAmount] = useState(1);

  const handleBuy = (stock) => {
    const cost = Math.round(stock.price * tradeAmount);
    if (userCoins < cost) {
      alert('Insufficient FlushCoins balance!');
      return;
    }

    soundService.playMatchChime();
    const newCoins = userCoins - cost;
    const newPortfolio = {
      ...portfolio,
      [stock.id]: (portfolio[stock.id] || 0) + parseInt(tradeAmount, 10)
    };

    setUserCoins(newCoins);
    setPortfolio(newPortfolio);
    storageService.setUserCoins(newCoins);
    storageService.savePortfolio(newPortfolio);
  };

  const handleSell = (stock) => {
    const currentOwned = portfolio[stock.id] || 0;
    if (currentOwned < tradeAmount) {
      alert('You do not own enough shares to sell!');
      return;
    }

    soundService.playFlushSound();
    const revenue = Math.round(stock.price * tradeAmount);
    const newCoins = userCoins + revenue;
    const newPortfolio = {
      ...portfolio,
      [stock.id]: currentOwned - parseInt(tradeAmount, 10)
    };

    setUserCoins(newCoins);
    setPortfolio(newPortfolio);
    storageService.setUserCoins(newCoins);
    storageService.savePortfolio(newPortfolio);
  };

  const handleTriggerVolatility = (event) => {
    soundService.playFlushSound();
    setActiveEvent(event);

    const updatedStocks = stocks.map(s => {
      if (event.affected.includes(s.symbol)) {
        const newPrice = Number((s.price * event.multiplier).toFixed(2));
        const newHistory = [...s.history.slice(1), newPrice];
        return {
          ...s,
          price: newPrice,
          change: Number((s.change + (event.multiplier > 1 ? 12.5 : -8.5)).toFixed(1)),
          history: newHistory
        };
      }
      return s;
    });

    setStocks(updatedStocks);
    storageService.saveStocks(updatedStocks);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-emerald-500/30">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Flushverse Financial District</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100">TOILET PAPER STOCK EXCHANGE (TPSE)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Trade commodities in campus sanitation. Invest FlushCoins in Toilet Paper, Bidets, and Emergency Plungers!
          </p>
        </div>

        {/* User Balance Portfolio Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 text-right shrink-0">
          <div className="text-[10px] font-bold text-slate-400 uppercase">AVAILABLE FLUSHCOINS</div>
          <div className="text-2xl font-black text-emerald-400">{userCoins.toLocaleString()} FC</div>
        </div>
      </div>

      {/* Volatility Event Trigger Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase mb-2">
          <Zap className="w-4 h-4" />
          <span>SIMULATE CAMPUS MARKET VOLATILITY EVENTS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {MARKET_EVENTS.map(evt => (
            <button
              key={evt.id}
              onClick={() => handleTriggerVolatility(evt)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all text-xs"
            >
              <div className="font-bold text-slate-200 truncate">{evt.title}</div>
              <div className="text-[10px] text-amber-400 font-semibold">{evt.impact}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stocks Trading Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stocks.map(stock => {
          const owned = portfolio[stock.id] || 0;
          const isPositive = stock.change >= 0;

          return (
            <div key={stock.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              {/* Stock Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-xl text-slate-100">${stock.symbol}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                      {stock.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{stock.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-slate-100">{stock.price} FC</div>
                  <div className={`text-xs font-bold flex items-center justify-end space-x-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{isPositive ? `+${stock.change}%` : `${stock.change}%`}</span>
                  </div>
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="h-16 w-full bg-slate-950/80 rounded-xl p-2 border border-slate-800/80 flex items-end space-x-2">
                {stock.history.map((val, idx) => {
                  const min = Math.min(...stock.history);
                  const max = Math.max(...stock.history);
                  const pct = Math.max(15, Math.min(100, ((val - min) / (max - min || 1)) * 100));
                  return (
                    <div key={idx} className="flex-1 bg-slate-900 rounded-t flex flex-col justify-end h-full">
                      <div
                        className={`w-full rounded-t transition-all ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{ height: `${pct}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* Portfolio & Buy/Sell Controls */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400">YOU OWN: </span>
                  <strong className="text-emerald-400 font-bold">{owned} SHARES</strong>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={tradeAmount}
                    onChange={e => setTradeAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-100 text-center"
                  />
                  <button
                    onClick={() => handleBuy(stock)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase shadow-md shadow-emerald-500/20"
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => handleSell(stock)}
                    className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs uppercase shadow-md shadow-rose-500/20"
                  >
                    SELL
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
