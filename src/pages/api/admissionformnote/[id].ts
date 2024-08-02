import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import AdmissionForm from '../../../models/AdmissionFormProf'; // Adjust the import path as necessary

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to the database
  await connectToDatabase();

  // Ensure the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  // Check if ID is valid
  if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    // Fetch the admission form by ID
    const admission = await AdmissionForm.findById(id);
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json(admission);
  } catch (error) {
    console.error('Error fetching admission:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
