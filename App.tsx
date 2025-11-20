import React, { useState, useEffect } from 'react';
import { ViewState, AppMode, PoopLog } from './types';
import { Icons } from './constants';
import ActiveSession from './components/ActiveSession';
import PoopLogger from './components/PoopLogger';
import StatsView from './components/StatsView';
import SocialView from './components/SocialView';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);
  const [logs, setLogs] = useState<PoopLog[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    const savedLogs = localStorage.getItem('poopLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleFinishSession = (duration: number) => {
    setSessionDuration(duration);
    setViewState(ViewState.LOGGING);
  };

  const handleSaveLog = (log: PoopLog) => {
    const newLogs = [...logs, log];
    setLogs(newLogs);
    localStorage.setItem('poopLogs', JSON.stringify(newLogs));
    setViewState(ViewState.STATS);
  };

  // Navigation Bar Component
  const NavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex justify-around items-center px-4 z-50 pb-safe">
      <button 
        onClick={() => setViewState(ViewState.IDLE)}
        className={`flex flex-col items-center gap-1 p-2 ${viewState === ViewState.IDLE ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <Icons.Poop className="w-6 h-6" />
        <span className="text-[10px] font-medium">开始</span>
      </button>
      <button 
        onClick={() => setViewState(ViewState.STATS)}
        className={`flex flex-col items-center gap-1 p-2 ${viewState === ViewState.STATS ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <Icons.Chart className="w-6 h-6" />
        <span className="text-[10px] font-medium">记录</span>
      </button>
      <button 
        onClick={() => setViewState(ViewState.SOCIAL)}
        className={`flex flex-col items-center gap-1 p-2 ${viewState === ViewState.SOCIAL ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <Icons.Message className="w-6 h-6" />
        <span className="text-[10px] font-medium">八卦</span>
      </button>
      <button 
        onClick={() => alert("模拟：附近的五星级厕所已为您导航...")}
        className={`flex flex-col items-center gap-1 p-2 ${viewState === ViewState.MAP ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <Icons.Map className="w-6 h-6" />
        <span className="text-[10px] font-medium">找坑</span>
      </button>
    </div>
  );

  // Render Main Content
  const renderContent = () => {
    switch (viewState) {
      case ViewState.ACTIVE:
        return (
          <ActiveSession 
            mode={mode} 
            onFinish={handleFinishSession} 
            setMode={setMode}
          />
        );
      case ViewState.LOGGING:
        return (
          <PoopLogger 
            initialDuration={sessionDuration}
            onSave={handleSaveLog}
            onCancel={() => setViewState(ViewState.IDLE)}
          />
        );
      case ViewState.STATS:
        return <StatsView logs={logs} />;
      case ViewState.SOCIAL:
        return <SocialView />;
      case ViewState.IDLE:
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center bg-slate-50 p-6 pb-20">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-black text-slate-900 mb-2">拉屎找我</h1>
                <p className="text-slate-500">全方位接管你的如厕时刻</p>
            </div>
            
            <button
              onClick={() => setViewState(ViewState.ACTIVE)}
              className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-xl shadow-amber-200 flex flex-col items-center justify-center text-white active:scale-95 transition-transform duration-200 group"
            >
              <Icons.Poop className="w-16 h-16 mb-2 group-hover:animate-bounce" />
              <span className="text-2xl font-bold">我要拉屎</span>
            </button>

            <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <span className="text-2xl font-bold text-slate-800 mb-1">{logs.length}</span>
                    <span className="text-xs text-slate-400">累计次数</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <span className="text-2xl font-bold text-slate-800 mb-1">
                        {logs.length > 0 ? Math.round(logs.reduce((a,b) => a + b.durationSeconds, 0) / logs.length / 60) : 0}m
                    </span>
                    <span className="text-xs text-slate-400">平均时长</span>
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {renderContent()}
      {viewState !== ViewState.ACTIVE && viewState !== ViewState.LOGGING && <NavBar />}
    </div>
  );
};

export default App;
