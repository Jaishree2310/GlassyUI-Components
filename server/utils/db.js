import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    console.warn(
      'Proceeding without an active database. Some database-related features will be unavailable.',
    );
  }
};

export default connectDB;
