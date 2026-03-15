import { MongoClient } from 'mongodb'

let cachedClient = null
let cachedDb = null

const MONGODB_URI =
process.env.MONGODB_URI ||
'mongodb+srv://rsahusindurkar_db_user@fixmycity.khpualp.mongodb.net/?appName=FixMyCity'

const DB_NAME = 'fixmycity'

export async function connectToDatabase() {
if (cachedClient && cachedDb) {
return { client: cachedClient, db: cachedDb }
}

const client = new MongoClient(MONGODB_URI)

await client.connect()

const db = client.db(DB_NAME)

cachedClient = client
cachedDb = db

return { client, db }
}

export async function getDatabase() {
const { db } = await connectToDatabase()
return db
}

export async function getCollection(collectionName) {
const db = await getDatabase()
return db.collection(collectionName)
}
