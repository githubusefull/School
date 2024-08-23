import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormProposition, { IAdmissionFormProposition } from "./models/AdmissionProposition";
//import bcrypt from "bcrypt";
//import nodemailer from "nodemailer";
//import acceptingTemplate from '../templates/acceptingTemplate';
//import { generateToken } from "./lib/jwt";
//import { verify } from "jsonwebtoken";

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    

    try {
      

      const {
        monday_proposition,
        tuesday_proposition,
        wednesday_proposition,
        thursday_proposition,
        friday_proposition,
        saturday_proposition,
        sunday_proposition,
        monday_time,
        tuesday_time,
        wednesday_time,
        thursday_time,
        friday_time,
        saturday_time,
        sunday_time,
        userIdProposition,
        userIdClient,
        userIdProfesseur,
        finalTotal,
        matiere_1,
        niveau_1,
        matiere_2,
        niveau_2,
        matiere_3,
        niveau_3,
        matiere_4,
        niveau_4,
        matiere_5,
        niveau_5,
        matiere_6,
        niveau_6,
        emailClient,
        emailProf,
        nameClient,
        nameProf,
        price_total,
        ticketNumber,
        price_prof,
        price_ticket,

      } = req.body;

    
        //return res.status(400).json({ message: "User already exists" });
 


      const newForm: IAdmissionFormProposition = new AdmissionFormProposition({
        monday_proposition,
        tuesday_proposition,
        wednesday_proposition,
        thursday_proposition,
        friday_proposition,
        saturday_proposition,
        sunday_proposition,
        monday_time,
        tuesday_time,
        wednesday_time,
        thursday_time,
        friday_time,
        saturday_time,
        sunday_time,
        userIdProposition,
        userIdClient,
        finalTotal,
        matiere_1,
        niveau_1,
        userIdProfesseur,
        matiere_2,
        niveau_2,
        matiere_3,
        niveau_3,
        matiere_4,
        niveau_4,
        matiere_5,
        niveau_5,
        matiere_6,
        niveau_6,
        emailClient,
        emailProf,
        nameClient,
        nameProf,
        price_total,
        ticketNumber,
        price_prof,
        price_ticket,
      });
    
      await newForm.save();
    
      // Set up Nodemailer
      {/*           
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
        to: email,
        subject: "Admission Form Submission Confirmation",
        html: acceptingTemplate({ name, email }),
      });
*/}
      res.status(201).json({ message: "Proposition registered successfully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: "Proposition registering failed", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "Proposition registering failed", error: 'Unexpected error' });
      }
    }
  } else if (req.method === "GET") {
    
    try {
      const forms = await AdmissionFormProposition.find();
      res.setHeader('Cache-Control', 'no-store'); // Disable caching
      res.status(200).json(forms);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching forms:', error.message);
        res.status(500).json({ message: "Failed to fetch forms", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "Failed to fetch forms", error: 'Unexpected error' });
      }
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
