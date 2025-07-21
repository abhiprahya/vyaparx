import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import Billing from './components/Billing';
import Marketing from './components/Marketing';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Payments from './components/Payments';
import Delivery from './components/Delivery';
import Requirements from './components/Requirements';
import Leads from './components/Leads';
import VoiceCommand from './components/VoiceCommand';
import { useStore } from './store/useStore';

function App() {
  const { sidebarOpen, setSidebarOpen, activeTab, language } = useStore();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <Customers />;
      case 'products':
        return <Products />;
      case 'billing':
        return <Billing />;
      case 'marketing':
        return <Marketing />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'payments':
        return <Payments />;
      case 'delivery':
        return <Delivery />;
      case 'requirements':
        return <Requirements />;
      case 'leads':
        return <Leads />;
      case 'messaging':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Messaging Center' : 'संदेश केंद्र'}
            </h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-500 mb-4">
                {language === 'en' 
                  ? 'WhatsApp Business API integration coming soon...' 
                  : 'व्हाट्सएप बिजनेस API एकीकरण जल्द आ रहा है...'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">WhatsApp Business</h3>
                  <p className="text-sm text-green-600">Send bulk messages and manage customer conversations</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">SMS Gateway</h3>
                  <p className="text-sm text-blue-600">Send promotional and transactional SMS</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Email Marketing</h3>
                  <p className="text-sm text-purple-600">Create and send email campaigns</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Business Reports' : 'व्यापार रिपोर्ट'}
            </h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-500 mb-4">
                {language === 'en' 
                  ? 'Advanced analytics and reporting dashboard coming soon...' 
                  : 'उन्नत विश्लेषण और रिपोर्टिंग डैशबोर्ड जल्द आ रहा है...'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Sales Reports</h3>
                  <p className="text-sm text-blue-600">Daily, weekly, monthly sales analysis</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Customer Analytics</h3>
                  <p className="text-sm text-green-600">Customer behavior and purchase patterns</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Inventory Reports</h3>
                  <p className="text-sm text-purple-600">Stock levels and movement analysis</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Financial Reports</h3>
                  <p className="text-sm text-orange-600">Profit, loss, and cash flow reports</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Settings' : 'सेटिंग्स'}
            </h1>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'en' ? 'Application Settings' : 'एप्लिकेशन सेटिंग्स'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === 'en' ? 'Dark Mode' : 'डार्क मोड'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? 'Switch to dark theme' : 'डार्क थीम पर स्विच करें'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === 'en' ? 'Voice Commands' : 'आवाज़ कमांड'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? 'Enable voice navigation' : 'आवाज़ नेविगेशन सक्षम करें'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === 'en' ? 'Notifications' : 'सूचनाएं'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? 'Enable push notifications' : 'पुश सूचनाएं सक्षम करें'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 lg:ml-64">
          {renderContent()}
        </main>
      </div>
      <VoiceCommand />
    </div>
  );
}

export default App;