import { getCollection } from './lib/db';
import { sendResponse } from './lib/helpers';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      return handleGetLeaderboard(req, res);
    } else if (req.method === 'PATCH') {
      return handleUpdatePoints(req, res);
    } else {
      return sendResponse(res, 405, null, 'Method not allowed');
    }
  } catch (error) {
    console.error('API Error:', error);
    return sendResponse(res, 500, null, 'Internal server error');
  }
}

async function handleGetLeaderboard(req: any, res: any) {
  try {
    const usersCollection = await getCollection('users');

    const leaderboard = await usersCollection
      .find({})
      .sort({ points: -1 })
      .limit(100)
      .toArray();

    const rankedUsers = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    return sendResponse(res, 200, rankedUsers);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return sendResponse(res, 500, null, 'Error fetching leaderboard');
  }
}

async function handleUpdatePoints(req: any, res: any) {
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

    const { email, pointsToAdd } = req.body;

    if (!email || typeof pointsToAdd !== 'number') {
      return sendResponse(res, 400, null, 'Email and pointsToAdd required');
    }

    const usersCollection = await getCollection('users');

    const result = await usersCollection.updateOne(
      { email },
      {
        $inc: { points: pointsToAdd },
        $set: { updatedAt: new Date().toISOString() },
      }
    );

    if (result.matchedCount === 0) {
      return sendResponse(res, 404, null, 'User not found');
    }

    const updatedUser = await usersCollection.findOne({ email });

    return sendResponse(res, 200, {
      message: 'Points updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update points error:', error);
    return sendResponse(res, 500, null, 'Error updating points');
  }
}
