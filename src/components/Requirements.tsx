import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageSquare,
  Phone,
  User,
  Package,
  Calendar,
  IndianRupee,
  X,
  Edit,
  Trash2
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Requirements() {
  const { language, dailyRequirements, customers, addDailyRequirement, updateDailyRequirement } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [requirementItems, setRequirementItems] = useState([{ productName: '', quantity: 1, unit: 'kg', estimatedPrice: 0, notes: '' }]);
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState<'WhatsApp' | 'Call' | 'Visit' | 'App'>('WhatsApp');

  const filteredRequirements = dailyRequirements.filter(req =>
    req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Paid': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'Confirmed': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Quoted': return <IndianRupee className="w-5 h-5 text-purple-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-orange-100 text-orange-800';
      case 'Quoted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'Call': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'Visit': return <User className="w-4 h-4 text-purple-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const addItem = () => {
    setRequirementItems([...requirementItems, { productName: '', quantity: 1, unit: 'kg', estimatedPrice: 0, notes: '' }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...requirementItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setRequirementItems(newItems);
  };

  const removeItem = (index: number) => {
    setRequirementItems(requirementItems.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const customer = customers.find(c => c.id === selectedCustomer);
    if (!customer || requirementItems.length === 0) return;

    const requirement = {
      customerId: customer.id,
      customerName: customer.name,
      items: requirementItems.filter(item => item.productName.trim() !== ''),
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending' as const,
      source,
      notes
    };

    addDailyRequirement(requirement);
    setShowCreateModal(false);
    setSelectedCustomer('');
    setRequirementItems([{ productName: '', quantity: 1, unit: 'kg', estimatedPrice: 0, notes: '' }]);
    setNotes('');
  };

  const updateStatus = (id: string, newStatus: string) => {
    updateDailyRequirement(id, { status: newStatus as any });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Daily Requirements' : 'दैनिक आवश्यकताएं'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Track customer daily orders and requirements' 
              : 'ग्राहकों के दैनिक ऑर्डर और आवश्यकताओं को ट्रैक करें'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add Requirement' : 'आवश्यकता जोड़ें'}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{dailyRequirements.length}</p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Requests' : 'कुल अनुरोध'}
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
                {dailyRequirements.filter(r => r.status === 'Pending').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Pending' : 'लंबित'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {dailyRequirements.filter(r => r.status === 'Delivered').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Delivered' : 'डिलीवर किए गए'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {dailyRequirements.filter(r => r.source === 'WhatsApp').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'WhatsApp Orders' : 'व्हाट्सएप ऑर्डर'}
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
            placeholder={language === 'en' ? 'Search requirements...' : 'आवश्यकताएं खोजें...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequirements.map((requirement) => (
          <div key={requirement.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{requirement.customerName}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getSourceIcon(requirement.source)}
                  <span className="text-sm text-gray-600">{requirement.source}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{requirement.requestDate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(requirement.status)}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(requirement.status)}`}>
                  {requirement.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {language === 'en' ? 'Items Required:' : 'आवश्यक वस्तुएं:'}
                </h4>
                <div className="space-y-2">
                  {requirement.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{item.productName}</span>
                        <span className="text-gray-600 ml-2">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      {item.estimatedPrice > 0 && (
                        <span className="text-green-600 font-semibold">
                          ₹{item.estimatedPrice}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {requirement.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {language === 'en' ? 'Notes:' : 'टिप्पणी:'}
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    {requirement.notes}
                  </p>
                </div>
              )}

              {requirement.totalAmount && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-900">
                    {language === 'en' ? 'Total Amount:' : 'कुल राशि:'}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    ₹{requirement.totalAmount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                {requirement.status === 'Pending' && (
                  <button 
                    onClick={() => updateStatus(requirement.id, 'Quoted')}
                    className="flex-1 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                  >
                    {language === 'en' ? 'Send Quote' : 'कोटेशन भेजें'}
                  </button>
                )}
                {requirement.status === 'Quoted' && (
                  <button 
                    onClick={() => updateStatus(requirement.id, 'Confirmed')}
                    className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
                  >
                    {language === 'en' ? 'Confirm Order' : 'ऑर्डर कन्फर्म करें'}
                  </button>
                )}
                {requirement.status === 'Confirmed' && (
                  <button 
                    onClick={() => updateStatus(requirement.id, 'Delivered')}
                    className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                  >
                    {language === 'en' ? 'Mark Delivered' : 'डिलीवर मार्क करें'}
                  </button>
                )}
                <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  {language === 'en' ? 'Contact' : 'संपर्क करें'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Requirement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Add Daily Requirement' : 'दैनिक आवश्यकता जोड़ें'}
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Customer *' : 'ग्राहक *'}
                  </label>
                  <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">{language === 'en' ? 'Choose a customer' : 'एक ग्राहक चुनें'}</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.phone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Source *' : 'स्रोत *'}
                  </label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Call">{language === 'en' ? 'Phone Call' : 'फोन कॉल'}</option>
                    <option value="Visit">{language === 'en' ? 'Store Visit' : 'दुकान विजिट'}</option>
                    <option value="App">{language === 'en' ? 'Mobile App' : 'मोबाइल ऐप'}</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === 'en' ? 'Required Items' : 'आवश्यक वस्तुएं'}
                  </h3>
                  <button
                    onClick={addItem}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === 'en' ? 'Add Item' : 'आइटम जोड़ें'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {requirementItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'en' ? 'Product' : 'उत्पाद'}
                        </label>
                        <input
                          type="text"
                          value={item.productName}
                          onChange={(e) => updateItem(index, 'productName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder={language === 'en' ? 'Product name' : 'उत्पाद का नाम'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'en' ? 'Quantity' : 'मात्रा'}
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'en' ? 'Unit' : 'यूनिट'}
                        </label>
                        <select
                          value={item.unit}
                          onChange={(e) => updateItem(index, 'unit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="kg">kg</option>
                          <option value="gm">gm</option>
                          <option value="liter">liter</option>
                          <option value="pieces">pieces</option>
                          <option value="packets">packets</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'en' ? 'Est. Price (₹)' : 'अनुमानित मूल्य (₹)'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.estimatedPrice}
                          onChange={(e) => updateItem(index, 'estimatedPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Notes' : 'टिप्पणी'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder={language === 'en' ? 'Additional notes or special instructions' : 'अतिरिक्त टिप्पणी या विशेष निर्देश'}
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
                  onClick={handleSubmit}
                  disabled={!selectedCustomer || requirementItems.filter(item => item.productName.trim() !== '').length === 0}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Add Requirement' : 'आवश्यकता जोड़ें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}