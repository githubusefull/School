import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import AdmissionForm from '../models/AdmissionsForm'; // Adjust the import path as needed

// Connect to MongoDB
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI as string); // Ensure MONGO_URI is set in your environment variables
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === 'PUT') {
    try {
      const { id, updateData } = req.body;

      // Validate input data here if needed

      const updatedDocument = await AdmissionForm.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }

      res.status(200).json(updatedDocument);
    } catch (error) {
      console.error('Error updating document:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
