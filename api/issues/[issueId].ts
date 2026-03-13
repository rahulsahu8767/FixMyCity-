import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { CivicIssue } from '../types/index';
import { sendSuccess, sendError, sendServerError, sendNotFound } from '../utils/helpers';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return handleGetIssue(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteIssue(req, res);
  } else {
    return sendError(res, 'Method not allowed', 405);
  }
}

async function handleGetIssue(req: VercelRequest, res: VercelResponse) {
  try {
    const issueId = req.query.issueId as string;

    if (!issueId) {
      return sendError(res, 'Issue ID is required');
    }

    const issuesCollection = await getCollection<CivicIssue>('issues');

    let issue;

    // Try to find by ObjectId first, then by id field
    try {
      issue = await issuesCollection.findOne({ _id: new ObjectId(issueId) });
    } catch {
      issue = await issuesCollection.findOne({ id: issueId });
    }

    if (!issue) {
      return sendNotFound(res, 'Issue not found');
    }

    return sendSuccess(res, issue);
  } catch (error) {
    return sendServerError(res, error);
  }
}

async function handleDeleteIssue(req: VercelRequest, res: VercelResponse) {
  try {
    // Check admin authorization
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Unauthorized: Missing or invalid authorization', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    if (token !== adminPassword) {
      return sendError(res, 'Unauthorized: Invalid token', 401);
    }

    const issueId = req.query.issueId as string;

    if (!issueId) {
      return sendError(res, 'Issue ID is required');
    }

    const issuesCollection = await getCollection<CivicIssue>('issues');

    let result;

    // Try to delete by ObjectId first, then by id field
    try {
      result = await issuesCollection.deleteOne({ _id: new ObjectId(issueId) });
    } catch {
      result = await issuesCollection.deleteOne({ id: issueId });
    }

    if (result.deletedCount === 0) {
      return sendNotFound(res, 'Issue not found');
    }

    return sendSuccess(res, { message: 'Issue deleted successfully' });
  } catch (error) {
    return sendServerError(res, error);
  }
}
