export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'pothole' | 'garbage' | 'streetlight' | 'water' | 'traffic' | 'other';
  urgencyScore: number;
  status: 'submitted' | 'in-progress' | 'resolved' | 'escalated';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reportedBy: string;
  reportedAt: string;
  assignedTo?: string;
  resolvedAt?: string;
  upvotes: number;
  hasUpvoted?: boolean;
  images: string[];
  proofOfWork?: string;
  slaDeadline: string;
  department: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'citizen' | 'authority' | 'admin';
  points: number;
  level: number;
  badges: string[];
  reportedIssues: number;
  resolvedIssues?: number;
  department?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}