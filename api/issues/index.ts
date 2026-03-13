import { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from '../db/mongodb';
import { CivicIssue, User, CreateIssueRequest } from '../types/index';
import { sendSuccess, sendError, sendServerError, generateIssueId, validateEmail } from '../utils/helpers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return handleCreateIssue(req, res);
  } else if (req.method === 'GET') {
    return handleGetIssues(req, res);
  } else {
    return sendError(res, 'Method not allowed', 405);
  }
}

async function handleCreateIssue(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      title,
      category,
      description,
      digiPin,
      location,
      name,
      email,
      contact,
      imageData,
      imageType,
    } = req.body as CreateIssueRequest;

    // Validation
    if (!title || !category || !description || !digiPin || !name || !email || !contact) {
      return sendError(res, 'Missing required fields');
    }

    if (!validateEmail(email)) {
      return sendError(res, 'Invalid email format');
    }

    const issuesCollection = await getCollection<CivicIssue>('issues');
    const usersCollection = await getCollection<User>('users');

    // Check for duplicate issue (same digiPin + category)
    const existingIssue = await issuesCollection.findOne({
      digiPin,
      category,
    });

    if (existingIssue) {
      return sendError(
        res,
        'An issue with this DIGIPIN and category already exists in the system. Please use a different DIGIPIN or category.',
        409
      );
    }

    // Create new issue
    const newIssue: CivicIssue = {
      id: generateIssueId(),
      title,
      category,
      description,
      digiPin,
      location,
      name,
      email,
      contact,
      status: 'reported',
      submittedAt: new Date().toISOString(),
      adminNotes: '',
      imageData,
      imageType,
    };

    const issueResult = await issuesCollection.insertOne(newIssue);

    // Update or create user and add points
    let user = await usersCollection.findOne({ email });

    if (user) {
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $inc: { points: 50, reportCount: 1 },
          $set: { updatedAt: new Date().toISOString() },
        }
      );
    } else {
      const newUser: User = {
        name,
        email,
        points: 50,
        reportCount: 1,
        resolvedCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await usersCollection.insertOne(newUser);
    }

    return sendSuccess(
      res,
      {
        _id: issueResult.insertedId,
        ...newIssue,
      },
      201
    );
  } catch (error) {
    return sendServerError(res, error);
  }
}

async function handleGetIssues(req: VercelRequest, res: VercelResponse) {
  try {
    const issuesCollection = await getCollection<CivicIssue>('issues');

    // Get all issues sorted by date descending
    const issues = await issuesCollection
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return sendSuccess(res, issues);
  } catch (error) {
    return sendServerError(res, error);
  }
}
