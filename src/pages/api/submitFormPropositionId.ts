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
        date_proposition,
        time_proposition,
        userIdProposition,
        userIdClient,
        finalTotal,
        matiere_1,
        niveau_1,
      //ycv_Photo,
    } = req.body;

   

    try {
      const newForm: IAdmissionFormProposition = new AdmissionFormProposition({
        date_proposition,
        time_proposition,
        userIdProposition,
        userIdClient,
        finalTotal,
        matiere_1,
        niveau_1,
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
