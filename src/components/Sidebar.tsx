import React from 'react';
import { 
  Home, 
  Users, 
  Package, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  BarChart3, 
  Settings,
  Megaphone,
  Bell,
  User,
  Globe
} from 'lucide-react';
import { useStore } from '../store/useStore';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, labelHi: 'डैशबोर्ड' },
  { id: 'customers', label: 'Customers', icon: Users, labelHi: 'ग्राहक' },
  { id: 'products', label: 'Products', icon: Package, labelHi: 'उत्पाद' },
  { id: 'billing', label: 'Billing', icon: FileText, labelHi: 'बिलिंग' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, labelHi: 'मार्केटिंग' },
  { id: 'messaging', label: 'Messaging', icon: MessageSquare, labelHi: 'संदेश' },
  { id: 'payments', label: 'Payments', icon: CreditCard, labelHi: 'भुगतान' },
  { id: 'reports', label: 'Reports', icon: BarChart3, labelHi: 'रिपोर्ट' },
  { id: 'notifications', label: 'Notifications', icon: Bell, labelHi: 'सूचनाएं' },
  { id: 'profile', label: 'Profile', icon: User, labelHi: 'प्रोफ़ाइल' },
  { id: 'settings', label: 'Settings', icon: Settings, labelHi: 'सेटिंग्स' },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const { language, setLanguage, activeTab, setActiveTab, setSidebarOpen } = useStore();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">VyaparX</h2>
              <p className="text-xs text-gray-500">व्यापार एक्स</p>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'हिंदी' : 'English'}
            </span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      flex items-center space-x-3 w-full p-3 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                    <span className="font-medium">
                      {language === 'en' ? item.label : item.labelHi}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>{language === 'en' ? 'Made for Indian SMBs' : 'भारतीय SMBs के लिए बनाया गया'}</p>
            <p className="mt-1">Version 1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}