import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormUser, { IAdmissionFormUser } from "./models/AdmissionFormUser";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { generateToken } from "./lib/jwt";
import { verify } from "jsonwebtoken";
import acceptingLoginTemplate from '../templates/acceptingLogin';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      // Verify the token and extract the user ID
      const decoded = verify(authToken, process.env.JWT_SECRET as string) as { id: string };
      const userId = decoded.id;

      const { name, prenome, email, password, post,
        numberOfUserIds,
        numberOfInterviews,
        numberOfUserNote,
        numberOfUserIdsClient,
        numberOfUserIdsInterClient,
        numberOfUserIdsNoteClient,
        numberOfUserIdsConfirmClient,
        percentage_affectation,
        percentage,
        salary_net,
        salary_month,
        prima,

       } = req.body;
      const user = await AdmissionFormUser.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newForm: IAdmissionFormUser = new AdmissionFormUser({
        userId,
        name,
        prenome,
        email,
        password: hashedPassword,
        post,
        numberOfUserIds,
        numberOfInterviews,
        numberOfUserNote,
        numberOfUserIdsClient,
        numberOfUserIdsInterClient,
        numberOfUserIdsNoteClient,
        numberOfUserIdsConfirmClient,
        percentage_affectation,
        percentage,
        salary_net,
        salary_month,
        prima,
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
        html: acceptingLoginTemplate({ name, email, password }),
      });

      res.status(201).json({ message: "User registered successfully", token: userToken });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: "User registration failed", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "User registration failed", error: 'Unexpected error' });
      }
    }
  } else if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const form = await AdmissionFormUser.findById(id);

        if (!form) {
          return res.status(404).json({ message: "Form not found" });
        }

        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.status(200).json(form);
      } else {
        const forms = await AdmissionFormUser.find();
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.status(200).json(forms);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch forms" });    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
