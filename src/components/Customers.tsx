import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Edit, 
  Trash2,
  Filter,
  Download,
  MessageSquare,
  X,
  QrCode,
  Building,
  CreditCard
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { useStore } from '../store/useStore';

export default function Customers() {
  const { language, customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    totalPurchases: 0,
    lastPurchase: 'Never',
    status: 'Active' as 'Active' | 'Inactive',
    whatsappNumber: '',
    businessType: '',
    gstNumber: ''
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.businessType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer, formData);
      setEditingCustomer(null);
    } else {
      addCustomer(formData);
    }
    setShowAddModal(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      totalPurchases: 0,
      lastPurchase: 'Never',
      status: 'Active',
      whatsappNumber: '',
      businessType: '',
      gstNumber: ''
    });
  };

  const handleEdit = (customer: any) => {
    setFormData(customer);
    setEditingCustomer(customer.id);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'en' ? 'Are you sure you want to delete this customer?' : 'क्या आप वाकई इस ग्राहक को हटाना चाहते हैं?')) {
      deleteCustomer(id);
    }
  };

  const showQRCode = (customer: any) => {
    setSelectedCustomer(customer);
    setShowQRModal(true);
  };

  const generateQRData = (customer: any) => {
    return JSON.stringify({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      businessType: customer.businessType,
      id: customer.id
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Customer Management' : 'ग्राहक प्रबंधन'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Manage your customer relationships and data' 
              : 'अपने ग्राहक संबंधों और डेटा का प्रबंधन करें'
            }
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCustomer(null);
            setFormData({
              name: '',
              phone: '',
              email: '',
              address: '',
              totalPurchases: 0,
              lastPurchase: 'Never',
              status: 'Active',
              whatsappNumber: '',
              businessType: '',
              gstNumber: ''
            });
            setShowAddModal(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add Customer' : 'ग्राहक जोड़ें'}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search customers...' : 'ग्राहक खोजें...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>{language === 'en' ? 'Filter' : 'फ़िल्टर'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>{language === 'en' ? 'Export' : 'निर्यात'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{customer.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    customer.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                  {customer.businessType && (
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {customer.businessType}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => showQRCode(customer)}
                  className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                  title={language === 'en' ? 'Show QR Code' : 'QR कोड दिखाएं'}
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEdit(customer)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(customer.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              
              {customer.whatsappNumber && customer.whatsappNumber !== customer.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span>{customer.whatsappNumber}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{customer.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{customer.address}</span>
              </div>

              {customer.gstNumber && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span className="truncate">{customer.gstNumber}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {language === 'en' ? 'Total Purchases' : 'कुल खरीदारी'}
                </span>
                <span className="font-semibold text-gray-900">₹{customer.totalPurchases.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {language === 'en' ? 'Last Purchase' : 'अंतिम खरीदारी'}
                </span>
                <span className="text-sm text-gray-500">{customer.lastPurchase}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{language === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{language === 'en' ? 'Call' : 'कॉल'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCustomer 
                  ? (language === 'en' ? 'Edit Customer' : 'ग्राहक संपादित करें')
                  : (language === 'en' ? 'Add New Customer' : 'नया ग्राहक जोड़ें')
                }
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'Enter customer name' : 'ग्राहक का नाम दर्ज करें'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'Phone Number *' : 'फोन नंबर *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'Email' : 'ईमेल'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="customer@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'WhatsApp Number' : 'व्हाट्सएप नंबर'}
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Address' : 'पता'}
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder={language === 'en' ? 'Enter complete address' : 'पूरा पता दर्ज करें'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'Business Type' : 'व्यापार का प्रकार'}
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'Select business type' : 'व्यापार का प्रकार चुनें'}</option>
                    <option value="Retail Store">{language === 'en' ? 'Retail Store' : 'रिटेल स्टोर'}</option>
                    <option value="Grocery Store">{language === 'en' ? 'Grocery Store' : 'किराना स्टोर'}</option>
                    <option value="Restaurant">{language === 'en' ? 'Restaurant' : 'रेस्टोरेंट'}</option>
                    <option value="Pharmacy">{language === 'en' ? 'Pharmacy' : 'फार्मेसी'}</option>
                    <option value="Electronics Store">{language === 'en' ? 'Electronics Store' : 'इलेक्ट्रॉनिक्स स्टोर'}</option>
                    <option value="Beauty Salon">{language === 'en' ? 'Beauty Salon' : 'ब्यूटी सैलून'}</option>
                    <option value="Other">{language === 'en' ? 'Other' : 'अन्य'}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'GST Number' : 'GST नंबर'}
                  </label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Status' : 'स्थिति'}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">{language === 'en' ? 'Active' : 'सक्रिय'}</option>
                  <option value="Inactive">{language === 'en' ? 'Inactive' : 'निष्क्रिय'}</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCustomer 
                    ? (language === 'en' ? 'Update Customer' : 'ग्राहक अपडेट करें')
                    : (language === 'en' ? 'Add Customer' : 'ग्राहक जोड़ें')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Customer QR Code' : 'ग्राहक QR कोड'}
              </h2>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedCustomer.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{selectedCustomer.phone}</p>
              
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <QRCode
                    size={200}
                    value={generateQRData(selectedCustomer)}
                    viewBox="0 0 256 256"
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                {language === 'en' 
                  ? 'Scan this QR code to quickly access customer information'
                  : 'ग्राहक जानकारी तक त्वरित पहुंच के लिए इस QR कोड को स्कैन करें'
                }
              </p>
            </div>
            
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'en' ? 'Close' : 'बंद करें'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}