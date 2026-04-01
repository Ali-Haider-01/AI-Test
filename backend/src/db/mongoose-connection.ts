import mongoose from 'mongoose';

export async function connectMongoDB(uri: string): Promise<void> {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Please set it in your .env file.');
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${uri}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}
