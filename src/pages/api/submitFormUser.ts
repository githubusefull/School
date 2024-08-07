import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormUser, { IAdmissionFormUser } from "./models/AdmissionFormUser";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import acceptingTemplate from '../templates/acceptingTemplate';
import { generateToken } from "./lib/jwt";
//import { verify } from "jsonwebtoken";

// Import the refusing template if needed in the future
// import refusingTemplate from '../templates/refusingTemplate';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
   

    try {
      // Verify the token and extract the user ID
      //const decoded = verify(authToken, process.env.JWT_SECRET as string) as { id: string };
      //const userId = decoded.id;

      const { name, prenome, email, password, post } = req.body;
      const user = await AdmissionFormUser.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newForm: IAdmissionFormUser = new AdmissionFormUser({
        name,
        prenome,
        email,
        password: hashedPassword,
        post,
      });

      await newForm.save();
      const userToken = generateToken(newForm._id.toString());

      // Set up Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER as string,
        to: email, // sending to the user's email
        subject: "Admission Form Submission Confirmation",
        html: acceptingTemplate({ name, email }),
      });

      res.status(201).json({ message: "User registered successfully", token: userToken });
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: "User registering failed", error: 'Unexpected error' });
    }
  } else if (req.method === "GET") {
    try {
      const forms = await AdmissionFormUser.find();
      res.setHeader('Cache-Control', 'no-store'); // Disable caching
      res.status(200).json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch forms" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
