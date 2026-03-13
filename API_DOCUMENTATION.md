# FixMyCity Backend API Documentation

## Overview

This is a complete Vercel Serverless Functions backend for the FixMyCity application. All data is synchronized through MongoDB Atlas, ensuring all users see identical values in real-time.

## Project Structure

```
api/
├── db/
│   └── mongodb.ts              # MongoDB connection utility
├── types/
│   └── index.ts                # Shared TypeScript interfaces
├── utils/
│   └── helpers.ts              # Helper functions for responses
├── users/
│   ├── register.ts             # POST /api/users/register
│   ├── all.ts                  # GET /api/users/all
│   └── [userId].ts             # GET /api/users/[userId]
├── issues/
│   ├── index.ts                # POST/GET /api/issues
│   ├── [issueId].ts            # GET/DELETE /api/issues/[issueId]
│   └── [issueId]/status.ts     # PATCH /api/issues/[issueId]/status
├── posts/
│   ├── index.ts                # POST/GET /api/posts
│   └── [postId].ts             # DELETE /api/posts/[postId]
├── leaderboard/
│   ├── index.ts                # GET /api/leaderboard
│   └── update.ts               # PATCH /api/leaderboard/update
└── admin/
    ├── login.ts                # POST /api/admin/login
    ├── issues.ts               # GET /api/admin/issues
    ├── updateIssueStatus.ts    # PATCH /api/admin/updateIssueStatus
    └── stats.ts                # GET /api/admin/stats
```

## Database Collections

### 1. **users**
Stores user information and points.

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  points: number,
  reportCount: number,
  resolvedCount: number,
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

### 2. **issues**
Stores civic issue reports.

```typescript
{
  _id: ObjectId,
  id: string (e.g., "CR-123456"),
  title: string,
  category: string,
  description: string,
  digiPin: string,
  location: string,
  name: string,
  email: string,
  contact: string,
  status: "reported" | "in-progress" | "resolved",
  submittedAt: string (ISO),
  resolvedAt?: string (ISO),
  adminNotes?: string,
  imageData?: string (Base64),
  imageType?: string (MIME type)
}
```

### 3. **posts**
Stores community success story posts.

```typescript
{
  _id: ObjectId,
  id: string (e.g., "POST-123456"),
  issueId?: string,
  authorName: string,
  authorEmail: string,
  title: string,
  caption: string,
  beforeImage: string (Base64),
  afterImage?: string (Base64),
  beforeImageType?: string,
  afterImageType?: string,
  reportedAt: string (ISO),
  editedAt?: string (ISO),
  likes: number,
  comments: Array<{
    id: string,
    authorName: string,
    text: string,
    postedAt: string (ISO)
  }>
}
```

## API Endpoints

### User APIs

#### 1. Register User
**POST** `/api/users/register`

Request:
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
    "_id": "...",
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

#### 2. Get All Users
**GET** `/api/users/all`

Response (200):
```json
{
  "success": true,
  "data": [
    { /* user object */ },
    { /* user object */ }
  ]
}
```

#### 3. Get Single User
**GET** `/api/users/[userId]`

Query Parameters:
- `userId`: ObjectId or email

Response (200):
```json
{
  "success": true,
  "data": { /* user object */ }
}
```

### Issue APIs

#### 1. Create Issue
**POST** `/api/issues`

Request:
```json
{
  "title": "Pothole on Main Street",
  "category": "Road & Infrastructure",
  "description": "Large pothole blocking traffic",
  "digiPin": "123456",
  "location": "Main Street, Block A",
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
  "data": { /* issue object with id, submittedAt, etc */ }
}
```

Note: User automatically gets 50 points for submitting an issue.

#### 2. Get All Issues
**GET** `/api/issues`

Response (200):
```json
{
  "success": true,
  "data": [ { /* issue objects */ } ]
}
```

#### 3. Get Single Issue
**GET** `/api/issues/[issueId]`

Response (200):
```json
{
  "success": true,
  "data": { /* issue object */ }
}
```

#### 4. Update Issue Status (Admin)
**PATCH** `/api/issues/[issueId]/status`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Request:
```json
{
  "status": "resolved",
  "adminNotes": "Issue resolved on 2024-01-15"
}
```

