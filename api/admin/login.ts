import { VercelRequest, VercelResponse } from '@vercel/node';
import { LoginRequest } from '../types/index';
import { sendSuccess, sendError, sendUnauthorized } from '../utils/helpers';
import { getAdminUsername, getAdminPassword } from '../utils/helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const { username, password } = req.body as LoginRequest;

    if (!username || !password) {
      return sendError(res, 'Username and password are required');
    }

    const correctUsername = getAdminUsername();
    const correctPassword = getAdminPassword();

    if (username !== correctUsername || password !== correctPassword) {
      return sendUnauthorized(res, 'Invalid username or password');
    }

    // Return success with token (the password itself is the token)
    return sendSuccess(res, {
      message: 'Login successful',
      token: correctPassword,
      username: correctUsername,
    });
  } catch (error) {
    console.error('Login error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}
