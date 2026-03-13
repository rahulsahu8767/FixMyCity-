import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { User } from '../types/index';
import { sendSuccess, sendError, sendServerError, sendNotFound } from '../utils/helpers';

interface UpdatePointsRequest {
  email: string;
  pointsToAdd: number;
}

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

    const { email, pointsToAdd } = req.body as UpdatePointsRequest;

    if (!email || typeof pointsToAdd !== 'number') {
      return sendError(res, 'Email and pointsToAdd are required');
    }

    const usersCollection = await getCollection<User>('users');

    const result = await usersCollection.updateOne(
      { email },
      {
        $inc: { points: pointsToAdd },
        $set: { updatedAt: new Date().toISOString() },
      }
    );

    if (result.matchedCount === 0) {
      return sendNotFound(res, 'User not found');
    }

    // Fetch updated user
    const updatedUser = await usersCollection.findOne({ email });

    return sendSuccess(res, {
      message: 'Points updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    return sendServerError(res, error);
  }
}
