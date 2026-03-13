import { ObjectId } from 'mongodb';

export interface CivicIssue {
  _id?: ObjectId;
  id: string;
  title: string;
  category: string;
  description: string;
  digiPin: string;
  location: string;
  name: string;
  email: string;
  contact: string;
  status: 'reported' | 'in-progress' | 'resolved';
  submittedAt: string;
  resolvedAt?: string;
  adminNotes?: string;
  imageData?: string;
  imageType?: string;
}

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  points: number;
  reportCount: number;
  resolvedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityPost {
  _id?: ObjectId;
  id: string;
  issueId?: string;
  authorName: string;
  authorEmail: string;
  title: string;
  caption: string;
  beforeImage: string;
  afterImage?: string;
  beforeImageType?: string;
  afterImageType?: string;
  reportedAt: string;
  editedAt?: string;
  likes: number;
  comments: Array<{
    id: string;
    authorName: string;
    text: string;
    postedAt: string;
  }>;
}

export interface AdminCredentials {
  _id?: ObjectId;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemStats {
  totalUsers: number;
  totalIssues: number;
  activeUsers: number;
  totalPosts: number;
  resolvedIssues: number;
  resolutionRate: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
}

export interface CreateIssueRequest {
  title: string;
  category: string;
  description: string;
  digiPin: string;
  location: string;
  name: string;
  email: string;
  contact: string;
  imageData?: string;
  imageType?: string;
}

export interface UpdateIssueStatusRequest {
  status: 'reported' | 'in-progress' | 'resolved';
  adminNotes?: string;
}

export interface CreatePostRequest {
  issueId?: string;
  authorName: string;
  authorEmail: string;
  title: string;
  caption: string;
  beforeImage: string;
  afterImage?: string;
  beforeImageType?: string;
  afterImageType?: string;
}
