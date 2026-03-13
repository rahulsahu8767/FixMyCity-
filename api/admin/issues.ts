import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { CivicIssue } from '../types/index';
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

    const issuesCollection = await getCollection<CivicIssue>('issues');

    // Get all issues with optional filters
    const status = req.query.status as string | undefined;
    const category = req.query.category as string | undefined;

    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const issues = await issuesCollection
      .find(filter)
      .sort({ submittedAt: -1 })
      .toArray();

    return sendSuccess(res, issues);
  } catch (error) {
    return sendServerError(res, error);
  }
}
