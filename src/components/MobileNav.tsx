import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquareCode, 
  Menu,
  CreditCard,
  UserPlus
} from 'lucide-react';

interface MobileNavProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  onOpenDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeModule, setActiveModule, onOpenDrawer }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'ai-assistant', label: 'AI Bot', icon: MessageSquareCode, highlight: true },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'leads', label: 'Leads', icon: UserPlus },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50 shadow-2xl">
      <div className="grid grid-cols-7 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
                isActive
                  ? 'text-blue-400 font-bold'
                  : tab.highlight
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-600/20 text-blue-400' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight truncate max-w-[48px]">{tab.label}</span>
            </button>
          );
        })}

        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-slate-200"
        >
          <div className="p-1 rounded-lg bg-slate-800">
            <Menu className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] tracking-tight">More</span>
        </button>
      </div>
    </div>
  );
};
