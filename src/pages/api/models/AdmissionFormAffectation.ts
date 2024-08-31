import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdmissionFormAffectation extends Document {
  monday_proposition: string;
  tuesday_proposition: string;
  wednesday_proposition: string;
  thursday_proposition: string;
  friday_proposition: string;
  saturday_proposition: string;
  sunday_proposition: string;
  monday_time: string;
  tuesday_time: string;
  wednesday_time: string;
  thursday_time: string;
  friday_time: string;
  saturday_time: string;
  sunday_time: string;
  userIdProposition: string;
  userIdClient: string;
  nameClient: string;
  emailClient: string;
  nameProf: string | undefined;
  emailProf: string | undefined;
  price_total: number;
  ticketNumber: number;
  prof_telephone: string | undefined;
  client_telephone: string;
  price_prof: number;
  price_ticket: number;
  client_ville: string;
  prof_ville: string | undefined;
  userIdProfesseur: string | undefined;
  finalTotal: number | undefined;
  matiere_1: string | undefined;
  niveau_1: string | undefined;
  matiere_2: string | undefined;
  niveau_2: string | undefined;
  matiere_3: string | undefined;
  niveau_3: string | undefined;
  matiere_4: string | undefined;
  niveau_4: string | undefined;
  matiere_5: string | undefined;
  niveau_5: string | undefined;
  matiere_6: string | undefined;
  niveau_6: string | undefined;
  pochette_prof: number;
  price_ticket_default: number;
  isAcceptedProf: boolean;
  IsAffected: boolean;
  total_pocheet: number;
  userIdAffectation: string;
  userIdArchiver: string;
  userIdPayer: string;
  id_affectation: string;
  prof_id: string;
  client_id : string;
  prix_total: number;
  prix_ticket: number;
  nombre_total_tickets: number;
  prix_ticket_prof: number;
  nombre_tickets_prof: number;
  prix_prof: number;
  nombre_tickets_demandes: number;
  acceptation_paiement: number;
  nombre_tickets_stable: number;
  planning: string;
  reclamation: string;
  paiement_agence: string;
  etat_affectation: string;

  price_Ticket: number,
  price_Total: number,
  price_Prof: number,
  number_ticket_Comsum: number,
  number_ticket_Prof: number,
  acceptation_Payement: number,
  number_ticket_Total: number,
  Increment: number,
  counter: number




  
}

const AdmissionFormAffectationSchema: Schema<IAdmissionFormAffectation> =
  new Schema({
    monday_proposition: { type: String },
    tuesday_proposition: { type: String },
    wednesday_proposition: { type: String },
    thursday_proposition: { type: String },
    friday_proposition: { type: String },
    saturday_proposition: { type: String },
    sunday_proposition: { type: String },
    monday_time: { type: String },
    tuesday_time: { type: String },
    wednesday_time: { type: String },
    thursday_time: { type: String },
    friday_time: { type: String },
    saturday_time: { type: String },
    sunday_time: { type: String },
    userIdProposition: { type: String },
    userIdClient: { type: String },
    userIdProfesseur: { type: String },
    finalTotal: { type: Number },
    matiere_1: { type: String },
    niveau_1: { type: String },
    matiere_2: { type: String },
    niveau_2: { type: String },
    matiere_3: { type: String },
    niveau_3: { type: String },
    matiere_4: { type: String },
    niveau_4: { type: String },
    matiere_5: { type: String },
    niveau_5: { type: String },
    matiere_6: { type: String },
    niveau_6: { type: String },
    nameClient: { type: String },
    nameProf: { type: String },
    emailClient: { type: String },
    emailProf: { type: String },
    price_total: { type: Number },
    ticketNumber: { type: Number },
    price_prof: { type: Number },
    price_ticket: { type: Number },
    prof_telephone: { type: String },
    client_ville: { type: String },
    prof_ville: { type: String },
    pochette_prof: { type: Number },
    price_ticket_default: { type: Number },
    client_telephone: { type: String },
    isAcceptedProf: { type: Boolean, default: false },
    IsAffected: { type: Boolean },
    userIdAffectation: {
      type: String,
    },
    userIdArchiver:{type: String},
    userIdPayer:{type: String},
    total_pocheet: {
      type: Number,
    },

    id_affectation: { type: String },
    prof_id: { type: String },
    client_id: { type: String },
    prix_total: { type: Number },
    prix_ticket: { type: Number },
    nombre_total_tickets: { type: Number },
    prix_ticket_prof: { type: Number },
    nombre_tickets_prof: { type: Number },
    prix_prof: { type: Number },
    nombre_tickets_demandes: { type: Number },
    acceptation_paiement: { type: Number },
    nombre_tickets_stable: { type: Number },
    planning: { type: String },
    reclamation: { type: String, default:'bloque reclamation' },
    paiement_agence: { type: String },
    etat_affectation: { type: String, default:'bloque' },

    price_Ticket: { type: Number },
    price_Total: { type: Number },
    price_Prof: { type: Number },
    number_ticket_Comsum: { type: Number },
    number_ticket_Prof: { type: Number },
    acceptation_Payement: { type: Number },
    number_ticket_Total: { type: Number },
    Increment:  { type: Number, default: 0  },
    counter:  { type: Number, default: 0  },


  });

const AdmissionFormAffectation: Model<IAdmissionFormAffectation> =
  mongoose.models.AdmissionFormAffectation ||
  mongoose.model<IAdmissionFormAffectation>(
    "AdmissionFormAffectation",
    AdmissionFormAffectationSchema
  );

export default AdmissionFormAffectation;


// Usage
const updateAdmissionFormById = async (
  id: string,
  updateData: Partial<IAdmissionFormAffectation>
) => {
  try {
    const updatedDocument = await AdmissionFormAffectation.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("Updated Document:", updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Example usage
const documentId = "60d5ec49cfa1e72c4cba0c52"; // Replace with the actual ID
const newValues: Partial<IAdmissionFormAffectation> = {
  pochette_prof: 0,
  counter: 0,
  price_ticket_default: 0,
  userIdAffectation: "",
  etat_affectation: "",
  userIdArchiver:"",
  price_Ticket: 0,
  price_Total: 0,
  price_Prof: 0,
  number_ticket_Comsum: 0,
  number_ticket_Prof: 0,
  acceptation_Payement: 0,
  number_ticket_Total: 0,
  reclamation:""
  
};

updateAdmissionFormById(documentId, newValues)
  .then((updatedDocument) => {
    console.log("Successfully updated document:", updatedDocument);
  })
  .catch((error) => {
    console.error("Failed to update document:", error);
  });
