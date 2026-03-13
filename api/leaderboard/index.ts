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
    const leaderboard = await usersCollection
      .find({})
      .sort({ points: -1 })
      .limit(100) // Top 100 users
      .toArray();

    // Add rank to each user
    const rankedUsers = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    return sendSuccess(res, rankedUsers);
  } catch (error) {
    return sendServerError(res, error);
  }
}
