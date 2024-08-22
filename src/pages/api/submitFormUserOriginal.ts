import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormUserOriginal, { IAdmissionFormUserOriginal } from "./models/AdmissionFormUserOriginal";
import nodemailer from "nodemailer";

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    

    try {
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

       {/*  
      const user = await AdmissionFormUserOriginal.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }*/}
      //const hashedPassword = await bcrypt.hash(password, 10);

      const newForm: IAdmissionFormUserOriginal = new AdmissionFormUserOriginal({
        name,
        prenome,
        email,
        password,
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
      //const userToken = generateToken(newForm._id.toString());

      // Set up Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER as string,
          pass: process.env.EMAIL_PASS as string,
        },
      });

      // Send email
      

      res.status(201).json({ message: "User Added successfully",  });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: "User Added failed", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "User Added failed", error: 'Unexpected error' });
      }
    }
  } else if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const form = await AdmissionFormUserOriginal.findById(id);

        if (!form) {
          return res.status(404).json({ message: "Form not found" });
        }

        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.status(200).json(form);
      } else {
        const forms = await AdmissionFormUserOriginal.find();
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
