import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Award, 
  Calendar, 
  Eye, 
  Trash2, 
  Edit, 
  X, 
  CheckCircle2, 
  Clock,
  IndianRupee,
  BookOpen
} from 'lucide-react';
import { Student, Course } from '../types';

interface StudentManagementProps {
  students: Student[];
  courses: Course[];
  onAddStudent: (student: Omit<Student, 'id' | 'payments' | 'attendance'>) => void;
  onUpdateStudent: (id: string, student: Partial<Student>) => void;
  onDeleteStudent: (id: string) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  courses,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  isAddModalOpen,
  setIsAddModalOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [pendingFilter, setPendingFilter] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for Add/Edit student
  const [formData, setFormData] = useState<{
    name: string;
    mobile: string;
    parentName: string;
    parentMobile: string;
    address: string;
    admissionDate: string;
    courseId: string;
    batch: string;
    originalFee: number;
    scholarshipPercentage: number;
    feePaid: number;
    dueDate: string;
    status: 'Active' | 'Completed' | 'Pending' | 'Dropped';
  }>({
    name: '',
    mobile: '',
    parentName: '',
    parentMobile: '',
    address: '',
    admissionDate: new Date().toISOString().split('T')[0],
    courseId: courses[0]?.id || '',
    batch: 'Morning (8:00 AM)',
    originalFee: courses[0]?.fee || 5000,
    scholarshipPercentage: 20,
    feePaid: 0,
    dueDate: '2026-03-30',
    status: 'Active'
  });