Response (200):
```json
{
  "success": true,
  "data": { /* updated issue object */ }
}
```

Note: User gets +100 points when issue is resolved.

#### 5. Delete Issue (Admin)
**DELETE** `/api/issues/[issueId]`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Response (200):
```json
{
  "success": true,
  "data": { "message": "Issue deleted successfully" }
}
```

### Post APIs

#### 1. Create Community Post
**POST** `/api/posts`

Request:
```json
{
  "issueId": "CR-123456",
  "authorName": "Jane Smith",
  "authorEmail": "jane@example.com",
  "title": "Road Fixed!",
  "caption": "The pothole has been successfully repaired!",
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
  "data": { /* post object */ }
}
```

#### 2. Get All Posts
**GET** `/api/posts`

Response (200):
```json
{
  "success": true,
  "data": [ { /* post objects */ } ]
}
```

#### 3. Delete Post (Admin)
**DELETE** `/api/posts/[postId]`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Response (200):
```json
{
  "success": true,
  "data": { "message": "Post deleted successfully" }
}
```

### Leaderboard APIs

#### 1. Get Leaderboard
**GET** `/api/leaderboard`

Response (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "User Name",
      "email": "user@example.com",
      "points": 500,
      "reportCount": 10,
      "resolvedCount": 5,
      "rank": 1
    }
  ]
}
```

#### 2. Update Leaderboard Points (Admin)
**PATCH** `/api/leaderboard/update`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Request:
```json
{
  "email": "user@example.com",
  "pointsToAdd": 50
}
```

Response (200):
```json
{
  "success": true,
  "data": {
    "message": "Points updated successfully",
    "user": { /* updated user object */ }
  }
}
```

### Admin APIs

#### 1. Admin Login
**POST** `/api/admin/login`

Request:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response (200):
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

#### 2. Get All Issues (Admin)
**GET** `/api/admin/issues`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Query Parameters:
- `status`: Filter by status (reported, in-progress, resolved)
- `category`: Filter by category

Response (200):
```json
{
  "success": true,
  "data": [ { /* issue objects */ } ]
}
```

#### 3. Update Issue Status (Admin)
**PATCH** `/api/admin/updateIssueStatus`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Request:
```json
{
  "issueId": "CR-123456",
  "status": "in-progress",
  "adminNotes": "Work started"
}
```

Response (200):
```json
{
  "success": true,
  "data": {
    "message": "Issue status updated successfully",
    "issue": { /* updated issue object */ }
  }
}
```

#### 4. Get System Statistics (Admin)
**GET** `/api/admin/stats`

Headers:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

Response (200):
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalIssues": 500,
    "activeUsers": 120,
    "totalPosts": 80,
    "resolvedIssues": 300,
    "resolutionRate": 60
  }
}
```

## Points System

- **+50 points**: Issue submitted
- **+100 points**: Issue resolved by admin
- **Manual adjustments**: Via leaderboard update endpoint

## Security

### Authorization
- Admin endpoints require Bearer token authorization
- Token = ADMIN_PASSWORD environment variable
- Implementation: `Authorization: Bearer <token>`

### Data Validation
- Email validation on all user inputs
- Duplicate issue prevention (same digiPin + category)
- Required field validation
- Status validation (only: reported, in-progress, resolved)

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
  "error": "Unauthorized: Invalid token"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
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

## Environment Variables

Required for deployment:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=FixMyCity

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Real-time Data Synchronization

All data flows through MongoDB Atlas, ensuring:
- All users see synchronized data from the database
- Admin actions immediately reflect across all clients
- Statistics are calculated from live database queries
- No local storage of critical data

## Integration with React Frontend

The frontend should call these endpoints to:

1. **Register users**: POST /api/users/register
2. **Submit issues**: POST /api/issues
3. **Fetch leaderboard**: GET /api/leaderboard
4. **Fetch community posts**: GET /api/posts
5. **Admin login**: POST /api/admin/login
6. **Admin dashboard**: Use admin endpoints with authorization header

Example fetch from React:

```typescript
const response = await fetch('/api/issues', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Issue title',
    category: 'Road & Infrastructure',
    // ... other fields
  })
});
const data = await response.json();
```

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

All `/api/*` routes are automatically serverless functions on Vercel.
