// pages/api/submitFormUser.ts
import  { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db'
import AdmissionFormUser, { IAdmissionFormUser } from "./models/AdmissionFormUser";
import nodemailer from "nodemailer";
import acceptingTemplate from '../templates/acceptingTemplate';



connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, prenome, email, post } = req.body;

    try {
      const user = await AdmissionFormUser.findOne({ email });

      if (user) {
        user.items.push({name, prenome, email, post });
        await user.save();
      } else {
        const newUser: IAdmissionFormUser = new AdmissionFormUser({
          email,
          items: [{ name, prenome, email, post }],
        });
        await newUser.save();
      }

      // Set up Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER as string,
        to: email,
        subject: 'Admission User',
        html: acceptingTemplate({ name, email }),
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      let errorMessage = 'User registering failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ message: errorMessage });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await AdmissionFormUser.find();
      res.setHeader('Cache-Control', 'no-store'); // Disable caching
      res.status(200).json(users);
    } catch (error) {
      let errorMessage = 'Failed to fetch users';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ message: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
