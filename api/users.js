import { getCollection } from './lib/db.js'
import { sendResponse, validateEmail } from './lib/helpers.js'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
try {
if (req.method === 'GET') {
return handleGetUsers(req, res)
} else if (req.method === 'POST') {
return handleRegisterUser(req, res)
} else {
return sendResponse(res, 405, null, 'Method not allowed')
}
} catch (error) {
console.error('API Error:', error)
return sendResponse(res, 500, null, 'Internal server error')
}
}

async function handleGetUsers(req, res) {
try {
const { id } = req.query
const usersCollection = await getCollection('users')

```
if (id) {
  let user

  try {
    user = await usersCollection.findOne({ _id: new ObjectId(id) })
  } catch {
    user = await usersCollection.findOne({ email: id })
  }

  if (!user) {
    return sendResponse(res, 404, null, 'User not found')
  }

  return sendResponse(res, 200, user)
} else {
  const users = await usersCollection
    .find({})
    .sort({ points: -1 })
    .toArray()

  return sendResponse(res, 200, users)
}
```

} catch (error) {
console.error('Get users error:', error)
return sendResponse(res, 500, null, 'Error fetching users')
}
}

async function handleRegisterUser(req, res) {
try {
const { name, email } = req.body

```
if (!name || !email) {
  return sendResponse(res, 400, null, 'Name and email required')
}

if (!validateEmail(email)) {
  return sendResponse(res, 400, null, 'Invalid email format')
}

const usersCollection = await getCollection('users')

const existingUser = await usersCollection.findOne({ email })

if (existingUser) {
  return sendResponse(res, 409, null, 'User already exists')
}

const newUser = {
  name,
  email,
  points: 0,
  reportCount: 0,
  resolvedCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const result = await usersCollection.insertOne(newUser)

return sendResponse(res, 201, {
  _id: result.insertedId,
  ...newUser
})
```

} catch (error) {
console.error('Register user error:', error)
return sendResponse(res, 500, null, 'Error registering user')
}
}
