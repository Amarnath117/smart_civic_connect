import { Issue, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Citizen',
  email: 'john@example.com',
  phone: '+91 98765 43210',
  role: 'citizen',
  points: 1250,
  level: 3,
  badges: ['First Reporter', 'Community Helper', 'Photo Pro'],
  reportedIssues: 12
};

export const mockAuthority: User = {
  id: '2',
  name: 'Municipal Officer',
  email: 'officer@city.gov',
  phone: '+91 99999 00000',
  role: 'authority',
  points: 0,
  level: 1,
  badges: [],
  reportedIssues: 0,
  resolvedIssues: 45,
  department: 'Public Works'
};

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing vehicle damage near the intersection',
    category: 'pothole',
    urgencyScore: 85,
    status: 'in-progress',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Main Street, Connaught Place, New Delhi'
    },
    reportedBy: 'John Citizen',
    reportedAt: '2025-01-10T09:30:00Z',
    assignedTo: 'Public Works Dept',
    upvotes: 24,
    hasUpvoted: true,
    images: ['https://images.pexels.com/photos/162829/road-asphalt-damage-pothole-162829.jpeg'],
    slaDeadline: '2025-01-15T09:30:00Z',
    department: 'Public Works'
  },
  {
    id: '2',
    title: 'Overflowing Garbage Bin',
    description: 'Garbage bin overflowing for past 3 days, attracting pests',
    category: 'garbage',
    urgencyScore: 65,
    status: 'submitted',
    location: {
      lat: 28.6149,
      lng: 77.2100,
      address: 'Rajiv Chowk Metro Station, New Delhi'
    },
    reportedBy: 'Sarah Kumar',
    reportedAt: '2025-01-11T14:15:00Z',
    upvotes: 12,
    images: ['https://images.pexels.com/photos/4318392/pexels-photo-4318392.jpeg'],
    slaDeadline: '2025-01-14T14:15:00Z',
    department: 'Sanitation'
  },
  {
    id: '3',
    title: 'Street Light Not Working',
    description: 'Street light has been off for a week, safety concern at night',
    category: 'streetlight',
    urgencyScore: 45,
    status: 'escalated',
    location: {
      lat: 28.6129,
      lng: 77.2080,
      address: 'Janpath Road, New Delhi'
    },
    reportedBy: 'Amit Singh',
    reportedAt: '2025-01-08T20:00:00Z',
    upvotes: 18,
    images: ['https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg'],
    slaDeadline: '2025-01-12T20:00:00Z',
    department: 'Electrical'
  },
  {
    id: '4',
    title: 'Water Leakage from Pipe',
    description: 'Major water leakage causing road flooding',
    category: 'water',
    urgencyScore: 90,
    status: 'resolved',
    location: {
      lat: 28.6159,
      lng: 77.2070,
      address: 'India Gate Circle, New Delhi'
    },
    reportedBy: 'Priya Sharma',
    reportedAt: '2025-01-09T11:45:00Z',
    resolvedAt: '2025-01-11T16:30:00Z',
    upvotes: 31,
    images: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'],
    proofOfWork: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg',
    slaDeadline: '2025-01-11T11:45:00Z',
    department: 'Water Works'
  }
];

export const leaderboard: User[] = [
  {
    id: '1',
    name: 'John Citizen',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    role: 'citizen',
    points: 1250,
    level: 3,
    badges: ['First Reporter', 'Community Helper', 'Photo Pro'],
    reportedIssues: 12
  },
  {
    id: '3',
    name: 'Sarah Kumar',
    email: 'sarah@example.com',
    phone: '+91 87654 32109',
    role: 'citizen',
    points: 980,
    level: 2,
    badges: ['Eagle Eye', 'Quick Reporter'],
    reportedIssues: 8
  },
  {
    id: '4',
    name: 'Amit Singh',
    email: 'amit@example.com',
    phone: '+91 76543 21098',
    role: 'citizen',
    points: 750,
    level: 2,
    badges: ['Night Owl', 'Safety First'],
    reportedIssues: 6
  }
];