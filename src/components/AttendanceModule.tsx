import React, { useState } from 'react';
import { CalendarCheck, Users, CheckCircle2, XCircle, Clock, Sparkles } from 'lucide-react';
import { Student, Course } from '../types';

interface AttendanceModuleProps {
  students: Student[];
  courses: Course[];
  onMarkAttendance: (studentId: string, status: 'Present' | 'Absent' | 'Late', batch: string) => void;
}

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({ students, courses, onMarkAttendance }) => {
  const [selectedBatch, setSelectedBatch] = useState('Morning (8:00 AM)');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [successMessage, setSuccessMessage] = useState('');

  const batchStudents = students.filter(s => s.status === 'Active');

  const handleMark = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    onMarkAttendance(studentId, status, selectedBatch);
    setSuccessMessage(`Attendance marked as ${status} successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Student Tracking</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Batch Attendance Management
            </h2>
            <p className="text-blue-200/80 text-sm mt-1 max-w-2xl">
              Mark and review batch-wise student attendance for Aimers Computer Institute.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Select Batch Timing *</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800"
          >
            <option value="Morning (8:00 AM)">Morning (8:00 AM)</option>
            <option value="Morning (9:30 AM)">Morning (9:30 AM)</option>
            <option value="Morning (10:30 AM)">Morning (10:30 AM)</option>
            <option value="Afternoon (1:00 PM)">Afternoon (1:00 PM)</option>
            <option value="Evening (3:00 PM)">Evening (3:00 PM)</option>
            <option value="Evening (4:00 PM)">Evening (4:00 PM)</option>
            <option value="Evening (5:00 PM)">Evening (5:00 PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Attendance Date *</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800"
          />
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Attendance List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center">
            <Users className="w-4 h-4 mr-2 text-blue-600" /> Active Students in {selectedBatch}
          </h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {batchStudents.length} Students
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {batchStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                  <p className="text-xs text-slate-500">{student.courseName} • <span className="text-emerald-600 font-medium">{student.mobile}</span></p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleMark(student.id, 'Present')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Present</span>
                </button>
                <button
                  onClick={() => handleMark(student.id, 'Absent')}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Absent</span>
                </button>
                <button
                  onClick={() => handleMark(student.id, 'Late')}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Late</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
