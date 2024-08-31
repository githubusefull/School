import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from './lib/db';
import AdmissionFormAffectation from "./models/AdmissionFormAffectation";

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
        prof_telephone,
        client_telephone,
        prof_ville,
        client_ville,
        price_ticket_default,
        total_pocheet,
        price_Ticket,
        price_Total,
        price_Prof,
        number_ticket_Comsum,
        number_ticket_Prof,
        acceptation_Payement,
        number_ticket_Total,
        pochette_prof,
        userIdAffecation,
        userIdArchiver,
        userIdPayer,
        etat_affectation,
        reclamation,
        counter

      } = req.body;

      const newForm = new AdmissionFormAffectation({
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
        prof_telephone,
        client_telephone,
        price_total,
        ticketNumber,
        price_prof,
        price_ticket,
        prof_ville,
        client_ville,
        price_ticket_default,
        total_pocheet,
        price_Ticket,
        price_Total,
        price_Prof,
        number_ticket_Comsum,
        number_ticket_Prof,
        acceptation_Payement,
        number_ticket_Total,
        pochette_prof,
        userIdAffecation,
        userIdArchiver,
        userIdPayer,
        etat_affectation,
        reclamation,
        counter



      });
    
      await newForm.save();
      res.status(201).json({ message: "Proposition registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error registering proposition:', error.message);
        res.status(500).json({ message: "Proposition registering failed", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "Proposition registering failed", error: 'Unexpected error' });
      }
    }
  } else if (req.method === "GET") {
    try {
      const forms = await AdmissionFormAffectation.find();
      res.setHeader('Cache-Control', 'no-store'); // Disable caching
      res.status(200).json(forms);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching forms:', error.message);
        res.status(500).json({ message: "Failed to fetch forms", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "Failed to fetch forms", error: 'Unexpected error' });
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Form ID is required" });
      }

      const deletedForm = await AdmissionFormAffectation.findByIdAndDelete(id);

      if (!deletedForm) {
        return res.status(404).json({ message: "Form not found" });
      }

      res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting form:', error.message);
        res.status(500).json({ message: "Failed to delete form", error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: "Failed to delete form", error: 'Unexpected error' });
      }
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