  const handleCourseChange = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    const fee = course ? course.fee : 5000;
    setFormData(prev => ({
      ...prev,
      courseId,
      originalFee: fee
    }));
  };

  // Calculate scholarship & final fee
  const calculatedDiscount = (formData.originalFee * formData.scholarshipPercentage) / 100;
  const calculatedFinalFee = formData.originalFee - calculatedDiscount;
  const calculatedRemaining = Math.max(0, calculatedFinalFee - formData.feePaid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find(c => c.id === formData.courseId);
    
    if (isEditing && selectedStudent) {
      onUpdateStudent(selectedStudent.id, {
        ...formData,
        courseName: course ? course.name : 'General Course',
        scholarshipAmount: calculatedDiscount,
        finalFee: calculatedFinalFee,
        remainingFee: calculatedRemaining
      });
      setIsEditing(false);
    } else {
      onAddStudent({
        ...formData,
        courseName: course ? course.name : 'General Course',
        scholarshipAmount: calculatedDiscount,
        finalFee: calculatedFinalFee,
        remainingFee: calculatedRemaining,
        feePaid: Number(formData.feePaid)
      });
    }

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      mobile: '',
      parentName: '',
      parentMobile: '',
      address: '',
      admissionDate: new Date().toISOString().split('T')[0],
      courseId: courses[0]?.id || '',
      batch: 'Morning (8:00 AM)',
      originalFee: courses[0]?.fee || 5000,
      scholarshipPercentage: 20,
      feePaid: 0,
      dueDate: '2026-03-30',
      status: 'Active'
    });
  };

  const startEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      mobile: student.mobile,
      parentName: student.parentName,
      parentMobile: student.parentMobile,
      address: student.address,
      admissionDate: student.admissionDate,
      courseId: student.courseId,
      batch: student.batch,
      originalFee: student.originalFee,
      scholarshipPercentage: student.scholarshipPercentage,
      feePaid: student.feePaid,
      dueDate: student.dueDate,
      status: student.status
    });
    setIsEditing(true);
    setIsAddModalOpen(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobile.includes(searchQuery) ||
      student.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = courseFilter === 'ALL' || student.courseId === courseFilter;
    const matchesPending = pendingFilter ? student.remainingFee > 0 : true;

    return matchesSearch && matchesCourse && matchesPending;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Top Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" /> Student Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage admissions, batch details, scholarship discounts, and fee statuses for Aimers Institute.
          </p>
        </div>

        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({
              name: '',
              mobile: '',
              parentName: '',
              parentMobile: '',
              address: '',
              admissionDate: new Date().toISOString().split('T')[0],
              courseId: courses[0]?.id || '',
              batch: 'Morning (8:00 AM)',
              originalFee: courses[0]?.fee || 5000,
              scholarshipPercentage: 20,
              feePaid: 0,
              dueDate: '2026-03-30',
              status: 'Active'
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search student name, mobile, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
          >
            <option value="ALL">All Courses ({courses.length})</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 w-full justify-center">
            <input
              type="checkbox"
              checked={pendingFilter}
              onChange={(e) => setPendingFilter(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="text-xs font-semibold text-slate-700">Filter Pending Fees Only</span>
          </label>
        </div>
      </div>

      {/* Student List Table / Cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student & Contact</th>
                <th className="py-3.5 px-4">Course & Batch</th>
                <th className="py-3.5 px-4">Scholarship</th>
                <th className="py-3.5 px-4">Fee Details</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
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
                      <p className="text-xs text-blue-600 font-medium">{student.batch}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                        <Award className="w-3 h-3 mr-1" /> {student.scholarshipPercentage}% Off
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Saved ₹{student.scholarshipAmount.toLocaleString()}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">Final: ₹{student.finalFee.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-[11px] text-emerald-600 font-medium">Paid: ₹{student.feePaid}</span>
                        {student.remainingFee > 0 && (
                          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                            Due: ₹{student.remainingFee}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        student.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <a
                          href={`https://wa.me/91${student.mobile}?text=${encodeURIComponent(`Namaste ${student.name} ji, Aimers Computer Institute se aapka swagat hai. Kisi bhi query ke liye sampark karein.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-colors"
                          title="WhatsApp Contact"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => startEdit(student)}
                          className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteStudent(student.id)}
                          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? 'Edit Student Details' : 'Register New Student Admission'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Aman Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="e.g. 9882341122"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.parentMobile}
                    onChange={(e) => setFormData({...formData, parentMobile: e.target.value})}
                    placeholder="e.g. 9882341100"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Course *</label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name} (₹{c.fee})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Timing *</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({...formData, batch: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
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
              </div>

              {/* Automatic Scholarship Calculation Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase">Scholarship & Fee Calculator</span>
                  <Award className="w-4 h-4 text-blue-600" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Original Course Fee (₹)</label>
                    <input
                      type="number"
                      value={formData.originalFee}
                      onChange={(e) => setFormData({...formData, originalFee: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Scholarship Percentage (%)</label>
                    <select
                      value={formData.scholarshipPercentage}
                      onChange={(e) => setFormData({...formData, scholarshipPercentage: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-blue-700"
                    >
                      <option value={0}>0% (No Scholarship)</option>
                      <option value={20}>20% Scholarship</option>
                      <option value={50}>50% Scholarship</option>
                      <option value={75}>75% Scholarship</option>
                      <option value={100}>100% Scholarship (Free)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-200/60 text-center">
                  <div className="bg-white p-2 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500 font-medium">Discount</p>
                    <p className="text-sm font-bold text-purple-700">₹{calculatedDiscount.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500 font-medium">Final Payable</p>
                    <p className="text-sm font-bold text-blue-700">₹{calculatedFinalFee.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500 font-medium">Remaining Due</p>
                    <p className="text-sm font-bold text-rose-600">₹{calculatedRemaining.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Fee Paid (₹)</label>
                  <input
                    type="number"
                    value={formData.feePaid}
                    onChange={(e) => setFormData({...formData, feePaid: Number(e.target.value)})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admission Date</label>
                  <input
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => setFormData({...formData, admissionDate: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Address / Location</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="e.g. Mohanganj, Raebareli"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30"
                >
                  {isEditing ? 'Update Student' : 'Save Admission'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Student Profile & History Modal */}
      {selectedStudent && !isEditing && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-lg">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">{selectedStudent.name}</h3>
                  <p className="text-xs text-blue-200">{selectedStudent.courseName} • {selectedStudent.batch}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Contact & Personal details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Mobile</p>
                  <p className="text-xs font-bold text-slate-800 flex items-center mt-0.5">
                    <Phone className="w-3 h-3 mr-1 text-emerald-600" /> {selectedStudent.mobile}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Parent Name</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedStudent.parentName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Parent Mobile</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedStudent.parentMobile || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Admission Date</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedStudent.admissionDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Address</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedStudent.address}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {selectedStudent.status}
                  </span>
                </div>
              </div>

              {/* Fee Financial Breakdown */}
              <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-blue-900 uppercase mb-3 flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1 text-blue-600" /> Financial Summary
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500">Original Fee</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">₹{selectedStudent.originalFee.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500">Scholarship ({selectedStudent.scholarshipPercentage}%)</p>
                    <p className="text-sm font-bold text-purple-700 mt-0.5">-₹{selectedStudent.scholarshipAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500">Fee Paid</p>
                    <p className="text-sm font-bold text-emerald-600 mt-0.5">₹{selectedStudent.feePaid.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-xs">
                    <p className="text-[10px] text-slate-500">Remaining Due</p>
                    <p className="text-sm font-bold text-rose-600 mt-0.5">₹{selectedStudent.remainingFee.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-blue-600" /> Payment History ({selectedStudent.payments.length})
                </h4>
                {selectedStudent.payments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">No payments recorded yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedStudent.payments.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <div>
                          <span className="font-bold text-slate-900">Receipt: {p.receiptNo}</span>
                          <p className="text-slate-500 text-[11px]">Method: {p.paymentMethod} • Date: {p.date}</p>
                        </div>
                        <span className="font-extrabold text-emerald-600 text-sm">₹{p.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attendance History */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-2 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> Attendance History ({selectedStudent.attendance.length})
                </h4>
                {selectedStudent.attendance.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">No attendance logs yet.</p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedStudent.attendance.map((a) => (
                      <div key={a.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <span className="font-semibold text-slate-800">{a.date}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/91${selectedStudent.mobile}?text=${encodeURIComponent(`Namaste ${selectedStudent.name} ji, Aimers Computer Institute se aapka swagat hai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Student</span>
                </a>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Close Profile
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
