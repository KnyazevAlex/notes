import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
console.log("MONGO_URI:", MONGO_URI) // Debugging line to check the value of MONGO_URI


if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection
 * across hot reloads in development.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

// 1. Check if it exists on global, if not, initialize it directly on global
if (!cached) {
  global.mongooseCache = { conn: null, promise: null };
}

async function connectToMongo() {
  console.log("Checking database connection status...");

  // 2. Always point directly to the global object
  if (global.mongooseCache.conn) {
    console.log("Using cached MongoDB connection");
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    try {
      console.log("No cached connection found. Creating new connection promise...");
      global.mongooseCache.promise = mongoose.connect(MONGO_URI, {
        bufferCommands: false,
      });
      console.log("Successfully created MongoDB connection promise.");
    } catch (err) {
      global.mongooseCache.promise = null; 
      throw new Error("Failed to connect to MongoDB: " + err);
    }
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default connectToMongo;