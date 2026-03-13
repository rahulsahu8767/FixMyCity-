import { VercelRequest, VercelResponse } from '@vercel/node';
import { ApiResponse } from '../types/index';

export function sendResponse<T>(
  res: VercelResponse,
  statusCode: number,
  success: boolean,
  data?: T,
  error?: string
) {
  const response: ApiResponse<T> = {
    success,
    ...(data && { data }),
    ...(error && { error }),
  };

  res.status(statusCode).json(response);
}

export function sendSuccess<T>(res: VercelResponse, data: T, statusCode = 200) {
  sendResponse(res, statusCode, true, data);
}

export function sendError(res: VercelResponse, error: string, statusCode = 400) {
  sendResponse(res, statusCode, false, undefined, error);
}

export function sendNotFound(res: VercelResponse, message = 'Resource not found') {
  sendError(res, message, 404);
}

export function sendUnauthorized(res: VercelResponse, message = 'Unauthorized') {
  sendError(res, message, 401);
}

export function sendServerError(res: VercelResponse, error: any) {
  console.error('Server error:', error);
  sendError(res, 'Internal server error', 500);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateIssueId(): string {
  return `CR-${Date.now().toString().slice(-6)}`;
}

export function generatePostId(): string {
  return `POST-${Date.now().toString().slice(-6)}`;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || 'admin';
}
