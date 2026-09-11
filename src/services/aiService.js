import { GoogleGenAI } from '@google/genai';

// Memory Cache for generated content (manifestos, bios, eulogies, defenses)
const cache = new Map();

// Rate limiter / queue settings
let lastCallTime = 0;
const MIN_CALL_INTERVAL_MS = 1200; // 1.2s delay between calls for free tier protection

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.ai = this.apiKey ? new GoogleGenAI({ apiKey: this.apiKey }) : null;
  }

  // Queue helper to throttle requests
  async throttle() {
    const now = Date.now();
    const elapsed = now - lastCallTime;
    if (elapsed < MIN_CALL_INTERVAL_MS) {
      await new Promise(resolve => setTimeout(resolve, MIN_CALL_INTERVAL_MS - elapsed));
    }
    lastCallTime = Date.now();
  }

  /**
   * Main AI Chat Function
   * @param {Object} citizen - Toilet citizen object
   * @param {Array} history - Array of previous messages [{role: 'user'|'model', text: ''}]
   * @param {string} userMessage - User input prompt
   */
  async chatWithToilet(citizen, history, userMessage) {
    await this.throttle();

    const systemPrompt = citizen.personalitySystemPrompt || `You are ${citizen.name}, a toilet citizen. Be funny, absurd, deadpan, and speak as a toilet.`;

    // Try Gemini API if key exists
    if (this.apiKey) {
      try {
        const contents = [
          { role: 'user', parts: [{ text: `SYSTEM INSTRUCTIONS: ${systemPrompt}` }] },
          ...history.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ];

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text.trim();
        }
      } catch (err) {
        console.warn('Gemini API request failed, falling back to local persona engine:', err);
      }
    }

    // Fallback Local AI Persona Generator
    return this.generateFallbackChatResponse(citizen, userMessage);
  }

  /**
   * Generate cached manifesto, bio, defense, or obituary
   */
  async generateContentForCitizen(citizen, contentType) {
    const cacheKey = `${citizen.id}_${contentType}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (citizen.cachedContent && citizen.cachedContent[contentType]) {
      return citizen.cachedContent[contentType];
    }

    await this.throttle();

    let prompt = '';
    if (contentType === 'manifesto') {
      prompt = `Write an absurd political election campaign manifesto for Flushverse President. Focus on water pressure, locks, and plumbing freedom. Maximum 3 sentences.`;
    } else if (contentType === 'tinderBio') {
      prompt = `Write a hilarious satirical Tinder dating bio for a campus toilet based on high/low foot traffic and flush mechanics. Maximum 3 sentences.`;
    } else if (contentType === 'obituary') {
      prompt = `Write a dramatic obituary and eulogy for yourself as a decommissioned campus toilet. Maximum 3 sentences.`;
    } else if (contentType === 'courtDefense') {
      prompt = `You are accused of a plumbing infraction in Flushverse court. Write a passionate, ridiculous courtroom defense statement. Maximum 3 sentences.`;
    }

    if (this.apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${citizen.personalitySystemPrompt}\n\nTask: ${prompt}` }]
              }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const cleaned = text.trim();
            cache.set(cacheKey, cleaned);
            return cleaned;
          }
        }
      } catch (e) {
        console.warn('Gemini generate error, using fallback:', e);
      }
    }

    const fallback = this.generateFallbackContent(citizen, contentType);
    cache.set(cacheKey, fallback);
    return fallback;
  }

  // Realistic Fallback Persona Generator (Satirical Engine)
  generateFallbackChatResponse(citizen, userMessage) {
    const traits = citizen.personalityTraits.join(', ').toLowerCase();
    const msg = userMessage.toLowerCase();

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('who are you')) {
      return `Greetings traveler. I am ${citizen.name} of ${citizen.location}. My flush strength is currently at ${citizen.stats.flushStrength}% and my seat is ready.`;
    }
    if (msg.includes('flush') || msg.includes('pressure') || msg.includes('water')) {
      return `Water pressure is not just a stat—it is the lifeblood of Flushverse. At ${citizen.stats.flushStrength}% capacity, I can vortex away even the heaviest homework assignments!`;
    }
    if (msg.includes('lock') || msg.includes('door') || msg.includes('privacy')) {
      return `My lock reliability is rated at ${citizen.stats.lockReliability}%. Enter at your own risk during peak midterm study hours!`;
    }
    if (msg.includes('zodiac') || msg.includes('sign') || msg.includes('astrology')) {
      return `As a proud ${citizen.zodiacSign.name}, I operate with ${citizen.zodiacSign.traits[0]} energy and extreme plumbing dignity.`;
    }
    if (msg.includes('vote') || msg.includes('president') || msg.includes('election')) {
      return `I am campaigning on a platform of universal heated seating and 24/7 lavender scent blocks. Vote for ${citizen.name}!`;
    }

    const responses = [
      `As a ${citizen.zodiacSign.name} with ${traits} tendencies, I take your query very seriously. Please do not drop paper towels in my trapway.`,
      `My sensors indicate strong emotional energy. Rest assured, my ${citizen.stats.flushStrength}% siphon action can clear away any existential dread.`,
      `The students of ${citizen.location} ask me that all the time. My advice? Check the lock before sitting down!`,
      `In Flushverse, we do not ask what the toilet can do for you—we ask if you remember to flush twice!`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  generateFallbackContent(citizen, contentType) {
    if (contentType === 'manifesto') {
      return `I, ${citizen.name}, promise 100% water pressure and mandatory flapper upgrades across all floors! Vote for real porcelain progress!`;
    }
    if (contentType === 'tinderBio') {
      return `Pristine ${citizen.zodiacSign.name} seeking a high-pressure pump for quiet evenings in ${citizen.location}. Swipe right for dual-flush perfection!`;
    }
    if (contentType === 'obituary') {
      return `Here lies ${citizen.name}. After ${citizen.stats.usageFrequency * 100} flushes, its flapper handle has finally achieved eternal rest.`;
    }
    if (contentType === 'courtDefense') {
      return `I plead innocent! The paper towel blockage was an act of unauthorized sabotage by rogue engineering students!`;
    }
    return `Flushverse citizen quote from ${citizen.name}.`;
  }
}

export const aiService = new AIService();
