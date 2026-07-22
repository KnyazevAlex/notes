import mongoose, { Connection } from "mongoose";

const MONGONOTES_URI = process.env.MONGO_URI as string;

interface mongooseCache {

auth: {

conn: Connection | null,
promise: Promise<Connection> | null

}
,
notes: {

conn: Connection | null,
promise: Promise<Connection> | null

},

session: {

conn: Connection | null,
promise: Promise<Connection> | null

}
}

declare global {
  var mongooseCache : mongooseCache | null
}

const globalCache : mongooseCache = global.mongooseCache ?? {
  auth:{
    conn: null,
    promise: null
  },
  notes:{
    conn: null,
    promise: null
  },
  session:{
    conn:null,
    promise: null,
  }
}
global.mongooseCache = globalCache


const connectToMongo = async(type: 'auth' | 'notes' | 'session') => {
  

const cache = globalCache[type]

if (!cache) {
    throw new Error(`Mongo cache missing for database: ${type}`)
}

if(cache){

if(cache.conn){
  return cache.conn
}

if(!cache.promise){

const URI = MONGONOTES_URI

const connection =  mongoose.createConnection(URI, {bufferCommands: false}).asPromise()
cache.promise = connection
}

try{

  cache.conn = await cache.promise

  return cache.conn
}
catch(err){

  cache.promise = null
  cache.conn = null

throw err
}

}

}

export default connectToMongo;