import React, { useState } from 'react';
import { Award, Calculator, IndianRupee, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Student } from '../types';

interface ScholarshipManagementProps {
  students: Student[];
}

export const ScholarshipManagement: React.FC<ScholarshipManagementProps> = ({ students }) => {
  // Calculator state
  const [calcFee, setCalcFee] = useState(10000);
  const [calcPercent, setCalcPercent] = useState(50);

  const discountAmount = (calcFee * calcPercent) / 100;
  const finalPayable = calcFee - discountAmount;

  const totalScholarshipGiven = students.reduce((acc, s) => acc + s.scholarshipAmount, 0);
  const studentsWithScholarship = students.filter(s => s.scholarshipPercentage > 0);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-xl border border-purple-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Merit & Financial Aid Program</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Scholarship Management System
            </h2>
            <p className="text-purple-200/80 text-sm mt-1 max-w-2xl">
              Providing 20%, 50%, 75%, and 100% scholarships to deserving students at Aimers Computer Institute, Mohanganj.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 text-center">
            <p className="text-xs text-purple-200 font-medium">Total Scholarship Given</p>
            <p className="text-2xl font-black text-amber-300 mt-1">₹{totalScholarshipGiven.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Scholarship Calculator */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-1 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-purple-600" /> Live Scholarship Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Test fee calculations with automatic discount and final payable computation.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Original Course Fee (₹)</label>
              <input
                type="number"
                value={calcFee}
                onChange={(e) => setCalcFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Scholarship Percentage</label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setCalcPercent(pct)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      calcPercent === pct
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Result Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Original Fee:</span>
                <span className="font-bold text-slate-900">₹{calcFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Scholarship ({calcPercent}%):</span>
                <span className="font-bold text-purple-700">-₹{discountAmount.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-purple-200 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900 uppercase">Final Payable:</span>
                <span className="text-lg font-black text-blue-700">₹{finalPayable.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Scholarships List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" /> Students Receiving Scholarships ({studentsWithScholarship.length})
            </h3>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Verified Records
            </span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {studentsWithScholarship.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                    <p className="text-xs text-slate-500">{student.courseName} • <span className="text-blue-600 font-medium">{student.mobile}</span></p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      {student.scholarshipPercentage}% Off
                    </span>
                    <p className="text-xs font-bold text-purple-700 mt-1">Saved: ₹{student.scholarshipAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-slate-400">Final Fee</p>
                    <p className="text-sm font-black text-slate-900">₹{student.finalFee.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
