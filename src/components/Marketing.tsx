import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Send, 
  Users, 
  MessageSquare,
  Mail,
  Smartphone,
  Calendar,
  BarChart3,
  X,
  Target,
  Megaphone
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Marketing() {
  const { language, customers, campaigns, addCampaign } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: 'WhatsApp' as 'WhatsApp' | 'Email' | 'SMS',
    message: '',
    targetCustomers: [] as string[],
    scheduledAt: ''
  });

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign({
      ...formData,
      status: 'Draft'
    });
    setShowCreateModal(false);
    setFormData({
      name: '',
      type: 'WhatsApp',
      message: '',
      targetCustomers: [],
      scheduledAt: ''
    });
  };

  const toggleCustomer = (customerId: string) => {
    setFormData(prev => ({
      ...prev,
      targetCustomers: prev.targetCustomers.includes(customerId)
        ? prev.targetCustomers.filter(id => id !== customerId)
        : [...prev.targetCustomers, customerId]
    }));
  };

  const selectAllCustomers = () => {
    setFormData(prev => ({
      ...prev,
      targetCustomers: customers.map(c => c.id)
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'WhatsApp': return <MessageSquare className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      case 'SMS': return <Smartphone className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'WhatsApp': return 'bg-green-100 text-green-800';
      case 'Email': return 'bg-blue-100 text-blue-800';
      case 'SMS': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Marketing Campaigns' : 'मार्केटिंग अभियान'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Create and manage marketing campaigns' 
              : 'मार्केटिंग अभियान बनाएं और प्रबंधित करें'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Create Campaign' : 'अभियान बनाएं'}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Megaphone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Campaigns' : 'कुल अभियान'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Customers' : 'कुल ग्राहक'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'Active').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Active Campaigns' : 'सक्रिय अभियान'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search campaigns...' : 'अभियान खोजें...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Campaigns List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                    {getTypeIcon(campaign.type)}
                    <span>{campaign.type}</span>
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Message:' : 'संदेश:'}
                </p>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                  {campaign.message.length > 100 
                    ? `${campaign.message.substring(0, 100)}...` 
                    : campaign.message
                  }
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {campaign.targetCustomers.length} {language === 'en' ? 'customers' : 'ग्राहक'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{campaign.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  {language === 'en' ? 'View Details' : 'विवरण देखें'}
                </button>
                <button className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  {language === 'en' ? 'Send Now' : 'अभी भेजें'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Create Marketing Campaign' : 'मार्केटिंग अभियान बनाएं'}
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Campaign Name *' : 'अभियान का नाम *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Enter campaign name' : 'अभियान का नाम दर्ज करें'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Campaign Type *' : 'अभियान का प्रकार *'}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Message *' : 'संदेश *'}
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder={language === 'en' ? 'Enter your message' : 'अपना संदेश दर्ज करें'}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Target Customers *' : 'लक्षित ग्राहक *'}
                  </label>
                  <button
                    type="button"
                    onClick={selectAllCustomers}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {language === 'en' ? 'Select All' : 'सभी चुनें'}
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                  {customers.map((customer) => (
                    <label key={customer.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.targetCustomers.includes(customer.id)}
                        onChange={() => toggleCustomer(customer.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-900">{customer.name} - {customer.phone}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.targetCustomers.length} {language === 'en' ? 'customers selected' : 'ग्राहक चुने गए'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Schedule (Optional)' : 'शेड्यूल (वैकल्पिक)'}
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  type="submit"
                  disabled={formData.targetCustomers.length === 0}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Create Campaign' : 'अभियान बनाएं'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}