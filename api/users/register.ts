import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { User, RegisterUserRequest } from '../types/index';
import { sendSuccess, sendError, sendServerError, validateEmail } from '../utils/helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const { name, email } = req.body as RegisterUserRequest;

    // Validation
    if (!name || !email) {
      return sendError(res, 'Name and email are required');
    }

    if (!validateEmail(email)) {
      return sendError(res, 'Invalid email format');
    }

    const usersCollection = await getCollection<User>('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return sendError(res, 'User already exists', 409);
    }

    // Create new user
    const newUser: User = {
      name,
      email,
      points: 0,
      reportCount: 0,
      resolvedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await usersCollection.insertOne(newUser);

    return sendSuccess(res, {
      _id: result.insertedId,
      ...newUser,
    }, 201);
  } catch (error) {
    return sendServerError(res, error);
  }
}
