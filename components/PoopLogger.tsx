import React, { useState } from 'react';
import { PoopLog } from '../types';
import { BRISTOL_SCALE, Icons } from '../constants';
import { analyzePoopHealth } from '../services/geminiService';

interface PoopLoggerProps {
  initialDuration: number;
  onSave: (log: PoopLog) => void;
  onCancel: () => void;
}

const PoopLogger: React.FC<PoopLoggerProps> = ({ initialDuration, onSave, onCancel }) => {
  const [bristol, setBristol] = useState(4);
  const [color, setColor] = useState("#8B4513");
  const [notes, setNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzePoopHealth(bristol, color, initialDuration, notes);
    setAiResult(result);
    setIsAnalyzing(false);
  };

  const handleSave = () => {
    const log: PoopLog = {
      id: Date.now().toString(),
      startTime: Date.now() - initialDuration * 1000,
      endTime: Date.now(),
      durationSeconds: initialDuration,
      bristolType: bristol,
      color,
      notes,
      aiAnalysis: aiResult,
      date: new Date().toISOString()
    };
    onSave(log);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full">
           <Icons.X className="w-6 h-6 text-slate-400" />
        </button>
        <h2 className="font-bold text-lg">便便记录</h2>
        <button onClick={handleSave} className="text-blue-600 font-bold text-sm px-2">
            保存
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Stats Summary */}
        <div className="flex items-center justify-center gap-2 text-slate-500">
            <Icons.Timer className="w-5 h-5" />
            <span className="font-mono text-xl font-bold text-slate-800">{Math.floor(initialDuration / 60)}分 {initialDuration % 60}秒</span>
        </div>

        {/* Bristol Scale Selector */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">形状 (布里斯托分类)</label>
          <div className="space-y-3">
            {BRISTOL_SCALE.map((item) => (
              <button
                key={item.type}
                onClick={() => setBristol(item.type)}
                className={`w-full p-3 rounded-xl border-2 flex items-center gap-4 transition-all ${
                  bristol === item.type 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-white bg-white hover:border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex-shrink-0 ${item.color} shadow-sm`}></div>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
                {bristol === item.type && <Icons.Check className="ml-auto text-amber-600 w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">颜色</label>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {["#8B4513", "#654321", "#D2691E", "#556B2F", "#800000", "#000000", "#F0E68C"].map(c => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded-full flex-shrink-0 border-2 ${color === c ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
        </div>

        {/* Notes */}
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">随笔 / 饮食记录</label>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="今天吃了什么？拉屎的时候想到了什么？"
                className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 resize-none"
            />
        </div>

        {/* AI Analysis */}
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                    <Icons.Sparkles className="w-4 h-4" /> 健康助手分析
                </h3>
                {!aiResult && (
                    <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold disabled:opacity-50"
                    >
                        {isAnalyzing ? '分析中...' : '生成分析'}
                    </button>
                )}
            </div>
            {aiResult ? (
                <p className="text-sm text-blue-900 leading-relaxed animate-fade-in">
                    {aiResult}
                </p>
            ) : (
                <p className="text-xs text-blue-400 italic">
                    点击按钮，让AI根据形状和颜色分析你的肠胃健康状况。
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default PoopLogger;
