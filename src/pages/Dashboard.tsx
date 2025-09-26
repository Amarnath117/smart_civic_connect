import React, { useState } from 'react';
import { IssueCard } from '../components/IssueCard';
import { mockIssues } from '../data/mockData';
import { Issue } from '../types';
import { MapPin, Filter, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('urgency');

  const handleUpvote = (issueId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
          hasUpvoted: !issue.hasUpvoted
        };
      }
      return issue;
    }));
  };

  const filteredAndSortedIssues = issues
    .filter(issue => filterStatus === 'all' || issue.status === filterStatus)
    .filter(issue => filterCategory === 'all' || issue.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'urgency':
          return b.urgencyScore - a.urgencyScore;
        case 'date':
          return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
        case 'upvotes':
          return b.upvotes - a.upvotes;
        default:
          return 0;
      }
    });

  const stats = {
    total: issues.length,
    submitted: issues.filter(i => i.status === 'submitted').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    escalated: issues.filter(i => i.status === 'escalated').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Civic Issues Dashboard</h1>
          <p className="text-gray-600">Real-time tracking of civic issues across the city</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Issues</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Submitted</p>
                <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Escalated</p>
                <p className="text-2xl font-bold text-red-600">{stats.escalated}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">City Issues Map</h2>
            <p className="text-sm text-gray-600">Interactive map showing all reported issues</p>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map View</h3>
              <p className="text-gray-600">Issues plotted by location with real-time status updates</p>
            </div>
            {/* Mock map pins */}
            <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-32 right-32 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="absolute top-20 right-20 w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters:</span>
            </div>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>

            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="pothole">Pothole</option>
              <option value="garbage">Garbage</option>
              <option value="streetlight">Street Light</option>
              <option value="water">Water</option>
              <option value="traffic">Traffic</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="urgency">Sort by Urgency</option>
              <option value="date">Sort by Date</option>
              <option value="upvotes">Sort by Upvotes</option>
            </select>

            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredAndSortedIssues.length} of {issues.length} issues
            </div>
          </div>
        </div>

        {/* Issues Grid */}
        {filteredAndSortedIssues.length > 0 ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedIssues.map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onUpvote={handleUpvote}
                onViewDetails={(id) => console.log('View details for issue:', id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};