import React, { useState } from 'react';
import { IssueCard } from '../components/IssueCard';
import { mockIssues, mockAuthority } from '../data/mockData';
import { Issue } from '../types';
import { Shield, Clock, CheckCircle, AlertTriangle, Users, TrendingUp } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const handleStatusUpdate = (issueId: string, newStatus: Issue['status']) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { 
            ...issue, 
            status: newStatus,
            resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : undefined
          }
        : issue
    ));
  };

  const handleAssignIssue = (issueId: string, department: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, assignedTo: department, status: 'in-progress' }
        : issue
    ));
  };

  const filteredIssues = issues
    .filter(issue => selectedStatus === 'all' || issue.status === selectedStatus)
    .filter(issue => selectedDepartment === 'all' || issue.department === selectedDepartment)
    .sort((a, b) => {
      // Prioritize by urgency and date
      if (a.urgencyScore !== b.urgencyScore) {
        return b.urgencyScore - a.urgencyScore;
      }
      return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
    });

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'submitted').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    escalated: issues.filter(i => i.status === 'escalated').length,
    overdue: issues.filter(i => new Date() > new Date(i.slaDeadline) && i.status !== 'resolved').length
  };

  const departments = ['Public Works', 'Sanitation', 'Electrical', 'Water Works', 'Transportation'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Authority Dashboard</h1>
              <p className="text-orange-100">Welcome back, {mockAuthority.name}</p>
              <p className="text-sm text-orange-200">Department: {mockAuthority.department}</p>
            </div>
            <Shield className="h-16 w-16 text-white opacity-80" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-8">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-orange-100 text-sm">Total Issues</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-200">{stats.pending}</div>
              <div className="text-orange-100 text-sm">Pending</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-200">{stats.inProgress}</div>
              <div className="text-orange-100 text-sm">In Progress</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-200">{stats.resolved}</div>
              <div className="text-orange-100 text-sm">Resolved</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-200">{stats.escalated}</div>
              <div className="text-orange-100 text-sm">Escalated</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-300">{stats.overdue}</div>
              <div className="text-orange-100 text-sm">Overdue</div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">{stats.pending}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Pending Review</h3>
            <p className="text-gray-600 text-sm">Issues awaiting initial review and assignment</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{stats.inProgress}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">In Progress</h3>
            <p className="text-gray-600 text-sm">Issues currently being worked on by teams</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{stats.resolved}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Resolved</h3>
            <p className="text-gray-600 text-sm">Successfully completed issues this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{stats.overdue}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Overdue</h3>
            <p className="text-gray-600 text-sm">Issues that have exceeded SLA deadlines</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters:</span>
            </div>

            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="submitted">Pending Review</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>

            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredIssues.length} of {issues.length} issues
            </div>
          </div>
        </div>

        {/* Issues Management */}
        <div className="space-y-6">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <IssueCard issue={issue} showActions={false} />
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <select
                        value={issue.status}
                        onChange={(e) => handleStatusUpdate(issue.id, e.target.value as Issue['status'])}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="escalated">Escalated</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Assign to:</span>
                      <select
                        value={issue.assignedTo || ''}
                        onChange={(e) => handleAssignIssue(issue.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {issue.status === 'resolved' && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Upload Proof of Work
                      </button>
                    )}

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Send Update to Citizen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};