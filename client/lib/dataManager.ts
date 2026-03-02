// Data Manager - Handle all data persistence with localStorage

export interface CivicIssue {
  id: string;
  title: string;
  category: string;
  description: string;
  digiPin: string;
  location: string;
  name: string;
  email: string;
  contact: string;
  status: "reported" | "in-progress" | "resolved";
  submittedAt: string;
  resolvedAt?: string;
  adminNotes?: string;
  imageData?: string; // Base64 encoded image
  imageType?: string; // mime type
}

export interface CommunityPost {
  id: string;
  issueId?: string; // reference to original issue if any
  authorName: string;
  authorEmail: string;
  title: string;
  caption: string;
  beforeImage: string; // Base64
  afterImage?: string; // Base64
  beforeImageType?: string; // mime type
  afterImageType?: string; // mime type
  reportedAt: string;
  editedAt?: string;
  likes: number;
  comments: Array<{
    id: string;
    authorName: string;
    text: string;
    postedAt: string;
  }>;
}

export interface UserPoints {
  name: string;
  email: string;
  points: number;
  reportCount: number;
  resolvedCount: number;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

const STORAGE_KEYS = {
  ISSUES: "civic_issues",
  USER_POINTS: "user_points",
  ADMIN_CREDENTIALS: "admin_credentials",
  COMMUNITY_POSTS: "community_posts",
};

// Initialize default admin credentials
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123",
};

// Initialize default data
export function initializeData() {
  // Check if data exists, if not, initialize
  if (!localStorage.getItem(STORAGE_KEYS.ISSUES)) {
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER_POINTS)) {
    localStorage.setItem(STORAGE_KEYS.USER_POINTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_CREDENTIALS)) {
    localStorage.setItem(
      STORAGE_KEYS.ADMIN_CREDENTIALS,
      JSON.stringify(DEFAULT_ADMIN)
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMUNITY_POSTS)) {
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_POSTS, JSON.stringify([]));
  }
}

