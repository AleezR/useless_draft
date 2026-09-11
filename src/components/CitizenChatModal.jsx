import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Sparkles, 
  Info, 
  Code, 
  Loader2, 
  MapPin, 
  Flame 
} from 'lucide-react';
import { aiService } from '../services/aiService.js';
import { soundService } from '../services/soundService.js';

export default function CitizenChatModal({ citizen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: `Greetings! I am ${citizen.name} located at ${citizen.location}. My flush strength is currently at ${citizen.stats.flushStrength}%. Ask me anything about flush ethics or campus drama!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isThinking) return;

    const userMsg = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsThinking(true);

    try {
      const responseText = await aiService.chatWithToilet(citizen, messages, textToSend);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      soundService.playFlushSound();
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'model', text: '*Gurgle gurgle* My flapper valve jammed momentarily! Please ask again.' }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const presetQuestions = [
    "How is your water pressure today?",
    "What gossip did you hear during midterms?",
    "Why should I vote for you in Flushverse?",
    "Do you get along with adjacent stalls?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col h-[650px] max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${citizen.avatarGradient || 'from-cyan-500 to-blue-600'} p-0.5 shadow-md`}>
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl">
                🚽
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-slate-100">{citizen.name}</h3>
                {citizen.zodiacSign && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                    {citizen.zodiacSign.icon} {citizen.zodiacSign.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>{citizen.location}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => soundService.playZodiacSting(citizen.zodiacSign?.id)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-400 transition-colors"
              title="Play Audio Sting"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowPromptDetails(!showPromptDetails)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-400 transition-colors"
              title="Inspect System Prompt"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* System Prompt Inspector Drawer */}
        {showPromptDetails && (
          <div className="p-3 bg-slate-950 border-b border-amber-500/30 text-xs font-mono text-amber-300/90 leading-relaxed overflow-x-auto max-h-36 shrink-0">
            <div className="flex justify-between items-center mb-1 font-bold text-amber-400">
              <span>SYSTEM PROMPT DRIVING THIS AI PERSONALITY:</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300">Gemini 1.5 Flash</span>
            </div>
            <p className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px]">
              {citizen.personalitySystemPrompt}
            </p>
          </div>
        )}

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  isUser ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-cyan-400 border border-slate-700'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : '🚽'}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            );
          })}

          {/* Thinking State */}
          {isThinking && (
            <div className="flex items-center space-x-2.5 text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-none italic text-cyan-300 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{citizen.name} is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors border border-slate-700"
            >
              💬 {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${citizen.name} a question...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
