import mongoose, { Connection, ConnectOptions } from "mongoose";

// Declare global variables for caching connections
declare global {
  var _regionDB: Connection | null;
};

const mongooseConnectOptions: ConnectOptions = {
  serverSelectionTimeoutMS: 30000, // Time out after 30s if MongoDB is unreachable
  maxPoolSize: 50,                 // Limit the number of concurrent connections
  minPoolSize: 5,                  // Maintain at least 5 connections
  socketTimeoutMS: 45000,          // Close sockets after 45s of inactivity
};

export const initializeRegionDB = async (): Promise<Connection> => {
  if (global._regionDB) {
    return global._regionDB;
  }

  try {
    const regionDB = mongoose.createConnection(process.env.MONGODB_URI || "", mongooseConnectOptions);

    await regionDB.asPromise();
    global._regionDB = regionDB;
    return regionDB;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export const getRegionDB = async (): Promise<Connection> => {
  if (!global._regionDB) {
    console.warn("RegionDB is not initialized. Reinitializing...");
    await initializeRegionDB();
  }

  if (global._regionDB?.readyState !== 1) {
    console.warn("RegionDB connection is not open. Reconnecting...");
    await global._regionDB?.asPromise();
  }

  return global._regionDB!;
};