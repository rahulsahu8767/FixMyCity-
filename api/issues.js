import { getCollection } from './lib/db.js'
import { sendResponse, validateEmail, generateIssueId } from './lib/helpers.js'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
try {
if (req.method === 'GET') {
return handleGetIssues(req, res)
} else if (req.method === 'POST') {
return handleCreateIssue(req, res)
} else if (req.method === 'PATCH') {
return handleUpdateIssueStatus(req, res)
} else if (req.method === 'DELETE') {
return handleDeleteIssue(req, res)
} else {
return sendResponse(res, 405, null, 'Method not allowed')
}
} catch (error) {
console.error('API Error:', error)
return sendResponse(res, 500, null, 'Internal server error')
}
}

async function handleGetIssues(req, res) {
try {
const { id } = req.query
const issuesCollection = await getCollection('issues')

```
if (id) {
  let issue

  try {
    issue = await issuesCollection.findOne({ _id: new ObjectId(id) })
  } catch {
    issue = await issuesCollection.findOne({ id })
  }

  if (!issue) {
    return sendResponse(res, 404, null, 'Issue not found')
  }

  return sendResponse(res, 200, issue)
}

const issues = await issuesCollection
  .find({})
  .sort({ submittedAt: -1 })
  .toArray()

return sendResponse(res, 200, issues)
```

} catch (error) {
console.error('Get issues error:', error)
return sendResponse(res, 500, null, 'Error fetching issues')
}
}

async function handleCreateIssue(req, res) {
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
imageType
} = req.body

```
if (!title || !category || !description || !digiPin || !name || !email || !contact) {
  return sendResponse(res, 400, null, 'Missing required fields')
}

if (!validateEmail(email)) {
  return sendResponse(res, 400, null, 'Invalid email format')
}

const issuesCollection = await getCollection('issues')
const usersCollection = await getCollection('users')

const existingIssue = await issuesCollection.findOne({
  digiPin,
  category
})

if (existingIssue) {
  return sendResponse(
    res,
    409,
    null,
    'An issue with this DIGIPIN and category already exists'
  )
}

const newIssue = {
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
  imageType
}

const issueResult = await issuesCollection.insertOne(newIssue)

let user = await usersCollection.findOne({ email })

if (user) {
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $inc: { points: 50, reportCount: 1 },
      $set: { updatedAt: new Date().toISOString() }
    }
  )
} else {
  await usersCollection.insertOne({
    name,
    email,
    points: 50,
    reportCount: 1,
    resolvedCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

return sendResponse(res, 201, { _id: issueResult.insertedId, ...newIssue })
```

} catch (error) {
console.error('Create issue error:', error)
return sendResponse(res, 500, null, 'Error creating issue')
}
}

async function handleUpdateIssueStatus(req, res) {
try {
const authHeader = req.headers.authorization
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

```
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return sendResponse(res, 401, null, 'Unauthorized')
}

const token = authHeader.substring(7)

if (token !== adminPassword) {
  return sendResponse(res, 401, null, 'Invalid token')
}

const { id } = req.query
const { status, adminNotes } = req.body

if (!id || !status) {
  return sendResponse(res, 400, null, 'ID and status required')
}

if (!['reported', 'in-progress', 'resolved'].includes(status)) {
  return sendResponse(res, 400, null, 'Invalid status')
}

const issuesCollection = await getCollection('issues')
const usersCollection = await getCollection('users')

let issue

try {
  issue = await issuesCollection.findOne({ _id: new ObjectId(id) })
} catch {
  issue = await issuesCollection.findOne({ id })
}

if (!issue) {
  return sendResponse(res, 404, null, 'Issue not found')
}

const previousStatus = issue.status

const updateData = {
  status,
  updatedAt: new Date().toISOString()
}

if (adminNotes) {
  updateData.adminNotes = adminNotes
}

if (status === 'resolved' && previousStatus !== 'resolved') {
  updateData.resolvedAt = new Date().toISOString()
}

let updateResult

try {
  updateResult = await issuesCollection.updateOne(
    { _id: issue._id },
    { $set: updateData }
  )
} catch {
  updateResult = await issuesCollection.updateOne(
    { id },
    { $set: updateData }
  )
}

if (updateResult.matchedCount === 0) {
  return sendResponse(res, 404, null, 'Issue not found')
}

if (status === 'resolved' && previousStatus !== 'resolved') {
  await usersCollection.updateOne(
    { email: issue.email },
    {
      $inc: { points: 100, resolvedCount: 1 },
      $set: { updatedAt: new Date().toISOString() }
    }
  )
}

let updatedIssue

try {
  updatedIssue = await issuesCollection.findOne({ _id: issue._id })
} catch {
  updatedIssue = await issuesCollection.findOne({ id })
}

return sendResponse(res, 200, updatedIssue)
```

} catch (error) {
console.error('Update issue error:', error)
return sendResponse(res, 500, null, 'Error updating issue')
}
}

async function handleDeleteIssue(req, res) {
try {
const authHeader = req.headers.authorization
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

```
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return sendResponse(res, 401, null, 'Unauthorized')
}

const token = authHeader.substring(7)

if (token !== adminPassword) {
  return sendResponse(res, 401, null, 'Invalid token')
}

const { id } = req.query

if (!id) {
  return sendResponse(res, 400, null, 'Issue ID required')
}

const issuesCollection = await getCollection('issues')

let result

try {
  result = await issuesCollection.deleteOne({ _id: new ObjectId(id) })
} catch {
  result = await issuesCollection.deleteOne({ id })
}

if (result.deletedCount === 0) {
  return sendResponse(res, 404, null, 'Issue not found')
}

return sendResponse(res, 200, { message: 'Issue deleted successfully' })
```

} catch (error) {
console.error('Delete issue error:', error)
return sendResponse(res, 500, null, 'Error deleting issue')
}
}
