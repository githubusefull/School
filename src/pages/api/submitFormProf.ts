import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormProf, { IAdmissionFormProf } from "./models/AdmissionFormProf";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import acceptingTemplate from '../templates/acceptingTemplate';
import { generateToken } from "./lib/jwt";
import { verify } from "jsonwebtoken";

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

      const {
        name, prenome, email, password, ville, quartiers_Rabat, quartiers_Casablanca, 
        situation_professionelle, niveau_atteint_dans_les_etudes, experiences_dans_l_enseignement, 
        cursus_economique_Commercial, specialte, motorise, telephone_portable, 
        matiere_1, niveau_1, niveau_1_note, matiere_2, niveau_2, niveau_2_note, 
        matiere_3, niveau_3, niveau_3_note, matiere_4, niveau_4, niveau_4_note, 
        matiere_5, niveau_5, niveau_5_note, matiere_6, niveau_6, niveau_6_note, 
        note_de_Francaise, note_de_CV, motivation, civilite, telephone_fixe, 
        annee_obtention_du_Bac, date_de_naissance
      } = req.body;

      const user = await AdmissionFormProf.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newForm: IAdmissionFormProf = new AdmissionFormProf({
        userId,
        name,
        prenome,
        email,
        password: hashedPassword,
        ville,
        quartiers_Rabat,
        quartiers_Casablanca,
        situation_professionelle,
        niveau_atteint_dans_les_etudes,
        experiences_dans_l_enseignement,
        cursus_economique_Commercial,
        specialte,
        motorise,
        telephone_portable,
        matiere_1,
        niveau_1,
        niveau_1_note,
        matiere_2,
        niveau_2,
        niveau_2_note,
        matiere_3,
        niveau_3,
        niveau_3_note,
        matiere_4,
        niveau_4,
        niveau_4_note,
        matiere_5,
        niveau_5,
        niveau_5_note,
        matiere_6,
        niveau_6,
        niveau_6_note,
        note_de_Francaise,
        note_de_CV,
        motivation,
        civilite,
        telephone_fixe,
        annee_obtention_du_Bac,
        date_de_naissance,
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
        to: email,
        subject: "Admission Form Submission Confirmation",
        html: acceptingTemplate({ name, email }),
      });

      res.status(201).json({ message: "User registered successfully", token: userToken});
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: "User registering failed", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "User registering failed", error: 'Unexpected error' });
      }
    }
  } else if (req.method === "GET") {
    try {
      const forms = await AdmissionFormProf.find();
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
