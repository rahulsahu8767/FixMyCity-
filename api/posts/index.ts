import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { CommunityPost, CreatePostRequest } from '../types/index';
import { sendSuccess, sendError, sendServerError, generatePostId, validateEmail } from '../utils/helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return handleCreatePost(req, res);
  } else if (req.method === 'GET') {
    return handleGetPosts(req, res);
  } else {
    return sendError(res, 'Method not allowed', 405);
  }
}

async function handleCreatePost(req: VercelRequest, res: VercelResponse) {
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
    } = req.body as CreatePostRequest;

    // Validation
    if (!authorName || !authorEmail || !title || !caption || !beforeImage) {
      return sendError(res, 'Missing required fields');
    }

    if (!validateEmail(authorEmail)) {
      return sendError(res, 'Invalid email format');
    }

    const postsCollection = await getCollection<CommunityPost>('posts');

    // Create new post
    const newPost: CommunityPost = {
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

    return sendSuccess(
      res,
      {
        _id: result.insertedId,
        ...newPost,
      },
      201
    );
  } catch (error) {
    return sendServerError(res, error);
  }
}

async function handleGetPosts(req: VercelRequest, res: VercelResponse) {
  try {
    const postsCollection = await getCollection<CommunityPost>('posts');

    // Get all posts sorted by date descending
    const posts = await postsCollection
      .find({})
      .sort({ reportedAt: -1 })
      .toArray();

    return sendSuccess(res, posts);
  } catch (error) {
    return sendServerError(res, error);
  }
}
