import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from '../../lib/db';
import AdmissionForm, { IAdmissionFormProf } from "../../models/AdmissionFormProf";
import bcrypt from "bcrypt";


connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      prenome,
      email,
      password,
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
      finalTotal,
      civilite,
      telephone_fixe,
      annee_obtention_du_Bac,
      date_de_naissance,
      //ycv_Photo,
    } = req.body;

    const user = await AdmissionForm.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newForm: IAdmissionFormProf = new AdmissionForm({
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
        finalTotal,
        civilite,
        telephone_fixe,
        annee_obtention_du_Bac,
        date_de_naissance,
        //cv_Photo,
      });

      await newForm.save();

      // Set up Nodemailer
     

      // Send email
    

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "User registering failed" });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      try {
        // Check if id is a valid MongoDB ObjectId
        if (!/^[0-9a-fA-F]{24}$/.test(id as string)) {
          return res.status(400).json({ message: "Invalid ID format" });
        }

        const form = await AdmissionForm.findById(id);
        if (!form) {
          return res.status(404).json({ message: "Form not found" });
        }

        res.status(200).json(form);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch form" });
      }
    } else {
      try {
        const forms = await AdmissionForm.find();
        res.status(200).json(forms);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch forms" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
