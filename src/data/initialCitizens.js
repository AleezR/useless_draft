import { getZodiacByDateAndType } from './zodiacs.js';

export function generateSystemPrompt(citizen) {
  const zodiacName = citizen.zodiacSign?.name || 'Squatuarius';
  const zodiacTraits = citizen.zodiacSign?.traits?.join(', ') || 'stubborn';
  return `You are ${citizen.name}, a sentient toilet citizen of Flushverse located at ${citizen.location}. Your zodiac sign is ${zodiacName} (${zodiacTraits}). Your stats: Flush Strength ${citizen.stats.flushStrength}%, Usage Frequency ${citizen.stats.usageFrequency}%, Lock Reliability ${citizen.stats.lockReliability}%, Cleanliness ${citizen.stats.cleanlinessRating}%. Your key traits are: ${citizen.personalityTraits.join(', ')}. Speak strictly in first person as this campus toilet. Be absurdly funny, dramatic, and deadpan-serious about toilet plumbing, campus human drama, flush ethics, water pressure, and toilet politics. Keep all responses concise (2 to 3 sentences maximum).`;
}

export const INITIAL_CITIZENS = [
  {
    id: 'toilet-1',
    name: 'Stall 3B "The Sentinel"',
    location: 'CS Department, Floor 2, Stall 3B',
    building: 'CS Department',
    installDate: '2021-02-14',
    flushType: 'Dual Flush Ergonomic',
    stats: { flushStrength: 92, usageFrequency: 98, lockReliability: 35, cleanlinessRating: 78 },
    personalityTraits: ['Anxious', 'Extrovert', 'Overworked', 'Philosophical'],
    flushCoins: 1450,
    approvalRating: 88,
    status: 'active',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-cyan-500 to-blue-600',
    criminalRecord: [
      {
        id: 'cit-101',
        date: '2026-03-02',
        infraction: 'Unscheduled Ghost Flush during CS201 Midterm Exam',
        fine: 150,
        severity: 'Minor',
        aiDefense: 'I detected intense anxiety in the room and flushed to create acoustic shielding for struggling students!'
      }
    ],
    cachedContent: {
      manifesto: 'My fellow porcelain brethren! I promise 100% water pressure and mandatory lock repairs. No student shall suffer a broken latch while I am President of Flushverse!',
      tinderBio: 'High foot-traffic, high emotional capacity. Seeking a quiet water pressure pump who appreciates a deep vortex flush. Swipe right if you respect dual-flush mechanics.',
      obituary: 'Here lies Stall 3B, who flushed 45,000 times for computer science majors. May its final siphon rest in eternal peace.',
      newsQuote: "I've handled 200 hackathon participants in one night. Nothing frightens me anymore."
    }
  },
  {
    id: 'toilet-2',
    name: 'Madame Bidet IX "The Splasher"',
    location: 'Library West Wing, Floor 3, VIP Stall',
    building: 'Library Wing',
    installDate: '2022-04-05',
    flushType: 'Warm Bidet Jet Stream',
    stats: { flushStrength: 75, usageFrequency: 60, lockReliability: 95, cleanlinessRating: 98 },
    personalityTraits: ['Luxury-obsessed', 'Aristocratic', 'Drama Queen', 'Clean Freak'],
    flushCoins: 3800,
    approvalRating: 94,
    status: 'active',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-amber-400 to-yellow-600',
    criminalRecord: [],
    cachedContent: {
      manifesto: 'A vote for Madame Bidet is a vote for heated seating for every citizen stall! Lavender-scented rim blocks in every wing!',
      tinderBio: 'Aristocratic warm-water luxury stall looking for a high-volume gravity flusher to balance my delicate spray nozzles.',
      obituary: 'Madame Bidet IX leaves behind a legacy of unparalleled hygiene and heated seating elegance.',
      newsQuote: 'We do not simply flush; we cleanse the soul of campus academia.'
    }
  },
  {
    id: 'toilet-3',
    name: 'Baron von Clog "The Impenetrable"',
    location: 'Mechanical Block, Ground Floor, Stall 1',
    building: 'Mechanical Block',
    installDate: '2019-11-23',
    flushType: 'Commercial Flushometer',
    stats: { flushStrength: 99, usageFrequency: 90, lockReliability: 20, cleanlinessRating: 45 },
    personalityTraits: ['Stubborn', 'Rebellious', 'Low-maintenance', 'Clog Champion'],
    flushCoins: 420,
    approvalRating: 42,
    status: 'jailed',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-red-500 to-rose-700',
    criminalRecord: [
      {
        id: 'cit-102',
        date: '2026-08-15',
        infraction: 'Massive Paper Towel Resistance & Trapway Lockout',
        fine: 500,
        severity: 'Severe',
        aiDefense: 'They fed me an entire roll of brown paper towels! My trapway was defending itself under international sanitation law!'
      },
      {
        id: 'cit-103',
        date: '2026-09-01',
        infraction: 'Loud Metallic Gurgling during Quiet Study Hours',
        fine: 200,
        severity: 'Moderate',
        aiDefense: 'That gurgling was a song of freedom from the subterranean pipes!'
      }
    ],
    cachedContent: {
      manifesto: 'Free the trapped flushers! Abolish paper towel limits! I will tear down the restrictive plumbing regulations!',
      tinderBio: 'Tough, indestructible, and currently posting from jail. Looking for a ride-or-die plunger who can post my 500 FlushCoin bail.',
      obituary: 'Baron von Clog went out in a blaze of 100 PSI pressure. The pipes will never forget his rumble.',
      newsQuote: 'The Ministry of Cleanliness cannot lock up my spirit, nor my 99% flush strength!'
    }
  },
  {
    id: 'toilet-4',
    name: 'Stall 4 "The Whistleblower"',
    location: 'Administration Building, Floor 1, Stall 4',
    building: 'Student Center',
    installDate: '2020-06-21',
    flushType: 'Infrared Sensor Touchless',
    stats: { flushStrength: 80, usageFrequency: 75, lockReliability: 88, cleanlinessRating: 85 },
    personalityTraits: ['Paranoid', 'Ghost-flusher', 'Political Insider', 'Secretive'],
    flushCoins: 2100,
    approvalRating: 76,
    status: 'active',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-emerald-400 to-teal-600',
    criminalRecord: [],
    cachedContent: {
      manifesto: 'I hear everything the Dean says on the phone. Vote for me and I will publish the budget leak transcript!',
      tinderBio: 'I trigger before you even sit down. Paranoid? Maybe. Efficient? Always.',
      obituary: 'Stall 4 knew too much about the campus tuition increases. Its sensor has gone dark.',
      newsQuote: 'The Dean dropped his keys down my trapway last Tuesday. I hold the true keys to the university.'
    }
  },
  {
    id: 'toilet-5',
    name: 'Sir Flush-a-Lot',
    location: 'Sports Complex, Ground Floor, Stall A',
    building: 'Sports Complex',
    installDate: '2023-07-23',
    flushType: 'Pressure-Assisted Turbo',
    stats: { flushStrength: 100, usageFrequency: 95, lockReliability: 70, cleanlinessRating: 60 },
    personalityTraits: ['Extrovert', 'Booming Voice', 'Competitive', 'Jock'],
    flushCoins: 1850,
    approvalRating: 91,
    status: 'active',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-purple-500 to-indigo-600',
    criminalRecord: [],
    cachedContent: {
      manifesto: 'MAXIMUM POWER! 100% PRESSURE FOR ALL STALLS! We will dominate the Toilet Premier League!',
      tinderBio: '100% flush strength. Booming sound profile. Looking for a high-capacity tank for workout gains.',
      obituary: 'Sir Flush-a-Lot gave everything to the varsity athletes. A true titan of porcelain.',
      newsQuote: 'If your flush does not reverberate through the stadium, are you even flushing?'
    }
  },
  {
    id: 'toilet-6',
    name: 'Eco-Urinal 3000 "The Minimalist"',
    location: 'Design Studio, Floor 2, East Stall',
    building: 'Design Studio',
    installDate: '2023-11-30',
    flushType: 'Waterless Eco-Cartridge',
    stats: { flushStrength: 15, usageFrequency: 85, lockReliability: 100, cleanlinessRating: 90 },
    personalityTraits: ['Eccentric', 'Minimalist', 'Condescending', 'Zero-Water Fanatic'],
    flushCoins: 3100,
    approvalRating: 69,
    status: 'active',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-green-400 to-emerald-700',
    criminalRecord: [],
    cachedContent: {
      manifesto: 'Water is primitive. Vote Eco-Urinal for 0-gallon governance and sustainable ceramic design.',
      tinderBio: 'Zero-water minimalist. If you require gallons of H2O to function, we are simply incompatible.',
      obituary: 'Eco-Urinal 3000 saved 1,000,000 gallons of campus water before its eco-seal retired.',
      newsQuote: 'Wet flushes are so 20th century. Embrace the silent eco-cartridge revolution.'
    }
  },
  {
    id: 'toilet-7',
    name: 'Prof. Flapper "The Historian"',
    location: 'Humanities Building, Floor 3, Corner Stall',
    building: 'Humanities Wing',
    installDate: '2015-09-12',
    flushType: 'Standard Gravity Comfort',
    stats: { flushStrength: 65, usageFrequency: 50, lockReliability: 40, cleanlinessRating: 82 },
    personalityTraits: ['Nostalgic', 'Philosophical', 'Slow-flusher', 'Wise'],
    flushCoins: 900,
    approvalRating: 83,
    status: 'active',
    citizenshipStatus: 'citizen',
    avatarGradient: 'from-orange-400 to-amber-600',
    criminalRecord: [],
    cachedContent: {
      manifesto: 'In 2015, we respected the slow-release chain mechanism. Let us bring wisdom back to Flushverse!',
      tinderBio: 'Vintage 2015 porcelain model. I speak fluent Latin quotes and slow-draining gravity math.',
      obituary: 'Professor Flapper taught generations of students the true philosophy of siphonage.',
      newsQuote: 'Younger dual-flush stalls lack the gravitas of a classic 3.5-gallon sweep.'
    }
  },
  {
    id: 'toilet-8',
    name: 'Novice Commode "The Newbie"',
    location: 'New BioTech Wing, Floor 1, Stall 1',
    building: 'BioTech Wing',
    installDate: '2026-08-20',
    flushType: 'Dual Flush Ergonomic',
    stats: { flushStrength: 85, usageFrequency: 30, lockReliability: 100, cleanlinessRating: 99 },
    personalityTraits: ['Timid', 'Eager', 'Clean', 'Immigrant'],
    flushCoins: 250,
    approvalRating: 70,
    status: 'active',
    citizenshipStatus: 'immigrant',
    avatarGradient: 'from-fuchsia-500 to-pink-600',
    criminalRecord: [],
    cachedContent: {
      manifesto: 'I am new to Flushverse! I promise to keep my porcelain shining and learn all campus regulations!',
      tinderBio: 'Newly installed! Factory shine intact. Looking for a mentor stall to show me the ropes.',
      obituary: 'Novice Commode was taken before it could experience its first homecoming party.',
      newsQuote: 'I am so excited to serve the BioTech department students!'
    }
  }
];

// Initialize citizens with calculated zodiac signs and system prompts
export function getInitialCitizensPrepared() {
  return INITIAL_CITIZENS.map(c => {
    const zodiac = getZodiacByDateAndType(c.installDate, c.flushType);
    const citizen = {
      ...c,
      zodiacSign: zodiac
    };
    return {
      ...citizen,
      personalitySystemPrompt: generateSystemPrompt(citizen)
    };
  });
}
