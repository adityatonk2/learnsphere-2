import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'nexmentor';

let cachedClient: MongoClient | null = null;
let cachedClientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local.');
  }

  if (cachedClientPromise) {
    return cachedClientPromise;
  }

  // In dev, stash the promise on the global object so hot-reloads reuse the
  // same connection instead of exhausting the connection pool.
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    cachedClientPromise = global._mongoClientPromise;
  } else {
    cachedClientPromise = new MongoClient(uri).connect();
  }

  return cachedClientPromise;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  cachedClient = await getClientPromise();
  return cachedClient;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
