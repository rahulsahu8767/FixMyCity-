import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { User, CivicIssue, CommunityPost, SystemStats } from '../types/index';
import { sendSuccess, sendError, sendServerError } from '../utils/helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    // Check admin authorization
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Unauthorized: Missing or invalid authorization', 401);
    }

    const token = authHeader.substring(7);
    if (token !== adminPassword) {
      return sendError(res, 'Unauthorized: Invalid token', 401);
    }

    const usersCollection = await getCollection<User>('users');
    const issuesCollection = await getCollection<CivicIssue>('issues');
    const postsCollection = await getCollection<CommunityPost>('posts');

    // Fetch statistics
    const totalUsers = await usersCollection.countDocuments({});
    const totalIssues = await issuesCollection.countDocuments({});
    const totalPosts = await postsCollection.countDocuments({});
    const resolvedIssues = await issuesCollection.countDocuments({ status: 'resolved' });
    
    // Active users (users who have submitted at least one report)
    const activeUsers = await usersCollection.countDocuments({ reportCount: { $gt: 0 } });

    const resolutionRate = totalIssues > 0 
      ? Math.round((resolvedIssues / totalIssues) * 100)
      : 0;

    const stats: SystemStats = {
      totalUsers,
      totalIssues,
      activeUsers,
      totalPosts,
      resolvedIssues,
      resolutionRate,
    };

    return sendSuccess(res, stats);
  } catch (error) {
    return sendServerError(res, error);
  }
}
