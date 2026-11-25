import React, { useState } from 'react';
import { UserPlus, Search, Plus, Phone, Calendar, Trash2, Edit, X, CheckCircle2, Sparkles } from 'lucide-react';
import { Lead } from '../types';

interface LeadManagementProps {
  leads: Lead[];
  onAddLead: (lead: Omit<Lead, 'id'>) => void;
  onUpdateLead: (id: string, lead: Partial<Lead>) => void;
  onDeleteLead: (id: string) => void;
}

export const LeadManagement: React.FC<LeadManagementProps> = ({
  leads,
  onAddLead,
  onUpdateLead,
  onDeleteLead
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    mobile: string;
    interestedCourse: string;
    enquiryDate: string;
    status: 'New' | 'Interested' | 'Follow-up' | 'Admission Completed' | 'Not Interested';
    notes: string;
    followUpDate: string;
  }>({
    name: '',
    mobile: '',
    interestedCourse: 'AI & Generative Tools Masterclass',
    enquiryDate: new Date().toISOString().split('T')[0],
    status: 'New',
    notes: '',
    followUpDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedLeadId) {
      onUpdateLead(selectedLeadId, formData);
      setIsEditing(false);
    } else {
      onAddLead(formData);
    }
    setIsModalOpen(false);
    setFormData({
      name: '',
      mobile: '',
      interestedCourse: 'AI & Generative Tools Masterclass',
      enquiryDate: new Date().toISOString().split('T')[0],
      status: 'New',
      notes: '',
      followUpDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    });
  };

  const startEdit = (lead: Lead) => {
    setSelectedLeadId(lead.id);
    setFormData({
      name: lead.name,
      mobile: lead.mobile,
      interestedCourse: lead.interestedCourse,
      enquiryDate: lead.enquiryDate,
      status: lead.status,
      notes: lead.notes,
      followUpDate: lead.followUpDate
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery) ||
      lead.interestedCourse.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-emerald-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp CRM & Admissions Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Enquiry & Lead Management
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-2xl">
              Track student enquiries captured via WhatsApp bot, schedule follow-ups, and convert leads into admissions for Aimers Computer Institute.
            </p>
          </div>

          <button
            onClick={() => {
              setIsEditing(false);
              setFormData({
                name: '',
                mobile: '',
                interestedCourse: 'AI & Generative Tools Masterclass',
                enquiryDate: new Date().toISOString().split('T')[0],
                status: 'New',
                notes: '',
                followUpDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
              });
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Enquiry Lead</span>
          </button>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search lead name, mobile, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700"
          >
            <option value="ALL">All Lead Statuses ({leads.length})</option>
            <option value="New">New</option>
            <option value="Interested">Interested</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Admission Completed">Admission Completed</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Lead Name & Mobile</th>
                <th className="py-3.5 px-4">Interested Course</th>
                <th className="py-3.5 px-4">Enquiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Follow-up & Notes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500 flex items-center mt-0.5">
                      <Phone className="w-3 h-3 mr-1 text-emerald-600" /> {lead.mobile}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800">{lead.interestedCourse}</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {lead.enquiryDate}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      lead.status === 'Interested' ? 'bg-emerald-100 text-emerald-800' :
                      lead.status === 'Admission Completed' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Follow-up' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-slate-700 text-xs truncate">{lead.notes || 'No notes'}</p>
                    <p className="text-[11px] text-blue-600 font-medium mt-0.5">Follow-up: {lead.followUpDate}</p>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <a
                        href={`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(`Namaste ${lead.name} ji, Aimers Computer Institute se aapka swagat hai. Kya aap ${lead.interestedCourse} mein admission lena chahte hain?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-colors"
                        title="WhatsApp Contact"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => startEdit(lead)}
                        className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
                        title="Edit Lead"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? 'Edit Enquiry Lead' : 'Add WhatsApp Enquiry Lead'}
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student / Lead Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Deepansh Bajpai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="e.g. 9881992233"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Interested Course *</label>
                  <input
                    type="text"
                    required
                    value={formData.interestedCourse}
                    onChange={(e) => setFormData({...formData, interestedCourse: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium"
                  >
                    <option value="New">New</option>
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Admission Completed">Admission Completed</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Follow-up Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Remarks</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Enter enquiry notes..."
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
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30"
                >
                  {isEditing ? 'Update Lead' : 'Save Enquiry'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
