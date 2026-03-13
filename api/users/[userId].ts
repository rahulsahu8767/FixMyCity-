import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { User } from '../types/index';
import { sendSuccess, sendError, sendServerError, sendNotFound } from '../utils/helpers';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return sendError(res, 'User ID is required');
    }

    const usersCollection = await getCollection<User>('users');

    let user;

    // Try to find by ObjectId first, then by email
    try {
      user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    } catch {
      user = await usersCollection.findOne({ email: userId });
    }

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    return sendSuccess(res, user);
  } catch (error) {
    return sendServerError(res, error);
  }
}
