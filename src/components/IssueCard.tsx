import React from 'react';
import { Issue } from '../types';
import { MapPin, Clock, TrendingUp, CheckCircle, AlertTriangle, Camera } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onUpvote?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  showActions?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ 
  issue, 
  onUpvote, 
  onViewDetails,
  showActions = true 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pothole': return 'bg-orange-100 text-orange-800';
      case 'garbage': return 'bg-brown-100 text-brown-800';
      case 'streetlight': return 'bg-yellow-100 text-yellow-800';
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'traffic': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = new Date() > new Date(issue.slaDeadline) && issue.status !== 'resolved';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      {issue.images[0] && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={issue.images[0]} 
            alt={issue.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
            </span>
          </div>
          {issue.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <Camera className="h-3 w-3" />
              <span>{issue.images.length}</span>
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{issue.title}</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getUrgencyColor(issue.urgencyScore)}`}>
            {issue.urgencyScore}% urgent
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.description}</p>

        {/* Tags */}
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
            {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {issue.department}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{issue.location.address}</span>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span>By {issue.reportedBy}</span>
            <span>{formatDate(issue.reportedAt)}</span>
          </div>
          {isOverdue && issue.status !== 'resolved' && (
            <div className="flex items-center text-red-600">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Overdue</span>
            </div>
          )}
        </div>

        {/* SLA Timeline */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>SLA Deadline</span>
            <span>{formatDate(issue.slaDeadline)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                issue.status === 'resolved' 
                  ? 'bg-green-500' 
                  : isOverdue 
                    ? 'bg-red-500' 
                    : 'bg-blue-500'
              }`}
              style={{ 
                width: issue.status === 'resolved' 
                  ? '100%' 
                  : `${Math.min(100, Math.max(10, ((new Date().getTime() - new Date(issue.reportedAt).getTime()) / (new Date(issue.slaDeadline).getTime() - new Date(issue.reportedAt).getTime())) * 100))}%`
              }}
            />
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => onUpvote?.(issue.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                issue.hasUpvoted
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>{issue.upvotes}</span>
            </button>

            <div className="flex items-center space-x-2">
              {issue.status === 'resolved' && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Resolved</span>
                </div>
              )}
              
              <button
                onClick={() => onViewDetails?.(issue.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Resolution proof */}
        {issue.status === 'resolved' && issue.proofOfWork && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Resolution Proof:</p>
            <img 
              src={issue.proofOfWork} 
              alt="Resolution proof"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};