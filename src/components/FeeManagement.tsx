import React, { useState } from 'react';
import { 
  CreditCard, 
  IndianRupee, 
  Plus, 
  Printer, 
  Search, 
  CheckCircle2, 
  Clock, 
  X, 
  FileText,
  AlertCircle,
  Phone,
  Calendar,
  Filter
} from 'lucide-react';
import { Student, PaymentRecord } from '../types';

interface FeeManagementProps {
  students: Student[];
  onRecordPayment: (studentId: string, payment: Omit<PaymentRecord, 'id'>) => void;
}

export const FeeManagement: React.FC<FeeManagementProps> = ({ students, onRecordPayment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PARTIAL' | 'PENDING'>('ALL');
  const [selectedStudentForPayment, setSelectedStudentForPayment] = useState<Student | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<{ student: Student; payment: PaymentRecord } | null>(null);

  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState<number>(1000);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('UPI');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [remarks, setRemarks] = useState('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForPayment) return;

    const receiptNo = `AIM/2026/${Math.floor(100 + Math.random() * 900)}`;
    onRecordPayment(selectedStudentForPayment.id, {
      date: paymentDate,
      amount: Number(paymentAmount),
      paymentMethod,
      receiptNo,
      remarks
    });

    setSelectedStudentForPayment(null);
    setPaymentAmount(1000);
    setRemarks('');
  };

  const handlePrint = () => {
    window.print();
  };

  // Financial totals & counts
  const totalPayable = students.reduce((acc, s) => acc + s.finalFee, 0);
  const totalPaid = students.reduce((acc, s) => acc + s.feePaid, 0);
  const totalPending = students.reduce((acc, s) => acc + s.remainingFee, 0);

  const fullyPaidCount = students.filter(s => s.remainingFee === 0).length;
  const partialCount = students.filter(s => s.feePaid > 0 && s.remainingFee > 0).length;
  const pendingCount = students.filter(s => s.feePaid === 0).length;

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobile.includes(searchQuery) ||
      student.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'PAID') return matchesSearch && student.remainingFee === 0;
    if (statusFilter === 'PARTIAL') return matchesSearch && student.feePaid > 0 && student.remainingFee > 0;
    if (statusFilter === 'PENDING') return matchesSearch && student.feePaid === 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-emerald-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fees Collection & Due Tracking</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Fee Management & Payment Status
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-2xl">
              Track student payment categories with visual status badges, due dates, and instant payment recording.
            </p>
          </div>
        </div>
      </div>

      {/* Top Count Summary Cards for Each Category */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Expected */}
        <div 
          onClick={() => setStatusFilter('ALL')}
          className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer ${statusFilter === 'ALL' ? 'ring-2 ring-blue-500 border-blue-200' : 'border-slate-100 hover:border-slate-200'}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Students</p>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">{students.length}</span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">₹{totalPayable.toLocaleString()}</p>
          <p className="text-xs text-blue-600 mt-0.5">Total Expected Payable</p>
        </div>

        {/* Fully Paid */}
        <div 
          onClick={() => setStatusFilter('PAID')}
          className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer ${statusFilter === 'PAID' ? 'ring-2 ring-emerald-500 border-emerald-200' : 'border-slate-100 hover:border-slate-200'}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-emerald-700 uppercase">Fully Paid</p>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> {fullyPaidCount}
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2">₹{totalPaid.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 mt-0.5 font-medium">No remaining balance</p>
        </div>

        {/* Partial Paid */}
        <div 
          onClick={() => setStatusFilter('PARTIAL')}
          className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer ${statusFilter === 'PARTIAL' ? 'ring-2 ring-amber-500 border-amber-200' : 'border-slate-100 hover:border-slate-200'}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-amber-700 uppercase">Partial Paid</p>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> {partialCount}
            </span>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">{partialCount} Students</p>
          <p className="text-xs text-amber-600 mt-0.5 font-medium">Installments active</p>
        </div>

        {/* Pending */}
        <div 
          onClick={() => setStatusFilter('PENDING')}
          className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer ${statusFilter === 'PENDING' ? 'ring-2 ring-rose-500 border-rose-200' : 'border-slate-100 hover:border-slate-200'}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-rose-700 uppercase">Pending Due</p>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> {pendingCount}
            </span>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">₹{totalPending.toLocaleString()}</p>
          <p className="text-xs text-rose-600 mt-0.5 font-medium">Zero fee paid yet</p>
        </div>

      </div>

      {/* Visual Payment Status Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search student name, mobile, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Visual Payment Status Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-400 flex items-center shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter Status:
            </span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'ALL' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({students.length})
            </button>
            <button
              onClick={() => setStatusFilter('PAID')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'PAID' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Fully Paid ({fullyPaidCount})
            </button>
            <button
              onClick={() => setStatusFilter('PARTIAL')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'PARTIAL' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Partial ({partialCount})
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'PENDING' 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Pending ({pendingCount})
            </button>
          </div>

        </div>
      </div>

      {/* Fee Due Tracking Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student & Contact</th>
                <th className="py-3.5 px-4">Course & Batch</th>
                <th className="py-3.5 px-4">Final Fee</th>
                <th className="py-3.5 px-4">Paid (Aayi)</th>
                <th className="py-3.5 px-4">Remaining Due</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Payment Status Badge</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No student fee records found matching filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isFullyPaid = student.remainingFee === 0;
                  const isPartial = student.feePaid > 0 && student.remainingFee > 0;
                  const isUnpaid = student.feePaid === 0;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-500 flex items-center mt-0.5">
                              <Phone className="w-3 h-3 mr-1 text-emerald-600" /> {student.mobile}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{student.courseName}</p>
                        <span className="text-xs text-blue-600 font-medium">{student.batch}</span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ₹{student.finalFee.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-emerald-600">
                        ₹{student.feePaid.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`font-black ${student.remainingFee > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                          ₹{student.remainingFee.toLocaleString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-1 text-slate-700 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{student.dueDate}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {isFullyPaid && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Fully Paid
                          </span>
                        )}
                        {isPartial && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3.5 h-3.5 mr-1" /> Partial
                          </span>
                        )}
                        {isUnpaid && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Pending
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        {student.remainingFee > 0 && (
                          <button
                            onClick={() => {
                              setSelectedStudentForPayment(student);
                              setPaymentAmount(student.remainingFee);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-transform hover:scale-105"
                          >
                            + Pay
                          </button>
                        )}
                        {student.payments.length > 0 && (
                          <button
                            onClick={() => setSelectedReceipt({ student, payment: student.payments[student.payments.length - 1] })}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded-xl text-xs font-semibold transition-colors"
                          >
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedStudentForPayment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">Record Fee Payment</h3>
              <button 
                onClick={() => setSelectedStudentForPayment(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500">Student Name</p>
                <p className="font-bold text-slate-900 text-sm">{selectedStudentForPayment.name}</p>
                <p className="text-xs text-blue-600 mt-0.5">{selectedStudentForPayment.courseName} • Due Date: {selectedStudentForPayment.dueDate}</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200 text-xs">
                  <span>Remaining Due:</span>
                  <span className="font-bold text-rose-600">₹{selectedStudentForPayment.remainingFee.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Amount (₹) *</label>
                <input
                  type="number"
                  required
                  max={selectedStudentForPayment.remainingFee}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method *</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Cash">Cash (Institute Counter)</option>
                  <option value="Bank Transfer">Bank Transfer / NEFT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Date *</label>
                <input
                  type="date"
                  required
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Remarks / Note</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Installment paid via UPI"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForPayment(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30"
                >
                  Save & Print Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Professional Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2" /> Official Fee Receipt
              </h3>
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Receipt Area */}
            <div id="receipt-print-area" className="p-8 space-y-6 bg-white text-slate-900">
              
              <div className="text-center border-b border-slate-200 pb-4">
                <h2 className="text-xl font-black text-blue-900 uppercase tracking-wide">Aimers Computer Institute</h2>
                <p className="text-xs text-slate-500 mt-0.5">Mohanganj, Raebareli Road, near Tehsil</p>
                <p className="text-xs text-slate-500">Contact: 8881341403 / 7704980122</p>
                <div className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold border border-blue-200">
                  FEES ACKNOWLEDGEMENT RECEIPT
                </div>
              </div>

              <div className="flex justify-between items-center text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500">Receipt No:</span>
                  <span className="font-bold text-slate-900 ml-1.5">{selectedReceipt.payment.receiptNo}</span>
                </div>
                <div>
                  <span className="text-slate-500">Date:</span>
                  <span className="font-bold text-slate-900 ml-1.5">{selectedReceipt.payment.date}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.student.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Course Enrolled:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.student.courseName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Batch Timing:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.student.batch}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Original Fee:</span>
                  <span className="font-bold text-slate-900">₹{selectedReceipt.student.originalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Scholarship Applied:</span>
                  <span className="font-bold text-purple-700">{selectedReceipt.student.scholarshipPercentage}% (-₹{selectedReceipt.student.scholarshipAmount.toLocaleString()})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Final Payable Fee:</span>
                  <span className="font-bold text-slate-900">₹{selectedReceipt.student.finalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 bg-emerald-50 px-2 rounded">
                  <span className="font-bold text-emerald-800">Amount Received Now:</span>
                  <span className="font-extrabold text-emerald-700 text-sm">₹{selectedReceipt.payment.amount.toLocaleString()} ({selectedReceipt.payment.paymentMethod})</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Remaining Balance Due:</span>
                  <span className="font-bold text-rose-600">₹{selectedReceipt.student.remainingFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs">
                <div>
                  <p className="text-slate-400 text-[10px]">Computer Generated Receipt</p>
                  <p className="font-bold text-slate-700 mt-1">Authorized Signature</p>
                </div>
                <div className="w-24 h-12 border-b border-dashed border-slate-400"></div>
              </div>

            </div>

            <div className="flex justify-end space-x-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
