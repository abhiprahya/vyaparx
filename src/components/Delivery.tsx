import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Eye,
  Phone,
  MessageSquare,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Delivery() {
  const { language, deliveryOrders, invoices, customers, addDeliveryOrder, updateDeliveryOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [deliveryPartner, setDeliveryPartner] = useState<'Zomato' | 'Swiggy' | 'Dunzo' | 'Self' | 'BlueDart' | 'DTDC'>('Dunzo');

  const deliveryPartners = [
    { id: 'Zomato', name: 'Zomato', icon: '🍔', color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 'Swiggy', name: 'Swiggy', icon: '🛵', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'Dunzo', name: 'Dunzo', icon: '📦', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'Self', name: 'Self Delivery', icon: '🚗', color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'BlueDart', name: 'BlueDart', icon: '✈️', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'DTDC', name: 'DTDC', icon: '🚚', color: 'text-indigo-600', bgColor: 'bg-indigo-50' }
  ];

  const filteredOrders = deliveryOrders.filter(order => {
    const customer = customers.find(c => c.id === order.customerId);
    return (
      order.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const pendingInvoices = invoices.filter(inv => 
    inv.deliveryStatus === 'Pending' || !inv.deliveryStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Failed': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'InTransit': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Picked': return <Package className="w-5 h-5 text-purple-600" />;
      case 'Assigned': return <Clock className="w-5 h-5 text-orange-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'InTransit': return 'bg-blue-100 text-blue-800';
      case 'Picked': return 'bg-purple-100 text-purple-800';
      case 'Assigned': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateDelivery = () => {
    const invoice = invoices.find(inv => inv.id === selectedInvoice);
    if (!invoice) return;

    const deliveryOrder = {
      invoiceId: invoice.id,
      customerId: invoice.customerId,
      items: invoice.items,
      deliveryPartner,
      status: 'Assigned' as const,
      trackingId: `${deliveryPartner.toUpperCase()}${Date.now()}`,
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    addDeliveryOrder(deliveryOrder);
    setShowCreateModal(false);
    setSelectedInvoice('');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Delivery Management' : 'डिलीवरी प्रबंधन'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Track deliveries and manage logistics' 
              : 'डिलीवरी ट्रैक करें और लॉजिस्टिक्स प्रबंधित करें'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Create Delivery' : 'डिलीवरी बनाएं'}</span>
        </button>
      </div>

      {/* Delivery Partners */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Delivery Partners' : 'डिलीवरी पार्टनर'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {deliveryPartners.map((partner) => (
            <div key={partner.id} className={`p-4 ${partner.bgColor} rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow`}>
              <div className="text-2xl mb-2">{partner.icon}</div>
              <h4 className={`font-semibold ${partner.color}`}>{partner.name}</h4>
              <p className="text-xs text-gray-600 mt-1">
                {language === 'en' ? 'Available' : 'उपलब्ध'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{deliveryOrders.length}</p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Orders' : 'कुल ऑर्डर'}
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
                {deliveryOrders.filter(o => o.status === 'Delivered').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Delivered' : 'डिलीवर किए गए'}
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
                {deliveryOrders.filter(o => o.status === 'InTransit' || o.status === 'Assigned').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'In Transit' : 'ट्रांजिट में'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {deliveryOrders.filter(o => o.status === 'Failed').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Failed' : 'असफल'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search deliveries...' : 'डिलीवरी खोजें...'}
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

      {/* Delivery Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => {
          const customer = customers.find(c => c.id === order.customerId);
          const partner = deliveryPartners.find(p => p.id === order.deliveryPartner);
          
          return (
            <div key={order.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                  <p className="text-gray-600">{customer?.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{partner?.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{partner?.name}</p>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Delivery Partner' : 'डिलीवरी पार्टनर'}
                    </p>
                  </div>
                </div>

                {order.trackingId && (
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {language === 'en' ? 'Tracking:' : 'ट्रैकिंग:'} {order.trackingId}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 truncate">
                    {customer?.address}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {language === 'en' ? 'Expected:' : 'अपेक्षित:'} {order.estimatedDelivery}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{language === 'en' ? 'Track' : 'ट्रैक करें'}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{language === 'en' ? 'Call' : 'कॉल'}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">{language === 'en' ? 'Message' : 'संदेश'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Delivery Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Create Delivery Order' : 'डिलीवरी ऑर्डर बनाएं'}
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
                  {language === 'en' ? 'Select Invoice' : 'चालान चुनें'}
                </label>
                <select
                  value={selectedInvoice}
                  onChange={(e) => setSelectedInvoice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{language === 'en' ? 'Choose an invoice' : 'एक चालान चुनें'}</option>
                  {pendingInvoices.map((invoice) => (
                    <option key={invoice.id} value={invoice.id}>
                      {invoice.id} - {invoice.customerName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Delivery Partner' : 'डिलीवरी पार्टनर'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {deliveryPartners.map((partner) => (
                    <button
                      key={partner.id}
                      onClick={() => setDeliveryPartner(partner.id as any)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        deliveryPartner === partner.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1">{partner.icon}</div>
                      <p className="text-xs font-medium text-gray-900">{partner.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  onClick={handleCreateDelivery}
                  disabled={!selectedInvoice}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Create Delivery' : 'डिलीवरी बनाएं'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}