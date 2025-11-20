import React, { useState, useEffect, useRef } from 'react';
import { AppMode } from '../types';
import { Icons } from '../constants';
import { generateEntertainment } from '../services/geminiService';

interface ActiveSessionProps {
  mode: AppMode;
  onFinish: (duration: number) => void;
  setMode: (mode: AppMode) => void;
}

const ActiveSession: React.FC<ActiveSessionProps> = ({ mode, onFinish, setMode }) => {
  const [seconds, setSeconds] = useState(0);
  const [aiContent, setAiContent] = useState<string>("正在连接隔壁坑位的信号...");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initial content load
    loadContent();
  }, [mode]);

  const loadContent = async () => {
    setAiContent("正在生成...");
    const text = await generateEntertainment(mode);
    setAiContent(text);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Simple Brown Noise Generator for "Privacy"
  const toggleNoise = () => {
    if (isPlayingMusic) {
      oscillatorRef.current?.stop();
      audioCtxRef.current?.close();
      setIsPlayingMusic(false);
    } else {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      
      // Create buffer for noise
      const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5; // White noise
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;
      
      // Create a lowpass filter to make it "Brown" noise (soothing)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.5;
      
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noiseSource.start();
      oscillatorRef.current = noiseSource as any;
      setIsPlayingMusic(true);
    }
  };

  const getThemeColor = () => {
    switch(mode) {
      case AppMode.STUDENT: return 'bg-blue-500';
      case AppMode.WORK: return 'bg-slate-700';
      case AppMode.HOME: return 'bg-emerald-500';
      default: return 'bg-amber-500';
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-white">
      {/* Header / Mode Switcher */}
      <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-slate-100 z-10">
        <h2 className="font-bold text-lg">正在进行中...</h2>
        <div className="flex bg-slate-200 rounded-full p-1 text-xs">
          {(Object.values(AppMode) as AppMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-full transition-all ${
                mode === m ? 'bg-white shadow text-black font-medium' : 'text-slate-500'
              }`}
            >
              {m === AppMode.STUDENT ? '学生' : m === AppMode.WORK ? '职场' : '居家'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Timer Area */}
      <div className={`flex-1 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${isPlayingMusic ? 'bg-amber-50' : 'bg-white'}`}>
        {/* Background decoration */}
        <div className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl ${getThemeColor()} animate-pulse`}></div>
        
        <div className="z-10 text-center">
          <div className="text-8xl font-black text-slate-800 font-mono tracking-tighter mb-4">
            {formatTime(seconds)}
          </div>
          <p className="text-slate-400 animate-bounce">保持专注，顺其自然</p>
        </div>

        {/* Music Control */}
        <button 
          onClick={toggleNoise}
          className={`z-10 mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            isPlayingMusic 
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isPlayingMusic ? <Icons.Pause className="w-5 h-5" /> : <Icons.Play className="w-5 h-5" />}
          {isPlayingMusic ? "静心白噪音播放中" : "开启防尴尬白噪音"}
        </button>
      </div>

      {/* Entertainment Card */}
      <div className="px-6 py-6 bg-white z-10 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative min-h-[120px]">
            <div className="absolute top-2 right-2 text-slate-300">
                <Icons.Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {mode === 'student' ? '碎片知识' : mode === 'work' ? '职场鸡汤' : '生活趣闻'}
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm">
                {aiContent}
            </p>
            <button 
                onClick={loadContent}
                className="mt-3 text-xs text-blue-500 font-medium hover:underline"
            >
                换一条
            </button>
        </div>
      </div>

      {/* Finish Button */}
      <div className="p-6 pb-10 bg-white z-10">
        <button
          onClick={() => onFinish(seconds)}
          className="w-full bg-slate-900 text-white text-xl font-bold py-5 rounded-2xl shadow-xl shadow-slate-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
        >
          <Icons.Check className="w-6 h-6" />
          完成并记录
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
