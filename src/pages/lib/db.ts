// mongoose.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri, {
      // Other options can be specified if needed, but useNewUrlParser and useUnifiedTopology are no longer required separately
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;





