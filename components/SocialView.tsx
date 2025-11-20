import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { chatWithCompanion } from '../services/geminiService';
import { Icons } from '../constants';

const SocialView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'anon', text: '有人在三楼那个坑位吗？没纸了！！', timestamp: Date.now() - 100000 },
    { id: '2', sender: 'ai', text: '你好，我是你的隔壁坑位助手。无聊的话可以跟我聊聊。', timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Get context for AI
    const history = messages.slice(-5).map(m => `${m.sender === 'user' ? '我' : '你'}: ${m.text}`);
    
    // Call Gemini
    const response = await chatWithCompanion(newMsg.text, history);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: response,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
        <div className="p-4 bg-white shadow-sm z-10">
            <h2 className="font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                坑友热聊 (八卦空间)
            </h2>
            <p className="text-xs text-slate-400">匿名 • 即焚 • 隔壁老王</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : msg.sender === 'ai' 
                            ? 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-none'
                            : 'bg-amber-100 text-amber-900 border border-amber-200 rounded-bl-none'
                    }`}>
                        {msg.sender !== 'user' && <div className="text-[10px] font-bold opacity-50 mb-1 mb-1">{msg.sender === 'ai' ? '隔壁大哲学家' : '神秘坑友'}</div>}
                        {msg.text}
                    </div>
                </div>
            ))}
            {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-200 text-slate-400 text-xs">
                        对方正在输入...
                    </div>
                 </div>
            )}
            <div ref={bottomRef} />
        </div>

        <div className="absolute bottom-[80px] left-0 right-0 p-4 bg-gradient-to-t from-slate-100 to-transparent">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="说点八卦或者借纸..."
                    className="flex-1 p-3 rounded-full border border-slate-300 shadow-sm focus:outline-none focus:border-blue-500"
                />
                <button 
                    onClick={handleSend}
                    className="bg-blue-500 text-white p-3 rounded-full shadow-lg active:scale-95 transition-transform"
                >
                    <Icons.Message className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default SocialView;
