import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { CommunityPost } from '../types/index';
import { sendSuccess, sendError, sendServerError, sendNotFound } from '../utils/helpers';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
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

    const postId = req.query.postId as string;

    if (!postId) {
      return sendError(res, 'Post ID is required');
    }

    const postsCollection = await getCollection<CommunityPost>('posts');

    let result;

    // Try to delete by ObjectId first, then by id field
    try {
      result = await postsCollection.deleteOne({ _id: new ObjectId(postId) });
    } catch {
      result = await postsCollection.deleteOne({ id: postId });
    }

    if (result.deletedCount === 0) {
      return sendNotFound(res, 'Post not found');
    }

    return sendSuccess(res, { message: 'Post deleted successfully' });
  } catch (error) {
    return sendServerError(res, error);
  }
}
