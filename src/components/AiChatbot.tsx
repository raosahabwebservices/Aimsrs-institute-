import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  PhoneCall, 
  MapPin, 
  UserCheck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage, Lead, Course } from '../types';
import { GoogleGenAI } from '@google/genai';

interface AiChatbotProps {
  courses: Course[];
  onAddLead: (lead: Omit<Lead, 'id'>) => void;
  initialMessages: ChatMessage[];
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ courses, onAddLead, initialMessages }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [adminTakeover, setAdminTakeover] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Student details captured during chat
  const [studentInfo, setStudentInfo] = useState({
    name: 'Aman',
    mobile: '9882341122',
    course: 'AI Course'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    if (adminTakeover) {
      // If admin took over, don't trigger AI
      return;
    }

    setIsTyping(true);

    try {
      // Check if GEMINI_API_KEY is available in client env or use smart bilingual response
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY;
      
      let aiReplyText = '';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are the virtual AI WhatsApp admission counsellor of Aimers Computer Institute, located in Mohanganj, Raebareli Road, near Tehsil. Contacts: 8881341403 / 7704980122.
Tagline: Learn Today... Build Tomorrow...
Available Courses:
1. O Level (NIELIT) - 1 Year - ₹18,000
2. CCC - 3 Months - ₹3,500
3. Tally Prime with GST - 3 Months - ₹4,500
4. DCA / ADCA - 6 Months/1 Year - ₹8,500
5. Python Programming - 4 Months - ₹6,000
6. Java Development - 6 Months - ₹9,000
7. Web Designing & Development - 6 Months - ₹8,000
8. AI & Generative Tools Masterclass - 3 Months - ₹7,000

Scholarships: 20%, 50%, 75% and up to 100% depending on eligibility and institute approval.
Respond in natural bilingual Hinglish and English matching WhatsApp communication style. Be polite, welcoming, helpful, and concise.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nStudent message: ${text}` }] }
          ]
        });

        aiReplyText = response.text || 'Namaste! Aimers Computer Institute mein aapka swagat hai. Aapko kis course ke baare mein jankari chahiye?';
      } else {
        // Fallback intelligent simulator
        const lower = text.toLowerCase();
        await new Promise(r => setTimeout(r, 1000));

        if (lower.includes('ai') || lower.includes('artificial')) {
          aiReplyText = 'Bahut achha! 😊 Hamare AI Course mein aap AI tools, prompt engineering aur practical AI skills seekhte hain. Fees ₹7,000 hai aur duration 3 months hai. Kya aap scholarship ke baare mein jaanna chahenge?';
          setStudentInfo(prev => ({ ...prev, course: 'AI Course' }));
        } else if (lower.includes('scholarship') || lower.includes('discount')) {
          aiReplyText = 'Hamare institute mein eligibility ke according 20%, 50%, 75% ya up to 100% scholarship ka option available hai! Scholarship entrance test aur approval par depend karti hai. Kya main aapka admission enquiry register karun?';
        } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('price')) {
          aiReplyText = 'Hamare sabhi courses ki fees bohot affordable hain: CCC ₹3,500, Tally GST ₹4,500, Python ₹6,000, AI Course ₹7,000, O Level ₹18,000. Isme bhi 20% se 100% tak scholarship mil sakti hai!';
        } else if (lower.includes('address') || lower.includes('location') || lower.includes('kahan')) {
          aiReplyText = '📍 Aimers Computer Institute, Mohanganj, Raebareli Road, near Tehsil. Phone: 8881341403 / 7704980122. Aap kabhi bhi visit kar sakte hain!';
        } else if (lower.includes('yes') || lower.includes('ha') || lower.includes('register') || lower.includes('admission')) {
          aiReplyText = 'Aapki enquiry successfully register ho gayi hai! 🎉 Hamare counsellor aapse jald hi call ya WhatsApp par sampark karenge. Aap direct institute bhi visit kar sakte hain.';
          if (!leadCaptured) {
            onAddLead({
              name: studentInfo.name,
              mobile: studentInfo.mobile,
              interestedCourse: studentInfo.course,
              enquiryDate: new Date().toISOString().split('T')[0],
              status: 'Interested',
              notes: 'Captured via AI WhatsApp Bot conversation.',
              followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
            });
            setLeadCaptured(true);
          }
        } else {
          aiReplyText = `Namaste! 🙏 Aimers Computer Institute Mohanganj mein O Level, CCC, Tally GST, DCA/ADCA, Python, Java, Web Designing aur AI courses available hain. Aap kaunsa course seekhna chahte hain?`;
        }
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: 'Namaste! Aimers Computer Institute mein aapka swagat hai. Kripya 8881341403 par sampark karein.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (replyText: string) => {
    handleSendMessage(replyText);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-emerald-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Virtual Admission Counsellor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI WhatsApp Admission Assistant
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-2xl">
              Simulate 24/7 automated student enquiries, instant course details, scholarship counselling, and lead capturing for Aimers Institute.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAdminTakeover(!adminTakeover)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                adminTakeover 
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{adminTakeover ? 'Admin Override Active' : 'Take Over Chat'}</span>
            </button>

            <button
              onClick={() => {
                setMessages([
                  { id: 'm1', sender: 'ai', text: 'Namaste! 🙏 Aimers Computer Institute mein aapka swagat hai. Hum O Level, CCC, Tally GST, DCA/ADCA, Python, Java, Web Designing aur AI courses karwate hain. Aap kaunsa course seekhna chahte hain?', timestamp: '10:30 AM' }
                ]);
                setLeadCaptured(false);
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto flex flex-col h-[620px]">
        
        {/* WhatsApp Chat Header */}
        <div className="bg-emerald-900 px-6 py-4 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                🤖
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base">Aimers WhatsApp Bot</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-800 text-emerald-200 rounded-full">
                  Online
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">
                {adminTakeover ? '⚠️ Admin manual mode active' : 'AI Virtual Counsellor • Auto-reply active'}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-xs text-emerald-200">
            <div className="flex items-center space-x-1 bg-emerald-800/60 px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Mohanganj, Raebareli</span>
            </div>
            <div className="flex items-center space-x-1 bg-emerald-800/60 px-3 py-1.5 rounded-xl">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
              <span>8881341403</span>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50">
          
          <div className="text-center my-2">
            <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-600 text-[11px] font-medium">
              Today • Aimers WhatsApp Automation Simulator
            </span>
          </div>

          {messages.map((msg) => {
            const isAi = msg.sender === 'ai' || (adminTakeover && msg.sender === 'admin');
            return (
              <div key={msg.id} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                  isAi 
                    ? 'bg-white text-slate-900 rounded-tl-xs border border-slate-100' 
                    : 'bg-emerald-600 text-white rounded-tr-xs'
                }`}>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className={`text-[10px] font-bold ${isAi ? 'text-emerald-700' : 'text-emerald-200'}`}>
                      {msg.sender === 'ai' ? '🤖 Aimers AI Bot' : msg.sender === 'admin' ? '👤 Institute Admin' : '👤 Student Enquiry'}
                    </span>
                    <span className={`text-[10px] ${isAi ? 'text-slate-400' : 'text-emerald-100'}`}>• {msg.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-xs border border-slate-100 shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></div>
                <span className="text-xs text-slate-400 font-medium ml-1">AI typing response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Suggestion Buttons */}
        <div className="bg-white px-4 py-2.5 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Quick Ask:</span>
          {[
            'AI Course details',
            'Scholarship info',
            'O Level fees & duration',
            'Institute address',
            'Register my admission'
          ].map((quickText) => (
            <button
              key={quickText}
              onClick={() => handleQuickReply(quickText)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-semibold shrink-0 transition-colors border border-slate-200"
            >
              {quickText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-white p-4 border-t border-slate-200">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={adminTakeover ? "Type message as Admin..." : "Type WhatsApp enquiry (e.g. AI course fees or scholarship)..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          {leadCaptured && (
            <p className="text-[11px] text-emerald-600 font-semibold text-center mt-2 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Lead successfully saved in Aimers Enquiry Dashboard!
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
