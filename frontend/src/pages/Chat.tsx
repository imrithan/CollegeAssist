import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../config/api';

export const Chat: React.FC = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'I am interested in computer science and I am from Tamil Nadu. Can you suggest some good colleges for me?',
      time: '10:24 AM'
    },
    {
      id: '2',
      sender: 'bot',
      text: `Based on your interest in Computer Science and your location (Tamil Nadu), here are some top colleges you can consider:
1. IIT Madras – B.Tech in Computer Science and Engineering
2. Anna University – B.Tech in Computer Science and Engineering
3. Coimbatore Institute of Technology – B.Tech in CSE

Would you like more details about admission criteria, fees or placements?`,
      time: '10:25 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const formatCurrentTime = () => {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: formatCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: textToSend.trim() })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.response || 'I am ready to help with your college admission questions!',
        time: formatCurrentTime(),
        source: data.source
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Sorry, I had trouble connecting to the counselor service. Please ensure the backend is running.',
        time: formatCurrentTime()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const promptSuggestions = [
    'What are the fees for Anna University?',
    'Tell me about IIT Madras admission criteria',
    'Scholarships for engineering students',
    'Career options in AI and ML'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Outer Card matching Figure 11 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 flex flex-col min-h-[620px]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Chat with AI Counselor
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Ask your questions about colleges, courses, scholarships and more.
          </p>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 min-h-[380px]">
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex items-start justify-end space-x-3">
                  <div className="flex flex-col items-end max-w-xl">
                    <div className="bg-[#EBF3FE] text-slate-800 px-5 py-3.5 rounded-2xl rounded-tr-sm text-[14.5px] leading-relaxed shadow-sm">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1.5 mr-1 font-medium">
                      {msg.time}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              );
            }

            // Bot message
            return (
              <div key={msg.id} className="flex items-start space-x-3 max-w-2xl">
                <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <div className="bg-white text-slate-800 border border-slate-200/90 px-5 py-3.5 rounded-2xl rounded-tl-sm text-[14.5px] leading-relaxed whitespace-pre-line shadow-sm w-full">
                    {msg.text}
                  </div>
                  <div className="flex items-center justify-between w-full mt-1.5 px-1">
                    {msg.source ? (
                      <span className="text-[10.5px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                        Source: {msg.source}
                      </span>
                    ) : <span />}
                    <span className="text-[11px] text-slate-400 font-medium">
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start space-x-3 max-w-md">
              <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl text-sm text-slate-500 flex items-center space-x-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-75" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-150" />
                <span className="text-xs text-slate-400 ml-1">Analyzing college dataset...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Suggestions:
          </span>
          {promptSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-xs bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            id="chat-message-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full pl-5 pr-14 py-3.5 rounded-full border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm shadow-sm"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 w-10 h-10 rounded-full bg-[#2563EB] hover:bg-blue-700 disabled:bg-slate-300 text-white flex items-center justify-center shadow-md transition-colors duration-150"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
