import React from 'react';
import { User, MapPin, Award, Calendar, Phone, Mail, Settings, Bell } from 'lucide-react';
import { mockUser } from '../data/mockData';

export const Profile: React.FC = () => {
  const recentActivity = [
    {
      id: 1,
      type: 'report',
      title: 'Reported pothole on Main Street',
      date: '2025-01-10',
      points: 50
    },
    {
      id: 2,
      type: 'upvote',
      title: 'Upvoted garbage issue at Rajiv Chowk',
      date: '2025-01-09',
      points: 5
    },
    {
      id: 3,
      type: 'badge',
      title: 'Earned "Photo Pro" badge',
      date: '2025-01-08',
      points: 100
    },
    {
      id: 4,
      type: 'resolution',
      title: 'Your water leakage report was resolved',
      date: '2025-01-07',
      points: 25
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report': return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'upvote': return <Award className="h-4 w-4 text-purple-600" />;
      case 'badge': return <Award className="h-4 w-4 text-yellow-600" />;
      case 'resolution': return <Award className="h-4 w-4 text-green-600" />;
      default: return <Award className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLevelInfo = (points: number) => {
    if (points >= 1000) return { level: 3, name: 'Civic Champion', color: 'text-purple-600', nextLevel: 2000, progress: ((points - 1000) / 1000) * 100 };
    if (points >= 500) return { level: 2, name: 'Community Contributor', color: 'text-blue-600', nextLevel: 1000, progress: ((points - 500) / 500) * 100 };
    return { level: 1, name: 'New Reporter', color: 'text-green-600', nextLevel: 500, progress: (points / 500) * 100 };
  };

  const levelInfo = getLevelInfo(mockUser.points);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <User className="h-16 w-16 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
              <p className="text-blue-100 mb-4">{mockUser.email}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{mockUser.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since Jan 2025</span>
                </div>
              </div>
            </div>
            <button className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors">
              <Settings className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-purple-100 ${levelInfo.color}`}>
                  Level {levelInfo.level}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{levelInfo.name}</span>
                  <span>{mockUser.points} / {levelInfo.nextLevel} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${levelInfo.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{mockUser.points}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{mockUser.reportedIssues}</div>
                  <div className="text-sm text-gray-600">Issues Reported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{mockUser.badges.length}</div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600 text-sm mt-1">Your latest civic contributions</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">+{activity.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Badges</h2>
              <div className="space-y-3">
                {mockUser.badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="h-6 w-6 text-yellow-600" />
                    <span className="font-medium text-gray-900">{badge}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg opacity-50">
                  <Award className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-500">More badges to unlock...</span>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Issue Updates</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Email Alerts</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">SMS Updates</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/report'}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Report New Issue
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  View Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};