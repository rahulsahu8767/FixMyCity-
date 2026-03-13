# Complete API Endpoints Summary

## 🚀 6 Serverless Functions Ready for Vercel

Total functions: **6** (Vercel Hobby limit: 12) ✅

---

## 1️⃣ /api/issues.ts

| Operation | Method | Endpoint | Auth | Notes |
|-----------|--------|----------|------|-------|
| Create issue | POST | `/api/issues` | - | +50 points to user |
| Get all issues | GET | `/api/issues` | - | Sorted by date |
| Get single issue | GET | `/api/issues?id=<id>` | - | By ObjectId or issue id |
| Update status | PATCH | `/api/issues?id=<id>` | Bearer | +100 points if resolved |
| Delete issue | DELETE | `/api/issues?id=<id>` | Bearer | Admin only |

**POST /api/issues** (Create)
```json
Request {
  "title": "string",
  "category": "string",
  "description": "string",
  "digiPin": "string",
  "location": "string",
  "name": "string",
  "email": "string",
  "contact": "string",
  "imageData": "base64 (optional)",
  "imageType": "string (optional)"
}
```

**PATCH /api/issues?id=xxx** (Update Status)
```json
Headers { "Authorization": "Bearer <password>" }
Body {
  "status": "reported|in-progress|resolved",
  "adminNotes": "string (optional)"
}
```

---

## 2️⃣ /api/posts.ts

| Operation | Method | Endpoint | Auth | Notes |
|-----------|--------|----------|------|-------|
| Get all posts | GET | `/api/posts` | - | Sorted by date |
| Create post | POST | `/api/posts` | - | Community updates |
| Delete post | DELETE | `/api/posts?id=<id>` | Bearer | Admin only |

**POST /api/posts** (Create)
```json
Request {
  "issueId": "string (optional)",
  "authorName": "string",
  "authorEmail": "string",
  "title": "string",
  "caption": "string",
  "beforeImage": "base64",
  "afterImage": "base64 (optional)",
  "beforeImageType": "string",
  "afterImageType": "string (optional)"
}
```

---

## 3️⃣ /api/leaderboard.ts

| Operation | Method | Endpoint | Auth | Notes |
|-----------|--------|----------|------|-------|
| Get leaderboard | GET | `/api/leaderboard` | - | Top 100 users with rank |
| Update points | PATCH | `/api/leaderboard` | Bearer | Manual point adjustment |

**PATCH /api/leaderboard** (Update Points)
```json
Headers { "Authorization": "Bearer <password>" }
Body {
  "email": "string",
  "pointsToAdd": "number"
}
```

---

## 4️⃣ /api/users.ts

| Operation | Method | Endpoint | Auth | Notes |
|-----------|--------|----------|------|-------|
| Register user | POST | `/api/users` | - | New user signup |
| Get all users | GET | `/api/users` | - | Sorted by points |
| Get single user | GET | `/api/users?id=<id>` | - | By ObjectId or email |

**POST /api/users** (Register)
```json
Request {
  "name": "string",
  "email": "string"
}
```

---

## 5️⃣ /api/admin.ts

| Operation | Method | Endpoint | Auth | Notes |
|-----------|--------|----------|------|-------|
| Admin login | POST | `/api/admin?action=login` | - | Returns token |
| Get stats | GET | `/api/admin?action=stats` | Bearer | System statistics |
| Get issues | GET | `/api/admin?action=issues` | Bearer | With filters |
| Update status | PATCH | `/api/admin?action=updateStatus` | Bearer | Update issue status |

**POST /api/admin?action=login** (Login)
```json
Request {
  "username": "string",
  "password": "string"
}
Response {
  "message": "Login successful",
  "token": "admin123",
  "username": "admin"
}
```

**GET /api/admin?action=stats** (Stats)
```json
Response {
  "totalUsers": 150,
  "totalIssues": 500,
  "activeUsers": 120,
  "totalPosts": 80,
  "resolvedIssues": 300,
  "resolutionRate": 60,
  "pendingIssues": 100
}
```

**GET /api/admin?action=issues&status=reported&category=Road** (Get Issues)
```json
Response [ { issue objects } ]
```

