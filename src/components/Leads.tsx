import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  User, 
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Calendar,
  Star,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Leads() {
  const { language, whatsappLeads, customers, addWhatsAppLead, updateWhatsAppLead } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLead, setNewLead] = useState({
    customerPhone: '',
    customerName: '',
    message: '',
    status: 'New' as const
  });

  const filteredLeads = whatsappLeads.filter(lead =>
    lead.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.customerPhone.includes(searchTerm) ||
    lead.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Converted': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Closed': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Responded': return <MessageSquare className="w-5 h-5 text-blue-600" />;
      default: return <Clock className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Converted': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      case 'Responded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return language === 'en' ? 'Just now' : 'अभी';
    if (diffInMinutes < 60) return `${diffInMinutes} ${language === 'en' ? 'min ago' : 'मिनट पहले'}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ${language === 'en' ? 'hr ago' : 'घंटे पहले'}`;
    return `${Math.floor(diffInMinutes / 1440)} ${language === 'en' ? 'days ago' : 'दिन पहले'}`;
  };

  const handleCreateLead = () => {
    if (!newLead.customerPhone || !newLead.message) return;

    addWhatsAppLead({
      ...newLead,
      timestamp: new Date().toISOString()
    });

    setShowCreateModal(false);
    setNewLead({
      customerPhone: '',
      customerName: '',
      message: '',
      status: 'New'
    });
  };

  const updateStatus = (id: string, newStatus: string) => {
    updateWhatsAppLead(id, { status: newStatus as any });
  };

  const getPriorityColor = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'border-l-red-500'; // High priority - within 1 hour
    if (diffInHours < 24) return 'border-l-orange-500'; // Medium priority - within 24 hours
    return 'border-l-gray-300'; // Low priority - older than 24 hours
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'WhatsApp Leads' : 'व्हाट्सएप लीड्स'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Manage customer inquiries from WhatsApp' 
              : 'व्हाट्सएप से ग्राहक पूछताछ प्रबंधित करें'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add Lead' : 'लीड जोड़ें'}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{whatsappLeads.length}</p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Leads' : 'कुल लीड्स'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {whatsappLeads.filter(l => l.status === 'New').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'New Leads' : 'नई लीड्स'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {whatsappLeads.filter(l => l.status === 'Responded').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Responded' : 'जवाब दिया गया'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {whatsappLeads.filter(l => l.status === 'Converted').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Converted' : 'कन्वर्ट किए गए'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search leads...' : 'लीड्स खोजें...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>{language === 'en' ? 'Filter' : 'फ़िल्टर'}</span>
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className={`bg-white rounded-xl p-6 border-l-4 ${getPriorityColor(lead.timestamp)} border-r border-t border-b border-gray-200 hover:shadow-lg transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lead.customerName || language === 'en' ? 'Unknown Customer' : 'अज्ञात ग्राहक'}
                  </h3>
                  <p className="text-gray-600">{lead.customerPhone}</p>
                  <p className="text-sm text-gray-500">{formatTime(lead.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(lead.status)}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Message:' : 'संदेश:'}
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-800 leading-relaxed">{lead.message}</p>
              </div>
            </div>

            {lead.followUpDate && (
              <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {language === 'en' ? 'Follow-up:' : 'फॉलो-अप:'} {lead.followUpDate}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {lead.status === 'New' && (
                <>
                  <button 
                    onClick={() => updateStatus(lead.id, 'Responded')}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    {language === 'en' ? 'Mark Responded' : 'जवाब दिया मार्क करें'}
                  </button>
                  <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    {language === 'en' ? 'Reply on WhatsApp' : 'व्हाट्सएप पर जवाब दें'}
                  </button>
                </>
              )}
              
              {lead.status === 'Responded' && (
                <>
                  <button 
                    onClick={() => updateStatus(lead.id, 'Converted')}
                    className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                  >
                    {language === 'en' ? 'Mark Converted' : 'कन्वर्ट मार्क करें'}
                  </button>
                  <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {language === 'en' ? 'Schedule Follow-up' : 'फॉलो-अप शेड्यूल करें'}
                  </button>
                </>
              )}
              
              <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                <Phone className="w-4 h-4 inline mr-1" />
                {language === 'en' ? 'Call Customer' : 'ग्राहक को कॉल करें'}
              </button>
              
              {lead.status !== 'Closed' && (
                <button 
                  onClick={() => updateStatus(lead.id, 'Closed')}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  {language === 'en' ? 'Close Lead' : 'लीड बंद करें'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Lead Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Add WhatsApp Lead' : 'व्हाट्सएप लीड जोड़ें'}
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Customer Phone *' : 'ग्राहक फोन *'}
                </label>
                <input
                  type="tel"
                  value={newLead.customerPhone}
                  onChange={(e) => setNewLead({ ...newLead, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Customer Name' : 'ग्राहक का नाम'}
                </label>
                <input
                  type="text"
                  value={newLead.customerName}
                  onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Customer name (optional)' : 'ग्राहक का नाम (वैकल्पिक)'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Message *' : 'संदेश *'}
                </label>
                <textarea
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder={language === 'en' ? 'Customer inquiry message' : 'ग्राहक पूछताछ संदेश'}
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  onClick={handleCreateLead}
                  disabled={!newLead.customerPhone || !newLead.message}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Add Lead' : 'लीड जोड़ें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}