import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';
import { formatTimeAgo } from '../utils/formatters';
import { CheckCheck, User, MessageCircle, ShoppingBag, Briefcase, Calendar, LifeBuoy, Megaphone } from 'lucide-react';

const getIconForType = (type: string) => {
  switch (type) {
    case 'post':
      return <MessageCircle className="text-blue-500" size={18} />;
    case 'connection':
      return <User className="text-green-500" size={18} />;
    case 'marketplace':
      return <ShoppingBag className="text-purple-500" size={18} />;
    case 'business':
      return <Briefcase className="text-orange-500" size={18} />;
    case 'event':
      return <Calendar className="text-pink-500" size={18} />;
    case 'support':
      return <LifeBuoy className="text-indigo-500" size={18} />;
    case 'announcement':
      return <Megaphone className="text-red-500" size={18} />;
    default:
      return null;
  }
};

const groupNotificationsByType = (notifications: any[]) => {
  const groups: Record<string, any[]> = {};
  notifications.forEach((n) => {
    if (!groups[n.type]) groups[n.type] = [];
    groups[n.type].push(n);
  });
  return groups;
};

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();
  const handleNotificationClick = (notification: any) => {
    // Mark as read
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Navigate based on type and reference_id
    const { type, reference_id, subtype, sender_id } = notification;
    if (!reference_id && type !== 'announcement') return;

    switch (type) {
      case 'post':
        navigate(`/post/${reference_id}`);
        break;
      case 'connection':
        navigate(`/profile/${sender_id}`); // or to a requests page
        break;
      case 'marketplace':
        navigate(`/marketplace/${reference_id}`);
        break;
      case 'business':
        navigate(`/business/${reference_id}`);
        break;
      case 'event':
        navigate(`/event/${reference_id}`);
        break;
      case 'support':
        navigate(`/support/${reference_id}`);
        break;
      case 'announcement':
        navigate(`/announcements/${reference_id}`);
        break;
      default:
        break;
    }
  };

  const grouped = groupNotificationsByType(notifications);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllAsRead()}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
          >
            <CheckCheck size={18} />
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        Object.entries(grouped).map(([type, items]) => (
          <div key={type} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 capitalize mb-3 flex items-center gap-2">
              {getIconForType(type)}
              {type}
            </h2>
            <div className="space-y-2">
              {items.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 bg-white rounded-lg border cursor-pointer hover:shadow-sm transition ${
                    !notification.read ? 'border-l-4 border-l-green-500 bg-green-50/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.sender?.avatar_url ? (
                      <img
                        src={notification.sender.avatar_url}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {notification.sender ? notification.sender.first_name?.[0] : 'S'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(notification.created_at)}
                      </p>
                      {notification.data && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                          {notification.data.snippet}
                        </p>
                      )}
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};