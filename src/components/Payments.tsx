import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  QrCode,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  Send,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Payments() {
  const { language, payments, invoices, customers, addPayment, updatePayment } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'ONDC'>('UPI');

  const filteredPayments = payments.filter(payment => {
    const invoice = invoices.find(inv => inv.id === payment.invoiceId);
    const customer = customers.find(cust => cust.id === payment.customerId);
    return (
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice?.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const pendingInvoices = invoices.filter(inv => 
    inv.paymentStatus === 'Pending' || !inv.paymentStatus
  );

  const handlePayment = (invoiceId: string, method: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const payment = {
      invoiceId: invoice.id,
      customerId: invoice.customerId,
      amount: invoice.total,
      method: method as any,
      status: 'Success' as const,
      transactionId: `TXN${Date.now()}`,
      gateway: method === 'UPI' ? 'PhonePe' : method === 'Card' ? 'Razorpay' : method
    };

    addPayment(payment);
    setShowPaymentModal(false);
    setSelectedInvoice('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Failed': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Pending': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Refunded': return <RefreshCw className="w-5 h-5 text-blue-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const paymentMethods = [
    {
      id: 'UPI',
      name: 'UPI Payment',
      nameHi: 'UPI भुगतान',
      icon: QrCode,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'PhonePe, GPay, Paytm',
      descriptionHi: 'फोनपे, जीपे, पेटीएम'
    },
    {
      id: 'Card',
      name: 'Card Payment',
      nameHi: 'कार्ड भुगतान',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Credit/Debit Cards',
      descriptionHi: 'क्रेडिट/डेबिट कार्ड'
    },
    {
      id: 'NetBanking',
      name: 'Net Banking',
      nameHi: 'नेट बैंकिंग',
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'All Major Banks',
      descriptionHi: 'सभी प्रमुख बैंक'
    },
    {
      id: 'ONDC',
      name: 'ONDC Payment',
      nameHi: 'ONDC भुगतान',
      icon: Smartphone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Open Network Commerce',
      descriptionHi: 'ओपन नेटवर्क कॉमर्स'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Payment Management' : 'भुगतान प्रबंधन'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Track payments and manage transactions' 
              : 'भुगतान ट्रैक करें और लेनदेन प्रबंधित करें'
            }
          </p>
        </div>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Record Payment' : 'भुगतान रिकॉर्ड करें'}</span>
        </button>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Supported Payment Methods' : 'समर्थित भुगतान विधियां'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.id} className={`p-4 ${method.bgColor} rounded-lg border border-gray-200 hover:shadow-md transition-shadow`}>
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-6 h-6 ${method.color}`} />
                  <h4 className="font-semibold text-gray-900">
                    {language === 'en' ? method.name : method.nameHi}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? method.description : method.descriptionHi}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{payments.filter(p => p.status === 'Success').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Received' : 'कुल प्राप्त'}
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
                ₹{pendingInvoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Pending Amount' : 'लंबित राशि'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Total Transactions' : 'कुल लेनदेन'}
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
                {payments.filter(p => p.status === 'Failed').length}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? 'Failed Payments' : 'असफल भुगतान'}
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
              placeholder={language === 'en' ? 'Search payments...' : 'भुगतान खोजें...'}
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

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Transaction ID' : 'लेनदेन ID'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Customer' : 'ग्राहक'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Amount' : 'राशि'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Method' : 'विधि'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Status' : 'स्थिति'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Date' : 'दिनांक'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Actions' : 'कार्य'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const customer = customers.find(c => c.id === payment.customerId);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.transactionId || payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Record Payment' : 'भुगतान रिकॉर्ड करें'}
              </h2>
              <button
                onClick={() => setShowPaymentModal(false)}
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
                      {invoice.id} - {invoice.customerName} - ₹{invoice.total}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Payment Method' : 'भुगतान विधि'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${method.color}`} />
                        <p className="text-xs font-medium text-gray-900">
                          {language === 'en' ? method.name : method.nameHi}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  onClick={() => handlePayment(selectedInvoice, paymentMethod)}
                  disabled={!selectedInvoice}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Record Payment' : 'भुगतान रिकॉर्ड करें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}