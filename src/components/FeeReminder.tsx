import React, { useState } from 'react';
import { BellRing, Phone, Send, CheckCircle2, Clock, Sparkles, X, AlertCircle } from 'lucide-react';
import { Student, FeeReminder } from '../types';

interface FeeReminderProps {
  students: Student[];
  reminders: FeeReminder[];
  onMarkReminderSent: (id: string) => void;
}

export const FeeReminderModule: React.FC<FeeReminderProps> = ({ students, reminders, onMarkReminderSent }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students.find(s => s.remainingFee > 0)?.id || '');
  const [templateType, setTemplateType] = useState<'First' | 'Second'>('First');
  const [customMsg, setCustomMsg] = useState('');

  const pendingStudents = students.filter(s => s.remainingFee > 0);
  const activeStudent = students.find(s => s.id === selectedStudentId) || pendingStudents[0];

  const parentName = activeStudent?.parentName || activeStudent?.name || 'Guardian';
  const studentName = activeStudent?.name || 'Student';
  const amountDue = activeStudent?.remainingFee || 0;

  const firstTemplate = `Namaste ${parentName} ji, ${studentName} ki Aimers Computer Institute mein course fee ka ₹${amountDue} pending hai. Kripya fees jama karne ke liye samay nikalein. Kisi bhi jankari ke liye institute se sampark karein. Dhanyavaad.`;
  const secondTemplate = `Namaste, ${studentName} ki remaining course fee ₹${amountDue} pending hai. Aapki suvidha ke liye urgent payment reminder bheja gaya hai. Aimers Computer Institute, Mohanganj.`;

  const currentMessage = templateType === 'First' ? firstTemplate : secondTemplate;

  const whatsappUrl = activeStudent 
    ? `https://wa.me/91${activeStudent.mobile}?text=${encodeURIComponent(currentMessage)}`
    : '#';

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-amber-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Automated Collection Dunning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              WhatsApp Fee Reminder Automation
            </h2>
            <p className="text-amber-200/80 text-sm mt-1 max-w-2xl">
              Identify pending fee students instantly and send personalized polite WhatsApp reminders in Hindi/English with click-to-chat links.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 text-center">
            <p className="text-xs text-amber-200 font-medium">Pending Dues Count</p>
            <p className="text-2xl font-black text-amber-300 mt-1">{pendingStudents.length} Students</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Reminder Generator Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <BellRing className="w-5 h-5 mr-2 text-amber-600" /> Generate WhatsApp Reminder
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Student with Pending Fee *</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
            >
              {pendingStudents.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} - Due: ₹{s.remainingFee} ({s.courseName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Template *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTemplateType('First')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  templateType === 'First'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                First Polite Reminder
              </button>
              <button
                type="button"
                onClick={() => setTemplateType('Second')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  templateType === 'Second'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Second Urgent Reminder
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Message Preview</label>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed italic">
              "{currentMessage}"
            </div>
          </div>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-[1.01] active:scale-98"
            >
              <Phone className="w-4 h-4" />
              <span>Open WhatsApp & Send Reminder</span>
            </a>
          </div>
        </div>

        {/* Pending Fee Students & History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-rose-600" /> Pending Fee Dues ({pendingStudents.length})
          </h3>
          <p className="text-xs text-slate-500">
            Click chat to directly open pre-filled WhatsApp reminders.
          </p>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {pendingStudents.map((student) => {
              const msg = `Namaste ${student.parentName || student.name} ji, Aimers Computer Institute se ${student.name} ki course fee ka ₹${student.remainingFee} pending hai. Kripya samay par jama karein.`;
              return (
                <div key={student.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                      <p className="text-xs text-slate-500">{student.courseName} • Due: <span className="font-semibold text-rose-600">{student.dueDate}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="font-black text-rose-600 text-sm">₹{student.remainingFee.toLocaleString()}</span>
                    </div>
                    <a
                      href={`https://wa.me/91${student.mobile}?text=${encodeURIComponent(msg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-transform hover:scale-105"
                      title="Send WhatsApp Reminder"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
