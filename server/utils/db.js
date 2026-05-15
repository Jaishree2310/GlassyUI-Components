import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Connected');
    } else {
      console.log('⚠️ MongoDB URI not configured - database features disabled');
    }
  } catch (error) {
    console.error('⚠️ Database connection error:', error.message);
    console.log('⚠️ Chat service will work without database storage');
  }
};

export default connectDB;
