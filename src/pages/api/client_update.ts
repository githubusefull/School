import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import AdmissionFormClient, { IAdmissionFormClient } from './models/AdmissionFormClient'; // Adjust the import path as needed
import nodemailer from 'nodemailer';
import interviewTemplate from '../templates/InterviewTemplate';
import { format } from 'date-fns';

// Connect to MongoDB
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI as string); // Ensure MONGO_URI is set in your environment variables
};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER as string, // Ensure EMAIL_USER is set in your environment variables
    pass: process.env.EMAIL_PASS as string, // Ensure EMAIL_PASS is set in your environment variables
  },
});

// Update admission form by ID
const updateAdmissionFormById = async (id: string, updateData: Partial<IAdmissionFormClient>) => {
  try {
    const updatedDocument = await AdmissionFormClient.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedDocument;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === 'PUT') {
    try {
      const { id, updateData } = req.body;

      if (!id || !updateData) {
        return res.status(400).json({ message: 'Invalid request data' });
      }

      console.log('Received ID:', id);
      console.log('Received updateData:', updateData);

      const document = await AdmissionFormClient.findById(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const email = document.email;
      const name = document.name;

      // Check and update the counter
      if (updateData.counter !== undefined) {
        if (typeof updateData.counter === 'number' && !isNaN(updateData.counter)) {
          updateData.counter = (document.counter || 0) + updateData.counter;
        } else {
          return res.status(400).json({ message: 'Invalid counter value' });
        }
      }

      // Update the document with new data
      const updatedDocument = await updateAdmissionFormById(id, updateData);

      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const date_interview = updatedDocument.date_interview;

      if (date_interview) {
        const formattedDate = format(new Date(date_interview), 'dd-MM-yyyy');

        console.log('Sending email to:', email);

        // Send email
        await transporter.sendMail({
          from: process.env.EMAIL_USER as string,
          to: email, // sending to the user's email
          subject: 'Client Confirmation',
          html: interviewTemplate({ name, email, date_interview: formattedDate }),
        });
      }

      res.status(200).json({ message: 'Successfully updated document', data: updatedDocument });
    } catch (error) {
      console.error('Error updating document:', error);

      // Type assertion for error handling
      if (error instanceof Error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: 'Unknown error' });
      }
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

