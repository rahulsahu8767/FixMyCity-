import { getCollection } from './lib/db';
import { sendResponse } from './lib/helpers';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      return sendResponse(res, 405, null, 'Method not allowed');
    }

    const usersCollection = await getCollection('users');
    const issuesCollection = await getCollection('issues');
    const postsCollection = await getCollection('posts');

    // Fetch all statistics
    const totalUsers = await usersCollection.countDocuments({});
    const totalIssues = await issuesCollection.countDocuments({});
    const totalPosts = await postsCollection.countDocuments({});
    const resolvedIssues = await issuesCollection.countDocuments({
      status: 'resolved',
    });
    const pendingIssues = await issuesCollection.countDocuments({
      status: 'reported',
    });
    const inProgressIssues = await issuesCollection.countDocuments({
      status: 'in-progress',
    });
    const activeUsers = await usersCollection.countDocuments({
      reportCount: { $gt: 0 },
    });

    const resolutionRate =
      totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

    const stats = {
      totalUsers,
      totalIssues,
      totalPosts,
      activeUsers,
      resolvedIssues,
      pendingIssues,
      inProgressIssues,
      resolutionRate,
      timestamp: new Date().toISOString(),
    };

    return sendResponse(res, 200, stats);
  } catch (error) {
    console.error('Get stats error:', error);
    return sendResponse(res, 500, null, 'Error fetching statistics');
  }
}
