import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/StudentManagement';
import { CourseManagement } from './components/CourseManagement';
import { ScholarshipManagement } from './components/ScholarshipManagement';
import { FeeManagement } from './components/FeeManagement';
import { AiChatbot } from './components/AiChatbot';
import { FeeReminderModule } from './components/FeeReminder';
import { AutomationSettings } from './components/AutomationSettings';
import { LeadManagement } from './components/LeadManagement';
import { AttendanceModule } from './components/AttendanceModule';
import { ReportsModule } from './components/ReportsModule';

import { 
  INITIAL_COURSES, 
  INITIAL_STUDENTS, 
  INITIAL_LEADS, 
  INITIAL_REMINDERS, 
  INITIAL_CHAT_MESSAGES 
} from './data/initialData';
import { Course, Student, Lead, FeeReminder, PaymentRecord, ChatMessage } from './types';
import { X, GraduationCap, Phone, MapPin, Sparkles } from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  // Persistent state with localStorage
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('aimers_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('aimers_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('aimers_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [reminders, setReminders] = useState<FeeReminder[]>(() => {
    const saved = localStorage.getItem('aimers_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('aimers_chat');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('aimers_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('aimers_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('aimers_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('aimers_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('aimers_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Student CRUD
  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'payments' | 'attendance'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: `st-${Date.now()}`,
      payments: newStudentData.feePaid > 0 ? [{
        id: `p-${Date.now()}`,
        date: newStudentData.admissionDate,
        amount: newStudentData.feePaid,
        paymentMethod: 'UPI',
        receiptNo: `AIM/2026/${Math.floor(100 + Math.random() * 900)}`
      }] : [],
      attendance: []
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateStudent = (id: string, updatedFields: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  // Course CRUD
  const handleAddCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...courseData, id: `c-${Date.now()}` };
    setCourses(prev => [...prev, newCourse]);
  };

  const handleUpdateCourse = (id: string, updatedFields: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Delete this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  // Lead CRUD
  const handleAddLead = (leadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = { ...leadData, id: `l-${Date.now()}` };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLead = (id: string, updatedFields: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updatedFields } : l));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  // Payment Recording
  const handleRecordPayment = (studentId: string, paymentData: Omit<PaymentRecord, 'id'>) => {
    const newPayment: PaymentRecord = { ...paymentData, id: `p-${Date.now()}` };
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const newPaid = s.feePaid + newPayment.amount;
      const newRemaining = Math.max(0, s.finalFee - newPaid);
      return {
        ...s,
        feePaid: newPaid,
        remainingFee: newRemaining,
        payments: [...s.payments, newPayment]
      };
    }));
  };

  // Attendance Marking
  const handleMarkAttendance = (studentId: string, status: 'Present' | 'Absent' | 'Late', batch: string) => {
    const newAttendance = {
      id: `a-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status,
      batch
    };
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        attendance: [newAttendance, ...s.attendance]
      };
    }));
  };

  const pendingCount = students.filter(s => s.remainingFee > 0).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header activeModule={activeModule} setActiveModule={setActiveModule} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        
        {/* Desktop Sidebar */}
        <Sidebar 
          activeModule={activeModule} 
          setActiveModule={setActiveModule} 
          pendingCount={pendingCount}
          leadCount={leads.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeModule === 'dashboard' && (
            <Dashboard 
              students={students} 
              leads={leads} 
              reminders={reminders}
              setActiveModule={setActiveModule}
              onQuickAddStudent={() => {
                setActiveModule('students');
                setIsAddStudentModalOpen(true);
              }}
              onQuickAddEnquiry={() => setActiveModule('leads')}
            />
          )}

          {activeModule === 'students' && (
            <StudentManagement 
              students={students}
              courses={courses}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              isAddModalOpen={isAddStudentModalOpen}
              setIsAddModalOpen={setIsAddStudentModalOpen}
            />
          )}

          {activeModule === 'courses' && (
            <CourseManagement 
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          {activeModule === 'scholarship' && (
            <ScholarshipManagement students={students} />
          )}

          {activeModule === 'fees' && (
            <FeeManagement 
              students={students}
              onRecordPayment={handleRecordPayment}
            />
          )}

          {activeModule === 'ai-assistant' && (
            <AiChatbot 
              courses={courses}
              onAddLead={handleAddLead}
              initialMessages={chatMessages}
            />
          )}

          {activeModule === 'reminders' && (
            <FeeReminderModule 
              students={students}
              reminders={reminders}
              onMarkReminderSent={(id) => {
                setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'Sent' } : r));
              }}
            />
          )}

          {activeModule === 'automation' && (
            <AutomationSettings />
          )}

          {activeModule === 'leads' && (
            <LeadManagement 
              leads={leads}
              onAddLead={handleAddLead}
              onUpdateLead={handleUpdateLead}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeModule === 'attendance' && (
            <AttendanceModule 
              students={students}
              courses={courses}
              onMarkAttendance={handleMarkAttendance}
            />
          )}

          {activeModule === 'reports' && (
            <ReportsModule 
              students={students}
              courses={courses}
              leads={leads}
            />
          )}
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onOpenDrawer={() => setIsMobileDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-80 bg-slate-900 h-full p-5 flex flex-col justify-between border-l border-slate-800 shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  <span className="font-bold text-white text-sm">Aimers Institute</span>
                </div>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1.5">
                {[
                  { id: 'dashboard', label: 'Admin Dashboard' },
                  { id: 'students', label: 'Student Management' },
                  { id: 'courses', label: 'Course Catalog' },
                  { id: 'scholarship', label: 'Scholarship System' },
                  { id: 'fees', label: 'Fee & Receipts' },
                  { id: 'ai-assistant', label: 'AI WhatsApp Assistant' },
                  { id: 'reminders', label: 'WhatsApp Fee Reminder' },
                  { id: 'automation', label: 'Automation Flows' },
                  { id: 'leads', label: 'Enquiry & Leads' },
                  { id: 'attendance', label: 'Attendance Tracking' },
                  { id: 'reports', label: 'Financial Reports' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                      activeModule === item.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400">
              <p className="font-semibold text-white mb-1">Aimers Computer Institute</p>
              <p className="text-[11px]">Mohanganj, Raebareli Road</p>
              <p className="text-[11px] text-emerald-400 mt-1">📞 8881341403</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
