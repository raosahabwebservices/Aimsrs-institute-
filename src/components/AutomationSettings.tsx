import React, { useState } from 'react';
import { Workflow, Sparkles, CheckCircle2, ArrowDown, ToggleLeft, ToggleRight, MessageSquareCode, BellRing } from 'lucide-react';

export const AutomationSettings: React.FC = () => {
  const [enquiryBotActive, setEnquiryBotActive] = useState(true);
  const [feeReminderActive, setFeeReminderActive] = useState(true);
  const [autoFollowUpActive, setAutoFollowUpActive] = useState(true);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>No-Code Automation Builder</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              WhatsApp Automation Flows & Triggers
            </h2>
            <p className="text-blue-200/80 text-sm mt-1 max-w-2xl">
              Inspect and configure the autonomous WhatsApp workflows running 24/7 for Aimers Computer Institute.
            </p>
          </div>
        </div>
      </div>

      {/* Toggles Control Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">AI Enquiry Bot</h4>
            <p className="text-xs text-slate-500 mt-0.5">Auto-replies to student chats</p>
          </div>
          <button 
            onClick={() => setEnquiryBotActive(!enquiryBotActive)}
            className="text-emerald-600 focus:outline-none transition-transform hover:scale-110"
          >
            {enquiryBotActive ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-400" />}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Fee Dunning Automation</h4>
            <p className="text-xs text-slate-500 mt-0.5">Automated fee due alerts</p>
          </div>
          <button 
            onClick={() => setFeeReminderActive(!feeReminderActive)}
            className="text-emerald-600 focus:outline-none transition-transform hover:scale-110"
          >
            {feeReminderActive ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-400" />}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Follow-up Scheduler</h4>
            <p className="text-xs text-slate-500 mt-0.5">Lead nurture reminders</p>
          </div>
          <button 
            onClick={() => setAutoFollowUpActive(!autoFollowUpActive)}
            className="text-emerald-600 focus:outline-none transition-transform hover:scale-110"
          >
            {autoFollowUpActive ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-400" />}
          </button>
        </div>

      </div>

      {/* Visual Workflow 1: Admission Enquiry Flow */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <MessageSquareCode className="w-5 h-5 mr-2 text-emerald-600" /> Workflow 1: AI WhatsApp Admission Funnel
          </h3>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            {enquiryBotActive ? '🟢 Active & Running' : '🔴 Paused'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
          {[
            { step: '1', title: 'New WhatsApp Enquiry', desc: 'Student messages on institute WhatsApp' },
            { step: '2', title: 'AI Welcome & Course Info', desc: 'Instant reply with course catalog & fees' },
            { step: '3', title: 'Scholarship Explanation', desc: 'Explains 20%-100% scholarship options' },
            { step: '4', title: 'Lead Capture & Save', desc: 'Saves name, phone & course into CRM' },
            { step: '5', title: 'Admission Completed', desc: 'Counsellor confirms admission & receipt' },
          ].map((item, idx) => (
            <div key={item.step} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl relative flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-sm">
                  {item.step}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
              {idx < 4 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-emerald-600">
                  ➔
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Workflow 2: Fee Reminder Flow */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <BellRing className="w-5 h-5 mr-2 text-amber-600" /> Workflow 2: Automated Fee Dunning & Reminders
          </h3>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
            {feeReminderActive ? '🟢 Active & Running' : '🔴 Paused'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            { step: '1', title: 'Fee Due Date Check', desc: 'System identifies students with pending balance' },
            { step: '2', title: 'Template Generation', desc: 'Generates polite Hinglish parent reminder' },
            { step: '3', title: 'WhatsApp Click-to-Chat', desc: 'Counselor clicks to dispatch reminder instantly' },
            { step: '4', title: 'Payment & Receipt', desc: 'Updates remaining balance and issues receipt' },
          ].map((item) => (
            <div key={item.step} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-sm">
                {item.step}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
