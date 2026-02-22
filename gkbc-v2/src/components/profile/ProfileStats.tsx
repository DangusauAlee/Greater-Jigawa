import React from 'react';
import { FileText, Users } from 'lucide-react';

interface ProfileStatsProps {
  postsCount: number;
  connectionsCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  postsCount,
  connectionsCount,
  activeTab,
  onTabChange,
}) => {
  const stats = [
    { key: 'posts', icon: FileText, label: 'Posts', count: postsCount },
    { key: 'connections', icon: Users, label: 'Connections', count: connectionsCount },
  ];

  return (
    <div className="px-4 mt-8">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.key}
              onClick={() => onTabChange(stat.key)}
              className={`flex flex-col items-center p-6 rounded-2xl transition-all active:scale-[0.98] border-2 ${
                activeTab === stat.key
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg transform -translate-y-1'
                  : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <Icon
                size={32}
                className={`mb-3 ${activeTab === stat.key ? 'text-green-600' : 'text-gray-600'}`}
              />
              <span className="text-2xl font-bold text-gray-900">{stat.count}</span>
              <span className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};