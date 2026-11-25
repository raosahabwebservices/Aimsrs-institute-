import React from 'react';
import { GraduationCap, Phone, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ setActiveModule }) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Institute Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveModule('dashboard')}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-blue-400/30">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                  Aimers Computer Institute
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 mr-1" /> AI Powered
                </span>
              </div>
              <p className="text-xs text-blue-300/80 font-medium">
                Learn Today... Build Tomorrow...
              </p>
            </div>
          </div>

          {/* Quick Info & Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Mohanganj, Raebareli Road (Near Tehsil)</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">8881341403 / 7704980122</span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveModule('ai-assistant')}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="font-semibold">AI WhatsApp Bot</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-slate-700">
              <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 font-bold text-sm">
                AD
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Admin Portal</p>
                <p className="text-[10px] text-emerald-400 flex items-center font-medium">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified Owner
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
