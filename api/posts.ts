import { getCollection } from './lib/db';
import { sendResponse, validateEmail, generatePostId } from './lib/helpers';
import { ObjectId } from 'mongodb';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      return handleGetPosts(req, res);
    } else if (req.method === 'POST') {
      return handleCreatePost(req, res);
    } else if (req.method === 'DELETE') {
      return handleDeletePost(req, res);
    } else {
      return sendResponse(res, 405, null, 'Method not allowed');
    }
  } catch (error) {
    console.error('API Error:', error);
    return sendResponse(res, 500, null, 'Internal server error');
  }
}

async function handleGetPosts(req: any, res: any) {
  try {
    const postsCollection = await getCollection('posts');

    const posts = await postsCollection
      .find({})
      .sort({ reportedAt: -1 })
      .toArray();

    return sendResponse(res, 200, posts);
  } catch (error) {
    console.error('Get posts error:', error);
    return sendResponse(res, 500, null, 'Error fetching posts');
  }
}

async function handleCreatePost(req: any, res: any) {
  try {
    const {
      issueId,
      authorName,
      authorEmail,
      title,
      caption,
      beforeImage,
      afterImage,
      beforeImageType,
      afterImageType,
    } = req.body;

    // Validation
    if (!authorName || !authorEmail || !title || !caption || !beforeImage) {
      return sendResponse(res, 400, null, 'Missing required fields');
    }

    if (!validateEmail(authorEmail)) {
      return sendResponse(res, 400, null, 'Invalid email format');
    }

    const postsCollection = await getCollection('posts');

    const newPost = {
      id: generatePostId(),
      issueId,
      authorName,
      authorEmail,
      title,
      caption,
      beforeImage,
      afterImage,
      beforeImageType,
      afterImageType,
      reportedAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    const result = await postsCollection.insertOne(newPost);

    return sendResponse(res, 201, { _id: result.insertedId, ...newPost });
  } catch (error) {
    console.error('Create post error:', error);
    return sendResponse(res, 500, null, 'Error creating post');
  }
}

async function handleDeletePost(req: any, res: any) {
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

    const { id } = req.query;

    if (!id) {
      return sendResponse(res, 400, null, 'Post ID required');
    }

    const postsCollection = await getCollection('posts');

    let result;
    try {
      result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    } catch {
      result = await postsCollection.deleteOne({ id });
    }

    if (result.deletedCount === 0) {
      return sendResponse(res, 404, null, 'Post not found');
    }

    return sendResponse(res, 200, { message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return sendResponse(res, 500, null, 'Error deleting post');
  }
}
