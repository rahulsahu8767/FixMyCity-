import { getCollection } from './lib/db.js';
import { sendResponse, getAdminCredentials } from './lib/helpers.js';
import { ObjectId } from 'mongodb';

export default async function handler(req: any, res: any) {
  try {
    const { action } = req.query;

    if (req.method === 'POST' && action === 'login') {
      return handleAdminLogin(req, res);
    } else if (req.method === 'GET' && action === 'stats') {
      return handleGetStats(req, res);
    } else if (req.method === 'GET' && action === 'issues') {
      return handleGetAdminIssues(req, res);
    } else if (req.method === 'PATCH' && action === 'updateStatus') {
      return handleUpdateIssueStatus(req, res);
    } else {
      return sendResponse(res, 405, null, 'Method not allowed');
    }
  } catch (error) {
    console.error('API Error:', error);
    return sendResponse(res, 500, null, 'Internal server error');
  }
}

async function handleAdminLogin(req: any, res: any) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, null, 'Username and password required');
    }

    const creds = getAdminCredentials();

    if (username !== creds.username || password !== creds.password) {
      return sendResponse(res, 401, null, 'Invalid credentials');
    }

    return sendResponse(res, 200, {
      message: 'Login successful',
      token: creds.password,
      username: creds.username,
    });
  } catch (error) {
    console.error('Login error:', error);
    return sendResponse(res, 500, null, 'Error during login');
  }
}

async function handleGetStats(req: any, res: any) {
  try {
    // Check admin auth
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, null, 'Unauthorized');
    }

    const token = authHeader.substring(7);
    if (token !== adminPassword) {
      return sendResponse(res, 401, null, 'Invalid token');
    }

    const usersCollection = await getCollection('users');
    const issuesCollection = await getCollection('issues');
    const postsCollection = await getCollection('posts');

    const totalUsers = await usersCollection.countDocuments({});
    const totalIssues = await issuesCollection.countDocuments({});
    const totalPosts = await postsCollection.countDocuments({});
    const resolvedIssues = await issuesCollection.countDocuments({
      status: 'resolved',
    });
    const activeUsers = await usersCollection.countDocuments({
      reportCount: { $gt: 0 },
    });
    const pendingIssues = await issuesCollection.countDocuments({
      status: 'reported',
    });

    const resolutionRate =
      totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

    return sendResponse(res, 200, {
      totalUsers,
      totalIssues,
      activeUsers,
      totalPosts,
      resolvedIssues,
      resolutionRate,
      pendingIssues,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return sendResponse(res, 500, null, 'Error fetching stats');
  }
}

async function handleGetAdminIssues(req: any, res: any) {
  try {
    // Check admin auth
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, null, 'Unauthorized');
    }

    const token = authHeader.substring(7);
    if (token !== adminPassword) {
      return sendResponse(res, 401, null, 'Invalid token');
    }

    const { status, category } = req.query;
    const issuesCollection = await getCollection('issues');

    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const issues = await issuesCollection
      .find(filter)
      .sort({ submittedAt: -1 })
      .toArray();

    return sendResponse(res, 200, issues);
  } catch (error) {
    console.error('Get admin issues error:', error);
    return sendResponse(res, 500, null, 'Error fetching issues');
  }
}

async function handleUpdateIssueStatus(req: any, res: any) {
  try {
    // Check admin auth
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, null, 'Unauthorized');
    }

    const token = authHeader.substring(7);
    if (token !== adminPassword) {
      return sendResponse(res, 401, null, 'Invalid token');
    }

    const { issueId, status, adminNotes } = req.body;

    if (!issueId || !status) {
      return sendResponse(res, 400, null, 'Issue ID and status required');
    }

    if (!['reported', 'in-progress', 'resolved'].includes(status)) {
      return sendResponse(res, 400, null, 'Invalid status');
    }

    const issuesCollection = await getCollection('issues');
    const usersCollection = await getCollection('users');

    let issue;
    try {
      issue = await issuesCollection.findOne({ _id: new ObjectId(issueId) });
    } catch {
      issue = await issuesCollection.findOne({ id: issueId });
    }

    if (!issue) {
      return sendResponse(res, 404, null, 'Issue not found');
    }

    const previousStatus = issue.status;

    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
    };

    if (adminNotes) {
      Object.assign(updateData, { adminNotes });
    }

    if (status === 'resolved' && previousStatus !== 'resolved') {
      Object.assign(updateData, { resolvedAt: new Date().toISOString() });
    }

    let updateResult;
    try {
      updateResult = await issuesCollection.updateOne(
        { _id: issue._id },
        { $set: updateData }
      );
    } catch {
      updateResult = await issuesCollection.updateOne(
        { id: issueId },
        { $set: updateData }
      );
    }

    if (updateResult.matchedCount === 0) {
      return sendResponse(res, 404, null, 'Issue not found');
    }

    if (status === 'resolved' && previousStatus !== 'resolved') {
      await usersCollection.updateOne(
        { email: issue.email },
        {
          $inc: { points: 100, resolvedCount: 1 },
          $set: { updatedAt: new Date().toISOString() },
        }
      );
    }

    let updatedIssue;
    try {
      updatedIssue = await issuesCollection.findOne({ _id: issue._id });
    } catch {
      updatedIssue = await issuesCollection.findOne({ id: issueId });
    }

    return sendResponse(res, 200, {
      message: 'Issue status updated successfully',
      issue: updatedIssue,
    });
  } catch (error) {
    console.error('Update issue status error:', error);
    return sendResponse(res, 500, null, 'Error updating issue');
  }
}
