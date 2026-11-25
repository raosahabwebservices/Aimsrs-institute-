import React, { useState } from 'react';
import { BookOpen, Plus, Clock, IndianRupee, Trash2, Edit, X, Sparkles, Award } from 'lucide-react';
import { Course } from '../types';

interface CourseManagementProps {
  courses: Course[];
  onAddCourse: (course: Omit<Course, 'id'>) => void;
  onUpdateCourse: (id: string, course: Partial<Course>) => void;
  onDeleteCourse: (id: string) => void;
}

export const CourseManagement: React.FC<CourseManagementProps> = ({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    duration: string;
    fee: number;
    description: string;
    category: 'Programming' | 'Diploma' | 'Accounting' | 'Basic';
  }>({
    name: '',
    code: '',
    duration: '3 Months',
    fee: 5000,
    description: '',
    category: 'Programming'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedCourseId) {
      onUpdateCourse(selectedCourseId, formData);
      setIsEditing(false);
    } else {
      onAddCourse(formData);
    }
    setIsModalOpen(false);
    setFormData({
      name: '',
      code: '',
      duration: '3 Months',
      fee: 5000,
      description: '',
      category: 'Programming'
    });
  };

  const startEdit = (course: Course) => {
    setSelectedCourseId(course.id);
    setFormData({
      name: course.name,
      code: course.code,
      duration: course.duration,
      fee: course.fee,
      description: course.description,
      category: course.category
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" /> Course Catalog & Curriculum
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage professional computer courses, certifications, course durations, and tuition fees at Aimers Institute.
          </p>
        </div>

        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({
              name: '',
              code: '',
              duration: '3 Months',
              fee: 5000,
              description: '',
              category: 'Programming'
            });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  {course.code}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  {course.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {course.name}
              </h3>
              
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900">₹{course.fee.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2 pt-2">
                <button
                  onClick={() => startEdit(course)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-800 hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDeleteCourse(course.id)}
                  className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 text-xs font-semibold flex items-center justify-center transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? 'Edit Course Details' : 'Add New Professional Course'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Full Stack Web Development"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g. FSWD"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.fee}
                    onChange={(e) => setFormData({...formData, fee: Number(e.target.value)})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter detailed syllabus and skills covered..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30"
                >
                  {isEditing ? 'Update Course' : 'Save Course'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
