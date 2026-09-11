export const INITIAL_STOCKS = [
  {
    id: 'tp',
    symbol: 'TP',
    name: 'UltraSoft Toilet Paper Corp',
    price: 142.50,
    change: +12.4,
    history: [110, 115, 120, 118, 130, 128, 142.5],
    volume: '45,200 Rolls',
    description: 'The backbone of campus sanitation economy. Highly sensitive to exam season demand.',
    volatility: 'High'
  },
  {
    id: 'san',
    symbol: 'SAN',
    name: 'PureHand Sanitizer Labs',
    price: 88.20,
    change: -3.8,
    history: [95, 94, 92, 90, 89, 87, 88.2],
    volume: '18,400 Liters',
    description: 'Alcohol-based hand defense fluid. Stable dividend payer during flu season.',
    volatility: 'Medium'
  },
  {
    id: 'bdet',
    symbol: 'BDET',
    name: 'HydroJet Bidet Tech',
    price: 310.00,
    change: +24.8,
    history: [240, 255, 270, 285, 290, 300, 310],
    volume: '8,900 Nozzles',
    description: 'High-growth luxury tech stock favored by Library West Wing citizens.',
    volatility: 'High'
  },
  {
    id: 'plng',
    symbol: 'PLNG',
    name: 'Captain Plunger Emergency Corp',
    price: 65.40,
    change: +8.1,
    history: [50, 52, 55, 58, 60, 62, 65.4],
    volume: '12,100 Rubber Cups',
    description: 'Defensive safety stock that skyrockets during Clogging Season.',
    volatility: 'Low'
  }
];

export const MARKET_EVENTS = [
  {
    id: 'event-1',
    title: '🚨 CRITICAL SHORTAGE: Campus Cafeteria Serves Extra-Spicy Tacos',
    impact: 'Toilet Paper ($TP) surging +25%, Bidet Tech ($BDET) surging +40%!',
    affected: ['TP', 'BDET'],
    multiplier: 1.25
  },
  {
    id: 'event-2',
    title: '🌧️ MONSOON RUST PANIC: Pipe Leakage Reported in Engineering Block',
    impact: 'Captain Plunger ($PLNG) demand climbs +18%, Sanitizer ($SAN) drops -5%',
    affected: ['PLNG', 'SAN'],
    multiplier: 1.18
  },
  {
    id: 'event-3',
    title: '🏆 ANNUAL HACKATHON: 500 Coders Occupy CS Building Restrooms',
    impact: 'Overall TPSE Volume hits record 100,000 FlushCoin transactions!',
    affected: ['TP', 'SAN', 'BDET'],
    multiplier: 1.30
  },
  {
    id: 'event-4',
    title: '🧹 DEAN INSPECTION SURPRISE: Ministry of Cleanliness Enforces Standards',
    impact: 'Sanitizer Labs ($SAN) jumps +15% on surprise audit compliance!',
    affected: ['SAN'],
    multiplier: 1.15
  }
];
