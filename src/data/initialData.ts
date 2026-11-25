import { Course, Student, Lead, FeeReminder, ChatMessage } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    name: 'O Level (NIELIT)',
    code: 'OLV',
    duration: '1 Year',
    fee: 18000,
    description: 'Comprehensive IT & software foundation course approved by NIELIT. Covers Python, IoT, Web Design, and IT Tools.',
    category: 'Diploma'
  },
  {
    id: 'c2',
    name: 'CCC (Course on Computer Concepts)',
    code: 'CCC',
    duration: '3 Months',
    fee: 3500,
    description: 'Basic computer literacy program covering Windows, MS Office, Internet, Digital Financial Services, and Email.',
    category: 'Basic'
  },
  {
    id: 'c3',
    name: 'Tally Prime with GST',
    code: 'TALLY',
    duration: '3 Months',
    fee: 4500,
    description: 'Professional financial accounting, inventory management, GST filing, TDS, payroll, and taxation.',
    category: 'Accounting'
  },
  {
    id: 'c4',
    name: 'DCA / ADCA (Diploma in Computer Applications)',
    code: 'DCA',
    duration: '6 Months / 1 Year',
    fee: 8500,
    description: 'Complete diploma covering advanced operating systems, Office automation, DTP (Photoshop, CorelDraw), and Tally.',
    category: 'Diploma'
  },
  {
    id: 'c5',
    name: 'Python Programming',
    code: 'PYT',
    duration: '4 Months',
    fee: 6000,
    description: 'Core and advanced Python programming, data structures, OOPs, file handling, and database connectivity.',
    category: 'Programming'
  },
  {
    id: 'c6',
    name: 'Java Development',
    code: 'JAVA',
    duration: '6 Months',
    fee: 9000,
    description: 'Object-oriented programming in Java, Swing, JDBC, Collections, and basic backend development.',
    category: 'Programming'
  },
  {
    id: 'c7',
    name: 'Web Designing & Development',
    code: 'WEB',
    duration: '6 Months',
    fee: 8000,
    description: 'HTML5, CSS3, JavaScript, Tailwind CSS, React basics, responsive layouts, and live website hosting.',
    category: 'Programming'
  },
  {
    id: 'c8',
    name: 'AI & Generative Tools Masterclass',
    code: 'AITC',
    duration: '3 Months',
    fee: 7000,
    description: 'Learn prompt engineering, generative AI tools, AI workflows, content creation, and automated office tasks.',
    category: 'Programming'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st-1',
    name: 'Aman Verma',
    mobile: '9882341122',
    parentName: 'Ramesh Verma',
    parentMobile: '9882341100',
    address: 'Mohanganj, Raebareli',
    admissionDate: '2026-01-10',
    courseId: 'c1',
    courseName: 'O Level (NIELIT)',
    batch: 'Morning (8:00 AM)',
    originalFee: 18000,
    scholarshipPercentage: 50,
    scholarshipAmount: 9000,
    finalFee: 9000,
    feePaid: 5000,
    remainingFee: 4000,
    dueDate: '2026-03-30',
    status: 'Active',
    payments: [
      { id: 'p1', date: '2026-01-10', amount: 3000, paymentMethod: 'UPI', receiptNo: 'AIM/2026/001' },
      { id: 'p2', date: '2026-02-10', amount: 2000, paymentMethod: 'Cash', receiptNo: 'AIM/2026/024' }
    ],
    attendance: [
      { id: 'a1', date: '2026-02-20', status: 'Present', batch: 'Morning (8:00 AM)' },
      { id: 'a2', date: '2026-02-21', status: 'Present', batch: 'Morning (8:00 AM)' }
    ]
  },
  {
    id: 'st-2',
    name: 'Priya Singh',
    mobile: '9771234455',
    parentName: 'Vikram Singh',
    parentMobile: '9771234400',
    address: 'Tehsil Road, Mohanganj',
    admissionDate: '2026-01-15',
    courseId: 'c3',
    courseName: 'Tally Prime with GST',
    batch: 'Evening (4:00 PM)',
    originalFee: 4500,
    scholarshipPercentage: 20,
    scholarshipAmount: 900,
    finalFee: 3600,
    feePaid: 3600,
    remainingFee: 0,
    dueDate: '2026-02-15',
    status: 'Active',
    payments: [
      { id: 'p3', date: '2026-01-15', amount: 3600, paymentMethod: 'UPI', receiptNo: 'AIM/2026/003' }
    ],
    attendance: [
      { id: 'a3', date: '2026-02-20', status: 'Present', batch: 'Evening (4:00 PM)' }
    ]
  },
  {
    id: 'st-3',
    name: 'Rahul Kumar',
    mobile: '9911223344',
    parentName: 'Suresh Kumar',
    parentMobile: '9911223300',
    address: 'Near Tehsil, Mohanganj',
    admissionDate: '2026-02-01',
    courseId: 'c5',
    courseName: 'Python Programming',
    batch: 'Afternoon (1:00 PM)',
    originalFee: 6000,
    scholarshipPercentage: 50,
    scholarshipAmount: 3000,
    finalFee: 3000,
    feePaid: 1000,
    remainingFee: 2000,
    dueDate: '2026-03-05',
    status: 'Active',
    payments: [
      { id: 'p4', date: '2026-02-01', amount: 1000, paymentMethod: 'Cash', receiptNo: 'AIM/2026/012' }
    ],
    attendance: []
  },
  {
    id: 'st-4',
    name: 'Anjali Maurya',
    mobile: '8833445566',
    parentName: 'Dinesh Maurya',
    parentMobile: '8833445500',
    address: 'Raebareli Road',
    admissionDate: '2026-01-05',
    courseId: 'c4',
    courseName: 'DCA / ADCA',
    batch: 'Morning (9:30 AM)',
    originalFee: 8500,
    scholarshipPercentage: 75,
    scholarshipAmount: 6375,
    finalFee: 2125,
    feePaid: 2125,
    remainingFee: 0,
    dueDate: '2026-02-05',
    status: 'Active',
    payments: [
      { id: 'p5', date: '2026-01-05', amount: 2125, paymentMethod: 'Bank Transfer', receiptNo: 'AIM/2026/002' }
    ],
    attendance: []
  },
  {
    id: 'st-5',
    name: 'Deepak Yadav',
    mobile: '9455667788',
    parentName: 'Rajendra Yadav',
    parentMobile: '9455667700',
    address: 'Mohanganj Market',
    admissionDate: '2025-11-10',
    courseId: 'c2',
    courseName: 'CCC',
    batch: 'Evening (5:00 PM)',
    originalFee: 3500,
    scholarshipPercentage: 20,
    scholarshipAmount: 700,
    finalFee: 2800,
    feePaid: 2800,
    remainingFee: 0,
    dueDate: '2025-12-10',
    status: 'Completed',
    payments: [
      { id: 'p6', date: '2025-11-10', amount: 2800, paymentMethod: 'UPI', receiptNo: 'AIM/2025/110' }
    ],
    attendance: []
  },
  {
    id: 'st-6',
    name: 'Shivani Tiwari',
    mobile: '9123456789',
    parentName: 'Manoj Tiwari',
    parentMobile: '9123456700',
    address: 'Station Road',
    admissionDate: '2026-02-05',
    courseId: 'c7',
    courseName: 'Web Designing & Development',
    batch: 'Morning (10:30 AM)',
    originalFee: 8000,
    scholarshipPercentage: 50,
    scholarshipAmount: 4000,
    finalFee: 4000,
    feePaid: 2000,
    remainingFee: 2000,
    dueDate: '2026-03-10',
    status: 'Active',
    payments: [
      { id: 'p7', date: '2026-02-05', amount: 2000, paymentMethod: 'UPI', receiptNo: 'AIM/2026/018' }
    ],
    attendance: []
  },
  {
    id: 'st-7',
    name: 'Sachin Patel',
    mobile: '9839001122',
    parentName: 'Ram Kripal Patel',
    parentMobile: '9839001100',
    address: 'Mohanganj Dehat',
    admissionDate: '2026-02-10',
    courseId: 'c8',
    courseName: 'AI & Generative Tools Masterclass',
    batch: 'Evening (3:00 PM)',
    originalFee: 7000,
    scholarshipPercentage: 100,
    scholarshipAmount: 7000,
    finalFee: 0,
    feePaid: 0,
    remainingFee: 0,
    dueDate: '2026-03-10',
    status: 'Active',
    payments: [],
    attendance: []
  },
  {
    id: 'st-8',
    name: 'Neha Gupta',
    mobile: '9792113344',
    parentName: 'Sanjay Gupta',
    parentMobile: '9792113300',
    address: 'Near Tehsil Gate',
    admissionDate: '2026-01-20',
    courseId: 'c6',
    courseName: 'Java Development',
    batch: 'Morning (8:00 AM)',
    originalFee: 9000,
    scholarshipPercentage: 20,
    scholarshipAmount: 1800,
    finalFee: 7200,
    feePaid: 4000,
    remainingFee: 3200,
    dueDate: '2026-03-01',
    status: 'Active',
    payments: [
      { id: 'p8', date: '2026-01-20', amount: 4000, paymentMethod: 'UPI', receiptNo: 'AIM/2026/009' }
    ],
    attendance: []
  },
  {
    id: 'st-9',
    name: 'Vikas Mishra',
    mobile: '9838112233',
    parentName: 'Radha Raman Mishra',
    parentMobile: '9838112200',
    address: 'Mohanganj',
    admissionDate: '2026-01-12',
    courseId: 'c1',
    courseName: 'O Level (NIELIT)',
    batch: 'Morning (8:00 AM)',
    originalFee: 18000,
    scholarshipPercentage: 50,
    scholarshipAmount: 9000,
    finalFee: 9000,
    feePaid: 4500,
    remainingFee: 4500,
    dueDate: '2026-03-15',
    status: 'Active',
    payments: [
      { id: 'p9', date: '2026-01-12', amount: 4500, paymentMethod: 'Cash', receiptNo: 'AIM/2026/005' }
    ],
    attendance: []
  },
  {
    id: 'st-10',
    name: 'Kajal Verma',
    mobile: '9451223344',
    parentName: 'Vinod Verma',
    parentMobile: '9451223300',
    address: 'Raebareli Road',
    admissionDate: '2026-02-02',
    courseId: 'c3',
    courseName: 'Tally Prime with GST',
    batch: 'Evening (4:00 PM)',
    originalFee: 4500,
    scholarshipPercentage: 50,
    scholarshipAmount: 2250,
    finalFee: 2250,
    feePaid: 1000,
    remainingFee: 1250,
    dueDate: '2026-03-02',
    status: 'Active',
    payments: [
      { id: 'p10', date: '2026-02-02', amount: 1000, paymentMethod: 'UPI', receiptNo: 'AIM/2026/014' }
    ],
    attendance: []
  },
  {
    id: 'st-11',
    name: 'Abhishek Shrivastava',
    mobile: '9170223344',
    parentName: 'Alok Shrivastava',
    parentMobile: '9170223300',
    address: 'Mohanganj',
    admissionDate: '2025-12-01',
    courseId: 'c4',
    courseName: 'DCA / ADCA',
    batch: 'Morning (9:30 AM)',
    originalFee: 8500,
    scholarshipPercentage: 20,
    scholarshipAmount: 1700,
    finalFee: 6800,
    feePaid: 6800,
    remainingFee: 0,
    dueDate: '2026-01-01',
    status: 'Completed',
    payments: [
      { id: 'p11', date: '2025-12-01', amount: 6800, paymentMethod: 'Cash', receiptNo: 'AIM/2025/102' }
    ],
    attendance: []
  },
  {
    id: 'st-12',
    name: 'Pooja Lodhi',
    mobile: '9935445566',
    parentName: 'Kishore Lodhi',
    parentMobile: '9935445500',
    address: 'Tehsil Road',
    admissionDate: '2026-02-08',
    courseId: 'c2',
    courseName: 'CCC',
    batch: 'Evening (5:00 PM)',
    originalFee: 3500,
    scholarshipPercentage: 50,
    scholarshipAmount: 1750,
    finalFee: 1750,
    feePaid: 750,
    remainingFee: 1000,
    dueDate: '2026-03-08',
    status: 'Active',
    payments: [
      { id: 'p12', date: '2026-02-08', amount: 750, paymentMethod: 'UPI', receiptNo: 'AIM/2026/020' }
    ],
    attendance: []
  },
  {
    id: 'st-13',
    name: 'Mohd. Zaid',
    mobile: '9889112233',
    parentName: 'Mohd. Saleem',
    parentMobile: '9889112200',
    address: 'Mohanganj Market',
    admissionDate: '2026-02-12',
    courseId: 'c5',
    courseName: 'Python Programming',
    batch: 'Afternoon (1:00 PM)',
    originalFee: 6000,
    scholarshipPercentage: 20,
    scholarshipAmount: 1200,
    finalFee: 4800,
    feePaid: 2000,
    remainingFee: 2800,
    dueDate: '2026-03-12',
    status: 'Active',
    payments: [
      { id: 'p13', date: '2026-02-12', amount: 2000, paymentMethod: 'UPI', receiptNo: 'AIM/2026/022' }
    ],
    attendance: []
  },
  {
    id: 'st-14',
    name: 'Sonam Sahu',
    mobile: '9450334455',
    parentName: 'Jagdish Sahu',
    parentMobile: '9450334400',
    address: 'Raebareli Road',
    admissionDate: '2026-01-25',
    courseId: 'c7',
    courseName: 'Web Designing & Development',
    batch: 'Morning (10:30 AM)',
    originalFee: 8000,
    scholarshipPercentage: 50,
    scholarshipAmount: 4000,
    finalFee: 4000,
    feePaid: 4000,
    remainingFee: 0,
    dueDate: '2026-02-25',
    status: 'Active',
    payments: [
      { id: 'p14', date: '2026-01-25', amount: 4000, paymentMethod: 'Cash', receiptNo: 'AIM/2026/011' }
    ],
    attendance: []
  },
  {
    id: 'st-15',
    name: 'Rohit Sharma',
    mobile: '9839445566',
    parentName: 'Subhash Sharma',
    parentMobile: '9839445500',
    address: 'Mohanganj',
    admissionDate: '2026-02-14',
    courseId: 'c8',
    courseName: 'AI & Generative Tools Masterclass',
    batch: 'Evening (3:00 PM)',
    originalFee: 7000,
    scholarshipPercentage: 20,
    scholarshipAmount: 1400,
    finalFee: 5600,
    feePaid: 2000,
    remainingFee: 3600,
    dueDate: '2026-03-14',
    status: 'Active',
    payments: [
      { id: 'p15', date: '2026-02-14', amount: 2000, paymentMethod: 'UPI', receiptNo: 'AIM/2026/025' }
    ],
    attendance: []
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Deepansh Bajpai',
    mobile: '9881992233',
    interestedCourse: 'AI & Generative Tools Masterclass',
    enquiryDate: '2026-02-21',
    status: 'Interested',
    notes: 'Asked about AI tools and scholarship. Very keen to join.',
    followUpDate: '2026-02-24'
  },
  {
    id: 'l2',
    name: 'Shreya Shukla',
    mobile: '9792883344',
    interestedCourse: 'O Level (NIELIT)',
    enquiryDate: '2026-02-20',
    status: 'Follow-up',
    notes: 'Parent wants to visit institute on Sunday for scholarship test.',
    followUpDate: '2026-02-23'
  },
  {
    id: 'l3',
    name: 'Ajay Kumar',
    mobile: '9452771122',
    interestedCourse: 'Tally Prime with GST',
    enquiryDate: '2026-02-19',
    status: 'New',
    notes: 'Inquired via WhatsApp bot about evening batch timings.',
    followUpDate: '2026-02-22'
  },
  {
    id: 'l4',
    name: 'Garima Singh',
    mobile: '9129334455',
    interestedCourse: 'Python Programming',
    enquiryDate: '2026-02-18',
    status: 'Interested',
    notes: 'Graduated B.Sc, wants Python for career transition.',
    followUpDate: '2026-02-22'
  },
  {
    id: 'l5',
    name: 'Manish Yadav',
    mobile: '9838445566',
    interestedCourse: 'DCA / ADCA',
    enquiryDate: '2026-02-17',
    status: 'Admission Completed',
    notes: 'Enrolled in DCA with 50% scholarship.',
    followUpDate: '2026-02-17'
  },
  {
    id: 'l6',
    name: 'Swati Verma',
    mobile: '9935112233',
    interestedCourse: 'Web Designing & Development',
    enquiryDate: '2026-02-16',
    status: 'Follow-up',
    notes: 'Asked for fees details and installment options.',
    followUpDate: '2026-02-23'
  },
  {
    id: 'l7',
    name: 'Kuldeep Rathore',
    mobile: '9882667788',
    interestedCourse: 'CCC',
    enquiryDate: '2026-02-15',
    status: 'New',
    notes: 'WhatsApp enquiry from near Tehsil.',
    followUpDate: '2026-02-22'
  },
  {
    id: 'l8',
    name: 'Alka Dixit',
    mobile: '9721334455',
    interestedCourse: 'Java Development',
    enquiryDate: '2026-02-14',
    status: 'Not Interested',
    notes: 'Joined another institute due to distance.',
    followUpDate: '2026-02-14'
  }
];

