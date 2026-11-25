import React, { useState } from 'react';
import { BarChart3, IndianRupee, Users, Award, FileText, Download, Sparkles } from 'lucide-react';
import { Student, Course, Lead } from '../types';

interface ReportsModuleProps {
  students: Student[];
  courses: Course[];
  leads: Lead[];
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ students, courses, leads }) => {
  const [reportType, setReportType] = useState<'financial' | 'scholarship' | 'courses' | 'leads'>('financial');

  const totalCollected = students.reduce((acc, s) => acc + s.feePaid, 0);
  const totalPending = students.reduce((acc, s) => acc + s.remainingFee, 0);
  const totalScholarship = students.reduce((acc, s) => acc + s.scholarshipAmount, 0);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Institute Performance Analytics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Comprehensive Reports & Analytics
            </h2>
            <p className="text-blue-200/80 text-sm mt-1 max-w-2xl">
              Instant financial collection, pending fee breakdowns, scholarship distribution, and course-wise student enrollment reports.
            </p>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        {[
          { id: 'financial', label: 'Financial & Collection', icon: IndianRupee },
          { id: 'scholarship', label: 'Scholarship Report', icon: Award },
          { id: 'courses', label: 'Course-wise Students', icon: Users },
          { id: 'leads', label: 'WhatsApp Enquiry Leads', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = reportType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        
        {reportType === 'financial' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-emerald-600" /> Financial & Collection Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                <p className="text-xs font-semibold text-emerald-800 uppercase">Total Collected Fee</p>
                <h4 className="text-3xl font-black text-emerald-700 mt-1">₹{totalCollected.toLocaleString()}</h4>
                <p className="text-xs text-emerald-600 mt-1">Received across {students.length} students</p>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl">
                <p className="text-xs font-semibold text-rose-800 uppercase">Total Pending Dues</p>
                <h4 className="text-3xl font-black text-rose-600 mt-1">₹{totalPending.toLocaleString()}</h4>
                <p className="text-xs text-rose-600 mt-1">Pending collection reminders ready</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl">
                <p className="text-xs font-semibold text-purple-800 uppercase">Scholarships Given</p>
                <h4 className="text-3xl font-black text-purple-700 mt-1">₹{totalScholarship.toLocaleString()}</h4>
                <p className="text-xs text-purple-600 mt-1">Institute financial aid</p>
              </div>
            </div>

            <div className="overflow-x-auto pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">Recent Fee Transactions</h4>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Course</th>
                    <th className="py-2.5 px-3">Receipt No</th>
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.flatMap(s => s.payments.map(p => ({ ...p, studentName: s.name, courseName: s.courseName }))).slice(0, 8).map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{tx.studentName}</td>
                      <td className="py-2.5 px-3 text-slate-600">{tx.courseName}</td>
                      <td className="py-2.5 px-3 font-mono text-xs">{tx.receiptNo}</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">{tx.paymentMethod}</span></td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-600">₹{tx.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'scholarship' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" /> Scholarship Distribution Report
            </h3>
            <p className="text-xs text-slate-500">Summary of scholarship percentages granted to Aimers students.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[20, 50, 75, 100].map((pct) => {
                const count = students.filter(s => s.scholarshipPercentage === pct).length;
                return (
                  <div key={pct} className="bg-purple-50/60 border border-purple-200 p-4 rounded-2xl text-center">
                    <p className="text-xs font-bold text-purple-900">{pct}% Scholarship</p>
                    <p className="text-3xl font-black text-purple-700 mt-2">{count}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Students Enrolled</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {reportType === 'courses' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" /> Course-wise Enrollment Report
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => {
                const enrolledCount = students.filter(s => s.courseId === course.id).length;
                return (
                  <div key={course.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{course.code}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1.5">{course.name}</h4>
                      <p className="text-xs text-slate-500">Fee: ₹{course.fee} • {course.duration}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-blue-600">{enrolledCount}</span>
                      <p className="text-[10px] text-slate-400">Students</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {reportType === 'leads' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-emerald-600" /> WhatsApp Enquiry Leads Report
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500">Total Enquiries</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{leads.length}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                <p className="text-xs text-emerald-800">Interested</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">{leads.filter(l => l.status === 'Interested').length}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
                <p className="text-xs text-amber-800">Follow-up</p>
                <p className="text-2xl font-black text-amber-700 mt-1">{leads.filter(l => l.status === 'Follow-up').length}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-center">
                <p className="text-xs text-blue-800">Converted</p>
                <p className="text-2xl font-black text-blue-700 mt-1">{leads.filter(l => l.status === 'Admission Completed').length}</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
