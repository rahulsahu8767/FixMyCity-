export function sendResponse(res: any, statusCode: number, data: any, error?: string) {
  const response = {
    success: !error,
    data: error ? undefined : data,
    error: error || undefined,
  };
  res.status(statusCode).json(response);
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

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  };
}
