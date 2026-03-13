import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../../db/mongodb';
import { CivicIssue, User, UpdateIssueStatusRequest } from '../../types/index';
import { sendSuccess, sendError, sendServerError, sendNotFound } from '../../utils/helpers';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
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

    const issueId = req.query.issueId as string;
    const { status, adminNotes } = req.body as UpdateIssueStatusRequest;

    if (!issueId || !status) {
      return sendError(res, 'Issue ID and status are required');
    }

    if (!['reported', 'in-progress', 'resolved'].includes(status)) {
      return sendError(res, 'Invalid status');
    }

    const issuesCollection = await getCollection<CivicIssue>('issues');
    const usersCollection = await getCollection<User>('users');

    let issue;

    // Find issue
    try {
      issue = await issuesCollection.findOne({ _id: new ObjectId(issueId) });
    } catch {
      issue = await issuesCollection.findOne({ id: issueId });
    }

    if (!issue) {
      return sendNotFound(res, 'Issue not found');
    }

    const previousStatus = issue.status;

    // Update issue
    const updateData: any = {
      status,
      updatedAt: new Date().toISOString(),
    };

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    if (status === 'resolved' && previousStatus !== 'resolved') {
      updateData.resolvedAt = new Date().toISOString();
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
      return sendNotFound(res, 'Issue not found');
    }

    // If status changed to resolved, add points to user
    if (status === 'resolved' && previousStatus !== 'resolved') {
      await usersCollection.updateOne(
        { email: issue.email },
        {
          $inc: { points: 100, resolvedCount: 1 },
          $set: { updatedAt: new Date().toISOString() },
        }
      );
    }

    // Fetch updated issue
    let updatedIssue;
    try {
      updatedIssue = await issuesCollection.findOne({ _id: issue._id });
    } catch {
      updatedIssue = await issuesCollection.findOne({ id: issueId });
    }

    return sendSuccess(res, updatedIssue);
  } catch (error) {
    return sendServerError(res, error);
  }
}
