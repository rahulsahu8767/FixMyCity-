import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { User } from '../types/index';
import { sendSuccess, sendError, sendServerError } from '../utils/helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const usersCollection = await getCollection<User>('users');

    // Get all users sorted by points descending
    const users = await usersCollection
      .find({})
      .sort({ points: -1 })
      .toArray();

    return sendSuccess(res, users);
  } catch (error) {
    return sendServerError(res, error);
  }
}
