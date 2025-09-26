import React from 'react';
import { Trophy, Award, Star, TrendingUp, Users } from 'lucide-react';
import { leaderboard, mockUser } from '../data/mockData';

export const Leaderboard: React.FC = () => {
  const badges = [
    { name: 'First Reporter', description: 'Report your first civic issue', color: 'bg-blue-100 text-blue-800' },
    { name: 'Community Helper', description: 'Help resolve 5 community issues', color: 'bg-green-100 text-green-800' },
    { name: 'Photo Pro', description: 'Upload high-quality photos', color: 'bg-purple-100 text-purple-800' },
    { name: 'Eagle Eye', description: 'Spot issues before others', color: 'bg-orange-100 text-orange-800' },
    { name: 'Quick Reporter', description: 'Report issues within 1 hour', color: 'bg-red-100 text-red-800' },
    { name: 'Night Owl', description: 'Report issues during night hours', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Safety First', description: 'Report safety-critical issues', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getLevelInfo = (points: number) => {
    if (points >= 1000) return { level: 3, name: 'Civic Champion', color: 'text-purple-600', nextLevel: 2000 };
    if (points >= 500) return { level: 2, name: 'Community Contributor', color: 'text-blue-600', nextLevel: 1000 };
    return { level: 1, name: 'New Reporter', color: 'text-green-600', nextLevel: 500 };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Leaderboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recognize and celebrate the citizens making the biggest impact in our community through their civic engagement.
          </p>
        </div>

        {/* Your Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Impact</h2>
              <p className="text-blue-100">Keep up the great work, {mockUser.name}!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{mockUser.points}</div>
              <div className="text-blue-100">points earned</div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mockUser.reportedIssues}</div>
              <div className="text-blue-100 text-sm">Issues Reported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mockUser.level}</div>
              <div className="text-blue-100 text-sm">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mockUser.badges.length}</div>
              <div className="text-blue-100 text-sm">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">#1</div>
              <div className="text-blue-100 text-sm">Current Rank</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Level {mockUser.level}</span>
              <span>Next: {getLevelInfo(mockUser.points).nextLevel} points</span>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((mockUser.points % 500) / 500) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-12 overflow-hidden">
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Top Contributors</h2>
            <p className="text-gray-600 mt-1">Citizens making the biggest difference this month</p>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {leaderboard.map((user, index) => {
                const levelInfo = getLevelInfo(user.points);
                return (
                  <div key={user.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>

                      {/* User Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span className={`font-medium ${levelInfo.color}`}>
                            Level {levelInfo.level} • {levelInfo.name}
                          </span>
                          <span>{user.reportedIssues} reports</span>
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{user.points}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Achievement Badges</h2>
            <p className="text-gray-600 mt-1">Earn badges by completing civic activities</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => {
                const isEarned = mockUser.badges.includes(badge.name);
                return (
                  <div key={index} className={`p-6 rounded-xl border-2 transition-colors ${
                    isEarned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3 mb-3">
                      {isEarned ? (
                        <div className="bg-green-100 p-2 rounded-full">
                          <Award className="h-6 w-6 text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-gray-200 p-2 rounded-full">
                          <Star className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isEarned ? badge.color : 'bg-gray-100 text-gray-500'
                      }`}>
                        {badge.name}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      isEarned ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {badge.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <TrendingUp className="h-16 w-16 mx-auto mb-6 text-white opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Ready to Climb the Leaderboard?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Every issue you report makes our community better. Start contributing today and earn points, badges, and recognition!
          </p>
          <button 
            onClick={() => window.location.href = '/report'}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Report Your First Issue
          </button>
        </div>
      </div>
    </div>
  );
};