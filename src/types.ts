export interface Course {
  id: string;
  name: string;
  code: string;
  duration: string;
  fee: number;
  description: string;
  category: 'Programming' | 'Diploma' | 'Accounting' | 'Basic';
}

export interface Student {
  id: string;
  name: string;
  mobile: string;
  parentName: string;
  parentMobile: string;
  address: string;
  admissionDate: string;
  courseId: string;
  courseName: string;
  batch: string;
  originalFee: number;
  scholarshipPercentage: number; // 0, 20, 50, 75, 100
  scholarshipAmount: number;
  finalFee: number;
  feePaid: number;
  remainingFee: number;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Pending' | 'Dropped';
  payments: PaymentRecord[];
  attendance: AttendanceRecord[];
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer';
  receiptNo: string;
  remarks?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  batch: string;
}

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  interestedCourse: string;
  enquiryDate: string;
  status: 'New' | 'Interested' | 'Follow-up' | 'Admission Completed' | 'Not Interested';
  notes: string;
  followUpDate: string;
}

export interface FeeReminder {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  mobile: string;
  amountDue: number;
  dueDate: string;
  templateType: 'First' | 'Second' | 'Custom';
  message: string;
  sentDate?: string;
  status: 'Pending' | 'Sent';
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'ai' | 'admin';
  text: string;
  timestamp: string;
  isQuickReply?: boolean;
}
