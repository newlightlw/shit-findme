import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PoopLog } from '../types';
import { BRISTOL_SCALE } from '../constants';

interface StatsViewProps {
  logs: PoopLog[];
}

const StatsView: React.FC<StatsViewProps> = ({ logs }) => {
  const data = logs.slice(-7).map(log => ({
    date: new Date(log.date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
    duration: Math.round(log.durationSeconds / 60),
    type: log.bristolType
  }));

  return (
    <div className="h-full overflow-y-auto pb-20 bg-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">便便周报</h2>
        
        {logs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>暂无数据，去拉一泡吧！</p>
          </div>
        ) : (
          <>
             <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">时长趋势 (分钟)</h3>
                <div className="h-64 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                        />
                        <Bar dataKey="duration" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.duration > 20 ? '#ef4444' : '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">最近记录</h3>
                {logs.slice().reverse().map(log => (
                    <div key={log.id} className="bg-slate-50 p-4 rounded-xl flex gap-4 items-start border border-slate-100">
                         <div className={`w-2 h-12 rounded-full ${BRISTOL_SCALE.find(b => b.type === log.bristolType)?.color || 'bg-gray-400'}`}></div>
                         <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-slate-800">
                                    {new Date(log.date).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">{Math.floor(log.durationSeconds / 60)}m {log.durationSeconds % 60}s</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">Bristol 类型 {log.bristolType}</p>
                            {log.aiAnalysis && (
                                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                                    AI: {log.aiAnalysis}
                                </div>
                            )}
                         </div>
                    </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatsView;
