import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdmissionFormProposition extends Document {
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
  nameClient:string;
  emailClient:string;
  nameProf: string | undefined;
  emailProf: string | undefined;
  price_total: number;
  ticketNumber: number;
  price_prof: number;
  price_ticket: number;
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
  isAcceptedProf: boolean;
  //cv_Photo?: string; // Optional field
}

const AdmissionFormPropositionSchema: Schema<IAdmissionFormProposition> =
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
    nameClient: {type: String},
    nameProf:   {type: String},
    emailClient:{type: String},
    emailProf: {type: String},
    price_total: {type: Number},
    ticketNumber: {type: Number},
    price_prof: {type: Number},
    price_ticket: {type: Number},
    isAcceptedProf: { type: Boolean, default: false },
  });

const AdmissionFormProposition: Model<IAdmissionFormProposition> =
  mongoose.models.AdmissionFormProposition ||
  mongoose.model<IAdmissionFormProposition>(
    "AdmissionFormProposition",
    AdmissionFormPropositionSchema
  );

export default AdmissionFormProposition;