// Issue Management
export function addIssue(issue: Omit<CivicIssue, "id" | "submittedAt">): CivicIssue {
  const issues = getAllIssues();
  const newIssue: CivicIssue = {
    ...issue,
    id: `CR-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
  };

  issues.push(newIssue);
  localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));

  // Update user points
  updateUserPoints(issue.name, issue.email, 50);

  return newIssue;
}

export function getAllIssues(): CivicIssue[] {
  const data = localStorage.getItem(STORAGE_KEYS.ISSUES);
  return data ? JSON.parse(data) : [];
}

export function getIssueById(id: string): CivicIssue | null {
  const issues = getAllIssues();
  return issues.find((issue) => issue.id === id) || null;
}

export function updateIssue(id: string, updates: Partial<CivicIssue>): CivicIssue | null {
  const issues = getAllIssues();
  const index = issues.findIndex((issue) => issue.id === id);

  if (index === -1) return null;

  const updatedIssue = { ...issues[index], ...updates };
  issues[index] = updatedIssue;

  localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));

  // If status changed to resolved, add points
  if (
    updates.status === "resolved" &&
    issues[index].status !== "resolved"
  ) {
    updateUserPoints(updatedIssue.name, updatedIssue.email, 100);
  }

  return updatedIssue;
}

export function deleteIssue(id: string): boolean {
  const issues = getAllIssues();
  const filtered = issues.filter((issue) => issue.id !== id);

  if (filtered.length === issues.length) return false; // Issue not found

  localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(filtered));
  return true;
}

export function getIssuesByCategory(category: string): CivicIssue[] {
  const issues = getAllIssues();
  return issues.filter((issue) => issue.category === category);
}

export function getIssuesByStatus(
  status: "reported" | "in-progress" | "resolved"
): CivicIssue[] {
  const issues = getAllIssues();
  return issues.filter((issue) => issue.status === status);
}

// Validate Duplicate Issue (same digipin + same category)
export function isDuplicateIssue(digiPin: string, category: string): boolean {
  const issues = getAllIssues();
  return issues.some(
    (issue) => issue.digiPin === digiPin && issue.category === category
  );
}

// User Points Management
function updateUserPoints(name: string, email: string, points: number) {
  const users = getAllUserPoints();
  const existingIndex = users.findIndex((user) => user.email === email);

  if (existingIndex > -1) {
    users[existingIndex].points += points;
    if (points === 50) users[existingIndex].reportCount += 1;
    if (points === 100) users[existingIndex].resolvedCount += 1;
  } else {
    users.push({
      name,
      email,
      points,
      reportCount: points === 50 ? 1 : 0,
      resolvedCount: points === 100 ? 1 : 0,
    });
  }

  localStorage.setItem(STORAGE_KEYS.USER_POINTS, JSON.stringify(users));
}

export function getAllUserPoints(): UserPoints[] {
  const data = localStorage.getItem(STORAGE_KEYS.USER_POINTS);
  const users = data ? JSON.parse(data) : [];
  // Sort by points descending
  return users.sort((a: UserPoints, b: UserPoints) => b.points - a.points);
}

// Admin Credentials
export function getAdminCredentials(): AdminCredentials {
  const data = localStorage.getItem(STORAGE_KEYS.ADMIN_CREDENTIALS);
  return data ? JSON.parse(data) : DEFAULT_ADMIN;
}

export function updateAdminCredentials(username: string, password: string): boolean {
  localStorage.setItem(
    STORAGE_KEYS.ADMIN_CREDENTIALS,
    JSON.stringify({ username, password })
  );
  return true;
}

export function validateAdminLogin(username: string, password: string): boolean {
  const admin = getAdminCredentials();
  return admin.username === username && admin.password === password;
}

// Community Posts Management
export function addCommunityPost(post: Omit<CommunityPost, "id" | "reportedAt" | "likes" | "comments">): CommunityPost {
  const posts = getAllCommunityPosts();
  const newPost: CommunityPost = {
    ...post,
    id: `POST-${Date.now().toString().slice(-6)}`,
    reportedAt: new Date().toISOString(),
    likes: 0,
    comments: [],
  };

  posts.push(newPost);
  localStorage.setItem(STORAGE_KEYS.COMMUNITY_POSTS, JSON.stringify(posts));
  return newPost;
}

export function getAllCommunityPosts(): CommunityPost[] {
  const data = localStorage.getItem(STORAGE_KEYS.COMMUNITY_POSTS);
  return data ? JSON.parse(data) : [];
}

export function getCommunityPostById(id: string): CommunityPost | null {
  const posts = getAllCommunityPosts();
  return posts.find((post) => post.id === id) || null;
}

export function updateCommunityPost(id: string, updates: Partial<CommunityPost>): CommunityPost | null {
  const posts = getAllCommunityPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return null;

  const updatedPost = { ...posts[index], ...updates, editedAt: new Date().toISOString() };
  posts[index] = updatedPost;

  localStorage.setItem(STORAGE_KEYS.COMMUNITY_POSTS, JSON.stringify(posts));
  return updatedPost;
}

export function likeCommunityPost(id: string): CommunityPost | null {
  const post = getCommunityPostById(id);
  if (!post) return null;

  return updateCommunityPost(id, { likes: post.likes + 1 });
}

export function addCommentToPost(
  postId: string,
  authorName: string,
  text: string
): CommunityPost | null {
  const post = getCommunityPostById(postId);
  if (!post) return null;

  const newComment = {
    id: `COMMENT-${Date.now().toString().slice(-6)}`,
    authorName,
    text,
    postedAt: new Date().toISOString(),
  };

  const updatedComments = [...post.comments, newComment];
  return updateCommunityPost(postId, { comments: updatedComments });
}

export function deleteCommunityPost(id: string): boolean {
  const posts = getAllCommunityPosts();
  const filtered = posts.filter((post) => post.id !== id);

  if (filtered.length === posts.length) return false;

  localStorage.setItem(STORAGE_KEYS.COMMUNITY_POSTS, JSON.stringify(filtered));
  return true;
}
