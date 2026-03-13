# FixMyCity Backend - Vercel Hobby Plan Edition

## Overview

This is a refactored backend using **only 6 serverless functions** to fit Vercel Hobby plan limits. All APIs are consolidated and use route-based handling with `req.method`, `req.query`, and `req.body`.

## File Structure

```
/api
├── lib/
│   ├── db.ts         # MongoDB connection helper
│   └── helpers.ts    # Response and validation utilities
├── issues.ts         # Issues API (GET/POST/PATCH/DELETE)
├── posts.ts          # Posts API (GET/POST/DELETE)
├── leaderboard.ts    # Leaderboard API (GET/PATCH)
├── users.ts          # Users API (GET/POST)
├── admin.ts          # Admin API (login, stats, issue management)
└── stats.ts          # System statistics API (GET)
```

**Total Serverless Functions: 6** ✅ (Fits Vercel Hobby Plan limit of 12)

## API Endpoints

### 1. ISSUES API (`/api/issues.ts`)

#### Get All Issues
```
GET /api/issues
```
Response:
```json
{
  "success": true,
  "data": [ { issue objects } ]
}
```

#### Get Single Issue
```
GET /api/issues?id=<issueId>
```
Query Params:
- `id` (string): Issue ObjectId or issue id field

Response:
```json
{
  "success": true,
  "data": { issue object }
}
```

#### Create Issue
```
POST /api/issues
Content-Type: application/json
```
Request Body:
```json
{
  "title": "Pothole on Main Street",
  "category": "Road & Infrastructure",
  "description": "Large pothole...",
  "digiPin": "123456",
  "location": "Main Street",
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "9876543210",
  "imageData": "data:image/jpeg;base64,...",
  "imageType": "image/jpeg"
}
```
Response (201):
```json
{
  "success": true,
  "data": { issue object with id and submittedAt }
}
```

#### Update Issue Status (Admin)
```
PATCH /api/issues?id=<issueId>
Authorization: Bearer <ADMIN_PASSWORD>
Content-Type: application/json
```
Request Body:
```json
{
  "status": "in-progress",
  "adminNotes": "Work started"
}
```
Response:
```json
{
  "success": true,
  "data": { updated issue object }
}
```

#### Delete Issue (Admin)
```
DELETE /api/issues?id=<issueId>
Authorization: Bearer <ADMIN_PASSWORD>
```
Response:
```json
{
  "success": true,
  "data": { "message": "Issue deleted successfully" }
}
```

---

### 2. POSTS API (`/api/posts.ts`)

#### Get All Posts
```
GET /api/posts
```
Response:
```json
{
  "success": true,
  "data": [ { post objects } ]
}
```

#### Create Post
```
POST /api/posts
Content-Type: application/json
```
Request Body:
```json
{
  "issueId": "CR-123456",
  "authorName": "Jane Smith",
  "authorEmail": "jane@example.com",
  "title": "Road Fixed!",
  "caption": "Pothole successfully repaired!",
  "beforeImage": "data:image/jpeg;base64,...",
  "afterImage": "data:image/jpeg;base64,...",
  "beforeImageType": "image/jpeg",
  "afterImageType": "image/jpeg"
}
```
Response (201):
```json
{
  "success": true,
  "data": { post object }
}
```

#### Delete Post (Admin)
```
DELETE /api/posts?id=<postId>
Authorization: Bearer <ADMIN_PASSWORD>
```
Response:
```json
{
  "success": true,
  "data": { "message": "Post deleted successfully" }
}
```

---

### 3. LEADERBOARD API (`/api/leaderboard.ts`)

#### Get Leaderboard
```
GET /api/leaderboard
```
Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "points": 500,
      "reportCount": 10,
      "resolvedCount": 5,
      "rank": 1
    }
  ]
}
```

#### Update User Points (Admin)
```
PATCH /api/leaderboard
Authorization: Bearer <ADMIN_PASSWORD>
Content-Type: application/json
```
Request Body:
```json
{
  "email": "user@example.com",
  "pointsToAdd": 50
}
```
Response:
```json
{
  "success": true,
  "data": {
    "message": "Points updated successfully",
    "user": { user object }
  }
}
```

---

### 4. USERS API (`/api/users.ts`)

#### Get All Users
```
GET /api/users
```
Response:
```json
{
  "success": true,
  "data": [ { user objects sorted by points } ]
}
```

#### Get Single User
```
GET /api/users?id=<userId>
```
Query Params:
- `id` (string): User ObjectId or email

Response:
```json
{
  "success": true,
  "data": { user object }
}
```

#### Register User
```
POST /api/users
Content-Type: application/json
```
Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
Response (201):
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "points": 0,
    "reportCount": 0,
    "resolvedCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 5. ADMIN API (`/api/admin.ts`)

#### Admin Login
```
POST /api/admin?action=login
Content-Type: application/json
```
Request Body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "message": "Login successful",
    "token": "admin123",
    "username": "admin"
  }
}
```

