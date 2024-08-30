import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import AdmissionFormAffectation from '../models/AdmissionFormAffectation'; // Adjust the import path as necessary

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to the database
  await connectToDatabase();

  const { id } = req.query;

  // Check if ID is valid
  if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch the admission form by ID
      const admission = await AdmissionFormAffectation.findById(id);
      if (!admission) {
        return res.status(404).json({ message: 'Admission not found' });
      }
      res.status(200).json(admission);
    } else if (req.method === 'DELETE') {
      // Delete the admission form by ID
      const deletedAdmission = await AdmissionFormAffectation.findByIdAndDelete(id);
      if (!deletedAdmission) {
        return res.status(404).json({ message: 'Admission not found' });
      }
      res.status(200).json({ message: 'Admission deleted successfully' });
    } else {
      // Method not allowed
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error processing request:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
