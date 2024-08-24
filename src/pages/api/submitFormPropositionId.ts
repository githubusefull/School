import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormProposition, { IAdmissionFormProposition } from "./models/AdmissionProposition";


connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
      prof_telephone,
      client_telephone,
      prof_ville,
      client_ville,
      //ycv_Photo,
    } = req.body;

   

    try {
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
        prof_telephone,
        client_telephone,
        prof_ville,
        client_ville,
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

        const form = await AdmissionFormProposition.findById(id);
        if (!form) {
          return res.status(404).json({ message: "Form not found" });
        }

        res.status(200).json(form);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch form" });
      }
    } else {
      try {
        const forms = await AdmissionFormProposition.find();
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
