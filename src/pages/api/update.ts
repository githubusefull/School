import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import AdmissionForm from '../models/AdmissionsForm'; // Adjust the import path as needed
import nodemailer from "nodemailer";
import interviewTemplate from '../templates/InterviewTemplate';
import { format } from 'date-fns';  // or import moment from 'moment';

// Connect to MongoDB
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI as string); // Ensure MONGO_URI is set in your environment variables
};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohamedabdelwahidi@gmail.com",
    pass: "idod mjiw tokl axej",
  },
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === 'PUT') {
    try {
      const { id, updateData } = req.body;

      // Validate input data here if needed


      const document = await AdmissionForm.findById(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const email = document.email;
      const name = document.name;
      const date_interview = document.date_interview;


      const updatedDocument = await AdmissionForm.findByIdAndUpdate(
        id,
        updateData,
        
       
        { new: true, runValidators: true }
      );

      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const formattedDate = format(new Date(date_interview), 'dd-MM-yyyy');

      console.log('Sending email to:', email);


 // Send email
 await transporter.sendMail({
  from: "mohamedabdelwahidi@gmail.com",
  to: email, // sending to the user's email
  subject: "Admission Form Submission Confirmation",
  html: interviewTemplate({ name, email, date_interview: formattedDate }), // Define the acceptingTemplate function or import it
});


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
