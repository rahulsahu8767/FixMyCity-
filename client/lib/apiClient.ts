/**
 * API Client - Replaces localStorage-based dataManager
 * All calls go to Vercel serverless functions
 */

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ==================== ISSUES ====================

export async function createIssue(payload: {
  title: string;
  category: string;
  description: string;
  digiPin: string;
  location: string;
  name: string;
  email: string;
  contact: string;
  imageData?: string;
  imageType?: string;
}) {
  try {
    const response = await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create issue');
    }

    console.log('✅ Issue created:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error creating issue:', error);
    throw error;
  }
}

export async function getIssues() {
  try {
    const response = await fetch('/api/issues', { method: 'GET' });
    const result: ApiResponse<any[]> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch issues');
    }

    console.log('✅ Issues fetched:', result.data?.length);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching issues:', error);
    return [];
  }
}

export async function getIssueById(id: string) {
  try {
    const response = await fetch(`/api/issues?id=${id}`, { method: 'GET' });
    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Issue not found');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching issue:', error);
    return null;
  }
}

export async function updateIssueStatus(
  id: string,
  status: 'reported' | 'in-progress' | 'resolved',
  adminNotes?: string,
  adminPassword?: string
) {
  try {
    const token = adminPassword || localStorage.getItem('adminToken') || '';

    const response = await fetch(`/api/issues?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status, adminNotes }),
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update issue');
    }

    console.log('✅ Issue status updated:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error updating issue status:', error);
    throw error;
  }
}

export async function deleteIssue(id: string, adminPassword?: string) {
  try {
    const token = adminPassword || localStorage.getItem('adminToken') || '';

    const response = await fetch(`/api/issues?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete issue');
    }

    console.log('✅ Issue deleted');
    return true;
  } catch (error) {
    console.error('❌ Error deleting issue:', error);
    throw error;
  }
}

// ==================== POSTS ====================

export async function createPost(payload: {
  issueId?: string;
  authorName: string;
  authorEmail: string;
  title: string;
  caption: string;
  beforeImage: string;
  afterImage?: string;
  beforeImageType?: string;
  afterImageType?: string;
}) {
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create post');
    }

    console.log('✅ Post created:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error creating post:', error);
    throw error;
  }
}

export async function getPosts() {
  try {
    const response = await fetch('/api/posts', { method: 'GET' });
    const result: ApiResponse<any[]> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch posts');
    }

    console.log('✅ Posts fetched:', result.data?.length);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return [];
  }
}

export async function deletePost(id: string, adminPassword?: string) {
  try {
    const token = adminPassword || localStorage.getItem('adminToken') || '';

    const response = await fetch(`/api/posts?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete post');
    }

    console.log('✅ Post deleted');
    return true;
  } catch (error) {
    console.error('❌ Error deleting post:', error);
    throw error;
  }
}

// ==================== LEADERBOARD ====================

export async function getLeaderboard() {
  try {
    const response = await fetch('/api/leaderboard', { method: 'GET' });
    const result: ApiResponse<any[]> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch leaderboard');
    }

    console.log('✅ Leaderboard fetched:', result.data?.length);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    return [];
  }
}

// ==================== USERS ====================

export async function registerUser(name: string, email: string) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to register user');
    }

    console.log('✅ User registered:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error registering user:', error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const response = await fetch('/api/users', { method: 'GET' });
    const result: ApiResponse<any[]> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch users');
    }

    console.log('✅ Users fetched:', result.data?.length);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return [];
  }
}

export async function getUserById(id: string) {
  try {
    const response = await fetch(`/api/users?id=${id}`, { method: 'GET' });
    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'User not found');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    return null;
  }
}

// ==================== ADMIN ====================

export async function adminLogin(username: string, password: string) {
  try {
    const response = await fetch('/api/admin?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    console.log('✅ Admin logged in:', result.data);
    // Store token for future requests
    if (result.data?.token) {
      localStorage.setItem('adminToken', result.data.token);
    }
    return result.data;
  } catch (error) {
    console.error('❌ Error logging in:', error);
    throw error;
  }
}

export async function getAdminStats(adminPassword?: string) {
  try {
    const token = adminPassword || localStorage.getItem('adminToken') || '';

    const response = await fetch('/api/admin?action=stats', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch stats');
    }

    console.log('✅ Stats fetched:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    throw error;
  }
}

export async function getAdminIssues(adminPassword?: string, status?: string, category?: string) {
  try {
    const token = adminPassword || localStorage.getItem('adminToken') || '';
    let url = '/api/admin?action=issues';
    if (status) url += `&status=${encodeURIComponent(status)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result: ApiResponse<any[]> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch issues');
    }

    console.log('✅ Admin issues fetched:', result.data?.length);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching admin issues:', error);
    return [];
  }
}

export async function adminUpdateIssueStatus(
  issueId: string,
  status: 'reported' | 'in-progress' | 'resolved',
  adminNotes?: string,
  adminPassword?: string
) {
  try {
    const token = adminPassword || localStorage.getItem('adminToken') || '';

    const response = await fetch('/api/admin?action=updateStatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ issueId, status, adminNotes }),
    });

    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update issue');
    }

    console.log('✅ Issue status updated:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error updating issue status:', error);
    throw error;
  }
}

// ==================== STATS ====================

export async function getPublicStats() {
  try {
    const response = await fetch('/api/stats', { method: 'GET' });
    const result: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch stats');
    }

    console.log('✅ Public stats fetched');
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    return null;
  }
}

// ==================== HELPERS ====================

export function logout() {
  localStorage.removeItem('adminToken');
  console.log('✅ Admin logged out');
}
