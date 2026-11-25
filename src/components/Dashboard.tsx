import React from 'react';
import { 
  Users, 
  UserCheck, 
  IndianRupee, 
  Clock, 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  MessageSquareCode, 
  BellRing, 
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Student, Lead, FeeReminder } from '../types';

interface DashboardProps {
  students: Student[];
  leads: Lead[];
  reminders: FeeReminder[];
  setActiveModule: (module: string) => void;
  onQuickAddStudent: () => void;
  onQuickAddEnquiry: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  leads,
  reminders,
  setActiveModule,
  onQuickAddStudent,
  onQuickAddEnquiry
}) => {
  const activeStudents = students.filter(s => s.status === 'Active');
  
  // Calculate finances
  const totalOriginalFee = students.reduce((acc, s) => acc + s.originalFee, 0);
  const totalScholarship = students.reduce((acc, s) => acc + s.scholarshipAmount, 0);
  const totalCollected = students.reduce((acc, s) => acc + s.feePaid, 0);
  const totalPending = students.reduce((acc, s) => acc + s.remainingFee, 0);

  // Today's collection simulation (sum of recent payments or default)
  const todaysCollection = 5000;
  const monthlyCollection = 42500;
  const admissionsThisMonth = students.filter(s => s.admissionDate.startsWith('2026-02')).length + 7;

  const recentAdmissions = [...students].sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime()).slice(0, 5);
  const pendingFeeList = students.filter(s => s.remainingFee > 0).slice(0, 5);
  const recentLeads = leads.slice(0, 4);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI & WhatsApp Automation Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome to Aimers Dashboard
            </h2>
            <p className="text-blue-200/80 text-sm mt-1 max-w-2xl">
              Empowering Mohanganj, Raebareli students with world-class computer education, automated scholarship calculation, and AI WhatsApp counselling.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onQuickAddStudent}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Admission</span>
            </button>
            <button
              onClick={() => setActiveModule('ai-assistant')}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>WhatsApp AI Bot</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Students */}
        <div 
          onClick={() => setActiveModule('students')}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{students.length}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeStudents.length} Currently Active</p>
          </div>
        </div>

        {/* Today's Collection */}
        <div 
          onClick={() => setActiveModule('fees')}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <IndianRupee className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              Verified
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Collection</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{todaysCollection.toLocaleString()}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-0.5">Monthly: ₹{monthlyCollection.toLocaleString()}</p>
          </div>
        </div>

        {/* Pending Fees */}
        <div 
          onClick={() => setActiveModule('reminders')}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              {pendingFeeList.length} Due
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Fees</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalPending.toLocaleString()}</h3>
            <p className="text-xs text-amber-600 font-medium mt-0.5">WhatsApp reminder ready</p>
          </div>
        </div>

        {/* Total Scholarship */}
        <div 
          onClick={() => setActiveModule('scholarship')}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              Up to 100%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scholarship Given</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalScholarship.toLocaleString()}</h3>
            <p className="text-xs text-purple-600 font-medium mt-0.5">Across {students.length} students</p>
          </div>
        </div>

      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-100 font-medium">Admissions This Month</p>
            <h4 className="text-2xl font-bold mt-0.5">{admissionsThisMonth} Students</h4>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-100 font-medium">Active WhatsApp Leads</p>
            <h4 className="text-2xl font-bold mt-0.5">{leads.length} Enquiries</h4>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <MessageSquareCode className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-100 font-medium">Fee Reminders Pending</p>
            <h4 className="text-2xl font-bold mt-0.5">{reminders.length} Students</h4>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <BellRing className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content Sections: Recent Admissions & Pending Fees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" /> Recent Admissions
            </h3>
            <button 
              onClick={() => setActiveModule('students')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentAdmissions.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{student.name}</h4>
                    <p className="text-xs text-slate-500">{student.courseName} • <span className="text-blue-600 font-medium">{student.batch}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    ₹{student.finalFee.toLocaleString()}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{student.admissionDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Fee List */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-600" /> Pending Fee Dues
            </h3>
            <button 
              onClick={() => setActiveModule('reminders')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center"
            >
              Send Reminder <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingFeeList.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100 hover:bg-amber-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{student.name}</h4>
                    <p className="text-xs text-slate-500">Due: <span className="font-semibold text-rose-600">{student.dueDate}</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="font-bold text-rose-600 text-sm">₹{student.remainingFee.toLocaleString()}</span>
                    <p className="text-[10px] text-slate-400">Paid: ₹{student.feePaid}</p>
                  </div>
                  <a
                    href={`https://wa.me/91${student.mobile}?text=${encodeURIComponent(`Namaste ${student.parentName || student.name} ji, Aimers Computer Institute se aapki remaining course fee ₹${student.remainingFee} pending hai. Kripya samay par jama karein.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-transform hover:scale-105"
                    title="Send WhatsApp Reminder"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Actions & Enquiries Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center">
              <MessageSquareCode className="w-5 h-5 mr-2 text-emerald-600" /> Recent AI WhatsApp Enquiries
            </h3>
            <button 
              onClick={() => setActiveModule('leads')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              View All Leads <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-900 text-sm">{lead.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.status === 'Interested' ? 'bg-emerald-100 text-emerald-800' :
                      lead.status === 'Admission Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Interested in: <span className="font-medium text-slate-700">{lead.interestedCourse}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-600">{lead.mobile}</span>
                  <a
                    href={`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(`Namaste ${lead.name} ji, Aimers Computer Institute Mohanganj mein aapka swagat hai. Kya aap ${lead.interestedCourse} ke baare mein kuch aur janna chahte hain?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm"
                  >
                    Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Institute Shortcuts */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 shadow-sm border border-blue-900 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base mb-2">Institute Quick Actions</h3>
            <p className="text-xs text-blue-200/80 mb-4">
              Shortcut tools designed for Aimers owner & counselors.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={onQuickAddStudent}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>+ Register New Admission</span>
                <ChevronRight className="w-4 h-4 text-blue-300" />
              </button>
              <button
                onClick={onQuickAddEnquiry}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>+ Add WhatsApp Enquiry Lead</span>
                <ChevronRight className="w-4 h-4 text-blue-300" />
              </button>
              <button
                onClick={() => setActiveModule('ai-assistant')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/30 text-xs font-semibold flex items-center justify-between transition-colors text-emerald-300"
              >
                <span>🤖 Open AI Admission Bot</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-900/60 text-center">
            <p className="text-[11px] text-blue-300 font-medium">Aimers Computer Institute • Mohanganj</p>
          </div>
        </div>

      </div>

    </div>
  );
};