**PATCH /api/admin?action=updateStatus** (Update Status)
```json
Headers { "Authorization": "Bearer <password>" }
Body {
  "issueId": "string",
  "status": "reported|in-progress|resolved",
  "adminNotes": "string (optional)"
}
```

---

## 6️⃣ /api/stats.ts

| Operation | Method | Endpoint | Auth | Notes |
|-----------|--------|----------|------|-------|
| Get stats | GET | `/api/stats` | - | Public statistics |

**GET /api/stats** (Public Stats)
```json
Response {
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
```

---

## Response Format (All Endpoints)

### Success
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 500 | Server Error |

---

## Authentication

Required for admin endpoints:

```bash
curl -H "Authorization: Bearer admin123" ...
```

Token = `ADMIN_PASSWORD` environment variable

---

## Quick cURL Examples

### Create Issue
```bash
curl -X POST https://domain/api/issues \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pothole",
    "category": "Road & Infrastructure",
    "description": "Large pothole on main road",
    "digiPin": "123456",
    "location": "Main Street",
    "name": "John Doe",
    "email": "john@example.com",
    "contact": "9876543210"
  }'
```

### Get Issues
```bash
curl https://domain/api/issues
```

### Get Single Issue
```bash
curl https://domain/api/issues?id=CR-123456
```

### Register User
```bash
curl -X POST https://domain/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com"}'
```

### Get Leaderboard
```bash
curl https://domain/api/leaderboard
```

### Admin Login
```bash
curl -X POST https://domain/api/admin?action=login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Update Issue Status (Admin)
```bash
curl -X PATCH https://domain/api/issues?id=CR-123456 \
  -H "Authorization: Bearer admin123" \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress", "adminNotes": "Work started"}'
```

### Get Admin Stats
```bash
curl https://domain/api/admin?action=stats \
  -H "Authorization: Bearer admin123"
```

### Get Admin Issues with Filters
```bash
curl "https://domain/api/admin?action=issues&status=reported&category=Road%20%26%20Infrastructure" \
  -H "Authorization: Bearer admin123"
```

### Update User Points (Admin)
```bash
curl -X PATCH https://domain/api/leaderboard \
  -H "Authorization: Bearer admin123" \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "pointsToAdd": 50}'
```

### Get Public Stats
```bash
curl https://domain/api/stats
```

---

## Environment Variables

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?appName=FixMyCity
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## Database Collections

### users
- `_id` (ObjectId)
- `name` (string)
- `email` (string, unique)
- `points` (number)
- `reportCount` (number)
- `resolvedCount` (number)
- `createdAt` (ISO timestamp)
- `updatedAt` (ISO timestamp)

### issues
- `_id` (ObjectId)
- `id` (string) - CR-XXXXXX
- `title` (string)
- `category` (string)
- `description` (string)
- `digiPin` (string)
- `location` (string)
- `name` (string)
- `email` (string)
- `contact` (string)
- `status` (enum) - reported|in-progress|resolved
- `submittedAt` (ISO timestamp)
- `resolvedAt` (ISO timestamp, optional)
- `adminNotes` (string, optional)
- `imageData` (base64, optional)
- `imageType` (string, optional)

### posts
- `_id` (ObjectId)
- `id` (string) - POST-XXXXXX
- `issueId` (string, optional)
- `authorName` (string)
- `authorEmail` (string)
- `title` (string)
- `caption` (string)
- `beforeImage` (base64)
- `afterImage` (base64, optional)
- `beforeImageType` (string)
- `afterImageType` (string, optional)
- `reportedAt` (ISO timestamp)
- `editedAt` (ISO timestamp, optional)
- `likes` (number)
- `comments` (array)

---

## Key Features

✅ **Points System**
- +50 points for issue submission
- +100 points when issue resolved
- Manual adjustments via admin

✅ **Authentication**
- Bearer token for admin endpoints
- Simple username/password login

✅ **Real-time Sync**
- All data in MongoDB
- All users see same data
- Admin changes immediate

✅ **Validation**
- Email validation
- Duplicate issue prevention
- Required field checks

✅ **Error Handling**
- Comprehensive error messages
- Proper HTTP status codes
- Try-catch blocks

---

**Total Endpoints: 18+ operations across 6 functions**
**Vercel Hobby Compliant: ✅ YES (6/12 limit)**