export const INITIAL_REMINDERS: FeeReminder[] = [
  {
    id: 'r1',
    studentId: 'st-1',
    studentName: 'Aman Verma',
    parentName: 'Ramesh Verma',
    mobile: '9882341122',
    amountDue: 4000,
    dueDate: '2026-03-30',
    templateType: 'First',
    message: 'Namaste Ramesh Verma ji, Aman Verma ki Aimers Computer Institute mein course fee ka ₹4000 pending hai. Kripya fees jama karne ke liye samay nikalein. Kisi bhi jankari ke liye institute se sampark karein. Dhanyavaad.',
    status: 'Pending'
  },
  {
    id: 'r2',
    studentId: 'st-3',
    studentName: 'Rahul Kumar',
    parentName: 'Suresh Kumar',
    mobile: '9911223344',
    amountDue: 2000,
    dueDate: '2026-03-05',
    templateType: 'First',
    message: 'Namaste Suresh Kumar ji, Rahul Kumar ki Aimers Computer Institute mein course fee ka ₹2000 pending hai. Kripya fees jama karne ke liye samay nikalein. Kisi bhi jankari ke liye institute se sampark karein. Dhanyavaad.',
    status: 'Pending'
  },
  {
    id: 'r3',
    studentId: 'st-6',
    studentName: 'Shivani Tiwari',
    parentName: 'Manoj Tiwari',
    mobile: '9123456789',
    amountDue: 2000,
    dueDate: '2026-03-10',
    templateType: 'Second',
    message: 'Namaste, Shivani Tiwari ki remaining course fee ₹2000 pending hai. Aapki suvidha ke liye payment reminder bheja gaya hai. Aimers Computer Institute.',
    status: 'Pending'
  },
  {
    id: 'r4',
    studentId: 'st-8',
    studentName: 'Neha Gupta',
    parentName: 'Sanjay Gupta',
    mobile: '9792113344',
    amountDue: 3200,
    dueDate: '2026-03-01',
    templateType: 'First',
    message: 'Namaste Sanjay Gupta ji, Neha Gupta ki Aimers Computer Institute mein course fee ka ₹3200 pending hai. Kripya fees jama karne ke liye samay nikalein. Kisi bhi jankari ke liye institute se sampark karein. Dhanyavaad.',
    status: 'Pending'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'student',
    text: 'Hello, mujhe computer course karna hai.',
    timestamp: '10:30 AM'
  },
  {
    id: 'm2',
    sender: 'ai',
    text: 'Namaste! 🙏 Aimers Computer Institute mein aapka welcome hai. Hum O Level, CCC, Tally GST, DCA/ADCA, Python, Java, Web Designing aur AI courses karwate hain. Aap kaunsa course seekhna chahte hain?',
    timestamp: '10:30 AM'
  },
  {
    id: 'm3',
    sender: 'student',
    text: 'AI course.',
    timestamp: '10:32 AM'
  },
  {
    id: 'm4',
    sender: 'ai',
    text: 'Bahut achha! 😊 Hamare AI Course mein aap AI tools aur practical AI skills seekh sakte hain. Kya aap course fees, duration ya scholarship ke baare mein jaanna chahenge?',
    timestamp: '10:32 AM'
  },
  {
    id: 'm5',
    sender: 'student',
    text: 'Scholarship.',
    timestamp: '10:33 AM'
  },
  {
    id: 'm6',
    sender: 'ai',
    text: 'Hamare institute mein eligibility ke according 20%, 50%, 75% ya up to 100% scholarship ka option available hai. Scholarship institute ke eligibility criteria aur approval par depend karti hai. Kya main aapki admission enquiry register karun?',
    timestamp: '10:33 AM'
  }
];
