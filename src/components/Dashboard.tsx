import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  IndianRupee,
  ShoppingCart,
  MessageSquare,
  Calendar,
  Plus
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Dashboard() {
  const { language, customers, products, invoices, setActiveTab } = useStore();

  const stats = [
    {
      title: 'Total Revenue',
      titleHi: 'कुल आय',
      value: `₹${customers.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: () => setActiveTab('reports')
    },
    {
      title: 'Active Customers',
      titleHi: 'सक्रिय ग्राहक',
      value: customers.filter(c => c.status === 'Active').length.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      onClick: () => setActiveTab('customers')
    },
    {
      title: 'Products',
      titleHi: 'उत्पाद',
      value: products.length.toString(),
      change: '+15.3%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      onClick: () => setActiveTab('products')
    },
    {
      title: 'Pending Invoices',
      titleHi: 'लंबित चालान',
      value: invoices.filter(i => i.status === 'Draft' || i.status === 'Sent').length.toString(),
      change: '-5.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      onClick: () => setActiveTab('billing')
    }
  ];

  const recentTransactions = [
    { id: 1, customer: 'राम शर्मा', amount: '₹1,250', type: 'Sale', time: '2 hours ago' },
    { id: 2, customer: 'Priya Patel', amount: '₹850', type: 'Sale', time: '4 hours ago' },
    { id: 3, customer: 'अमित कुमार', amount: '₹2,100', type: 'Sale', time: '6 hours ago' },
    { id: 4, customer: 'Sunita Devi', amount: '₹675', type: 'Return', time: '1 day ago' },
  ];

  const quickActions = [
    {
      title: 'New Bill',
      titleHi: 'नया बिल',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      onClick: () => setActiveTab('billing')
    },
    {
      title: 'Add Customer',
      titleHi: 'ग्राहक जोड़ें',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      onClick: () => setActiveTab('customers')
    },
    {
      title: 'Add Product',
      titleHi: 'उत्पाद जोड़ें',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      onClick: () => setActiveTab('products')
    },
    {
      title: 'Send Message',
      titleHi: 'संदेश भेजें',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      onClick: () => setActiveTab('messaging')
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'en' ? 'Welcome back, John!' : 'वापस स्वागत है, जॉन!'}
        </h1>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Here\'s what\'s happening with your business today.' 
            : 'आज आपके व्यापार में क्या हो रहा है।'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              onClick={stat.onClick}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? stat.title : stat.titleHi}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {language === 'en' ? 'Sales Overview' : 'बिक्री अवलोकन'}
            </h3>
            <button 
              onClick={() => setActiveTab('reports')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {language === 'en' ? 'View All' : 'सभी देखें'}
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                {language === 'en' ? 'Chart will be displayed here' : 'चार्ट यहाँ दिखाया जाएगा'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {language === 'en' ? 'Recent Transactions' : 'हाल की लेनदेन'}
            </h3>
            <button 
              onClick={() => setActiveTab('billing')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {language === 'en' ? 'View All' : 'सभी देखें'}
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{transaction.customer}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{transaction.amount}</p>
                  <p className={`text-sm ${
                    transaction.type === 'Sale' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Quick Actions' : 'त्वरित कार्य'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button 
                key={index}
                onClick={action.onClick}
                className={`p-4 ${action.bgColor} rounded-lg ${action.hoverColor} transition-all text-center hover:scale-105`}
              >
                <Icon className={`w-6 h-6 ${action.color} mx-auto mb-2`} />
                <span className={`text-sm font-medium ${action.color}`}>
                  {language === 'en' ? action.title : action.titleHi}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}