import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Award, 
  CreditCard, 
  MessageSquareCode, 
  BellRing, 
  Workflow, 
  UserPlus, 
  CalendarCheck, 
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  pendingCount: number;
  leadCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, pendingCount, leadCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'courses', label: 'Course Catalog', icon: BookOpen },
    { id: 'scholarship', label: 'Scholarship System', icon: Award },
    { id: 'fees', label: 'Fee & Receipts', icon: CreditCard },
    { id: 'ai-assistant', label: 'AI WhatsApp Assistant', icon: MessageSquareCode, highlight: true },
    { id: 'reminders', label: 'WhatsApp Fee Reminder', icon: BellRing, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'automation', label: 'Automation Flows', icon: Workflow },
    { id: 'leads', label: 'Enquiry & Leads', icon: UserPlus, badge: leadCount > 0 ? leadCount : null },
    { id: 'attendance', label: 'Attendance Tracking', icon: CalendarCheck },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col shrink-0 min-h-[calc(100vh-4.5rem)] sticky top-18">
      <div className="p-4 flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Institute Management
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : item.highlight
                  ? 'bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/50'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400 group-hover:text-blue-400'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-15 text-white' : 'text-slate-500'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Card in Sidebar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="bg-gradient-to-br from-blue-950 to-indigo-950 border border-blue-800/60 rounded-xl p-3 text-xs text-blue-200">
          <div className="flex items-center space-x-2 font-semibold text-white mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Automation Active</span>
          </div>
          <p className="text-[11px] text-blue-300/80 leading-relaxed">
            WhatsApp Bot & Reminders running on Aimers secure server.
          </p>
        </div>
      </div>
    </aside>
  );
};
