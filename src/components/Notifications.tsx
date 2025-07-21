import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, XCircle, Trash2, AreaChart as MarkAsUnread } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Notifications() {
  const { language, notifications, markNotificationRead, clearNotifications } = useStore();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? '50' : '100';
    switch (type) {
      case 'success': return `bg-green-${opacity}`;
      case 'warning': return `bg-orange-${opacity}`;
      case 'error': return `bg-red-${opacity}`;
      default: return `bg-blue-${opacity}`;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return language === 'en' ? 'Just now' : 'अभी';
    if (diffInMinutes < 60) return `${diffInMinutes} ${language === 'en' ? 'min ago' : 'मिनट पहले'}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ${language === 'en' ? 'hr ago' : 'घंटे पहले'}`;
    return `${Math.floor(diffInMinutes / 1440)} ${language === 'en' ? 'days ago' : 'दिन पहले'}`;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Notifications' : 'सूचनाएं'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Stay updated with your business activities' 
              : 'अपनी व्यापारिक गतिविधियों से अपडेट रहें'
            }
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{language === 'en' ? 'Clear All' : 'सभी साफ़ करें'}</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'en' ? 'No notifications yet' : 'अभी तक कोई सूचना नहीं'}
            </h3>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'You\'ll see notifications about your business activities here' 
                : 'आपको यहाँ अपनी व्यापारिक गतिविधियों की सूचनाएं दिखेंगी'
              }
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer ${
                !notification.read ? 'border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getNotificationBg(notification.type, notification.read)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        notification.read ? 'text-gray-600' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className={`mt-1 ${
                        notification.read ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-sm text-gray-500">
                        {formatTime(notification.createdAt)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Notification Summary' : 'सूचना सारांश'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Total' : 'कुल'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {notifications.filter(n => !n.read).length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Unread' : 'अपठित'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Success' : 'सफल'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.type === 'warning').length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Warnings' : 'चेतावनी'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}