#### Get Admin Stats
```
GET /api/admin?action=stats
Authorization: Bearer <ADMIN_PASSWORD>
```
Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalIssues": 500,
    "activeUsers": 120,
    "totalPosts": 80,
    "resolvedIssues": 300,
    "resolutionRate": 60,
    "pendingIssues": 100
  }
}
```

#### Get Admin Issues (with filters)
```
GET /api/admin?action=issues&status=reported&category=Road & Infrastructure
Authorization: Bearer <ADMIN_PASSWORD>
```
Query Params (optional):
- `status`: "reported", "in-progress", or "resolved"
- `category`: Issue category name

Response:
```json
{
  "success": true,
  "data": [ { issue objects } ]
}
```

#### Update Issue Status (Admin)
```
PATCH /api/admin?action=updateStatus
Authorization: Bearer <ADMIN_PASSWORD>
Content-Type: application/json
```
Request Body:
```json
{
  "issueId": "CR-123456",
  "status": "resolved",
  "adminNotes": "Fixed on 2024-01-15"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "message": "Issue status updated successfully",
    "issue": { updated issue object }
  }
}
```

---

### 6. STATS API (`/api/stats.ts`)

#### Get System Statistics
```
GET /api/stats
```
Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalIssues": 500,
    "totalPosts": 80,
    "activeUsers": 120,
    "resolvedIssues": 300,
    "pendingIssues": 100,
    "inProgressIssues": 100,
    "resolutionRate": 60,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Environment Variables

Add these to your Vercel environment variables:

```env
MONGODB_URI=mongodb+srv://rsahusindurkar_db_user:HVPn8ENEfVsopEHt@fixmycity.khpualp.mongodb.net/?appName=FixMyCity
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## Authentication

Admin endpoints require Bearer token:

```
Authorization: Bearer <ADMIN_PASSWORD>
```

The token is the same as `ADMIN_PASSWORD` environment variable.

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Issue not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": "An issue with this DIGIPIN and category already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Points System

- **+50 points**: Issue submitted
- **+100 points**: Issue resolved by admin
- **Manual adjustment**: Via leaderboard PATCH endpoint

---

## Database Collections

All data stored in MongoDB Atlas:

### users
```json
{
  "name": "string",
  "email": "string (unique)",
  "points": "number",
  "reportCount": "number",
  "resolvedCount": "number",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

### issues
```json
{
  "id": "string (CR-XXXXXX)",
  "title": "string",
  "category": "string",
  "description": "string",
  "digiPin": "string",
  "location": "string",
  "name": "string",
  "email": "string",
  "contact": "string",
  "status": "reported | in-progress | resolved",
  "submittedAt": "ISO timestamp",
  "resolvedAt": "ISO timestamp (optional)",
  "adminNotes": "string (optional)",
  "imageData": "Base64 (optional)",
  "imageType": "MIME type (optional)"
}
```

### posts
```json
{
  "id": "string (POST-XXXXXX)",
  "issueId": "string (optional)",
  "authorName": "string",
  "authorEmail": "string",
  "title": "string",
  "caption": "string",
  "beforeImage": "Base64",
  "afterImage": "Base64 (optional)",
  "reportedAt": "ISO timestamp",
  "editedAt": "ISO timestamp (optional)",
  "likes": "number",
  "comments": "array"
}
```

---

## Frontend Integration Example

```typescript
// Create issue
const response = await fetch('/api/issues', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Pothole',
    category: 'Road & Infrastructure',
    // ... other fields
  })
});
const { data, error } = await response.json();

// Get leaderboard
const leaderboardRes = await fetch('/api/leaderboard');
const { data: leaderboard } = await leaderboardRes.json();

// Admin update issue
const adminRes = await fetch('/api/issues?id=CR-123456', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer admin123',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'in-progress',
    adminNotes: 'Work started'
  })
});
```

---

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy - Vercel automatically creates 6 serverless functions

All routes under `/api/*` are automatically deployed as serverless functions.

---

## Key Changes from Previous Version

| Previous | Current |
|----------|---------|
| 15+ files | 6 files |
| Separate routes | Route-based handling |
| VercelRequest/Response types | Plain `any` types |
| Multiple functions per feature | Single function per feature |
| Vercel Pro needed | Vercel Hobby sufficient |

---

## Support

All data is stored in MongoDB Atlas and synchronized across all users. Admin actions immediately reflect in the system for all users.
