// models/AdmissionFormProf.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDetails {
  name: string;
  prenome: string;
  email: string;
  password: string;
  ville: string;
  quartiers_Rabat: string;
  quartiers_Casablanca: string;
  situation_professionelle: string;
  niveau_atteint_dans_les_etudes: string;
  experiences_dans_l_enseignement: string;
  cursus_economique_Commercial: string;
  specialte: string;
  motorise: string;
  telephone_portable: string;
  matiere_1: string;
  niveau_1: string;
  niveau_1_note: number;
  matiere_2: string;
  niveau_2: string;
  niveau_2_note: number;
  matiere_3: string;
  niveau_3: string;
  niveau_3_note: number;
  matiere_4: string;
  niveau_4: string;
  niveau_4_note: number;
  matiere_5: string;
  niveau_5: string;
  niveau_5_note: number;
  matiere_6: string;
  niveau_6: string;
  niveau_6_note: number;
  note_de_Francaise: number;
  note_de_CV: number;
  motivation: string;
  civilite: string;
  telephone_fixe: string;
  annee_obtention_du_Bac: string;
  date_de_naissance: string;
}

export interface IAdmissionFormProf extends Document {
  userId: IUserDetails;
  finalTotal?: number;
  date_interview?: Date;
  isConfirmed?: boolean;
  counter?: number;
}

const AdmissionFormProfSchema: Schema = new Schema({
  userId: {
    name: { type: String, required: true },
    prenome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ville: { type: String, required: true },
    quartiers_Rabat: { type: String, required: true },
    quartiers_Casablanca: { type: String, required: true },
    situation_professionelle: { type: String, required: true },
    niveau_atteint_dans_les_etudes: { type: String, required: true },
    experiences_dans_l_enseignement: { type: String, required: true },
    cursus_economique_Commercial: { type: String, required: true },
    specialte: { type: String, required: true },
    motorise: { type: String, required: true },
    telephone_portable: { type: String, required: true },
    matiere_1: { type: String, required: true },
    niveau_1: { type: String, required: true },
    niveau_1_note: { type: Number, required: true },
    matiere_2: { type: String, required: true },
    niveau_2: { type: String, required: true },
    niveau_2_note: { type: Number, required: true },
    matiere_3: { type: String, required: true },
    niveau_3: { type: String, required: true },
    niveau_3_note: { type: Number, required: true },
    matiere_4: { type: String, required: true },
    niveau_4: { type: String, required: true },
    niveau_4_note: { type: Number, required: true },
    matiere_5: { type: String, required: true },
    niveau_5: { type: String, required: true },
    niveau_5_note: { type: Number, required: true },
    matiere_6: { type: String, required: true },
    niveau_6: { type: String, required: true },
    niveau_6_note: { type: Number, required: true },
    note_de_Francaise: { type: Number, required: true },
    note_de_CV: { type: Number, required: true },
    motivation: { type: String, required: true },
    civilite: { type: String, required: true },
    telephone_fixe: { type: String, required: true },
    annee_obtention_du_Bac: { type: String, required: true },
    date_de_naissance: { type: String, required: true },
  },
  finalTotal: { type: Number },
  date_interview: { type: Date },
  isConfirmed: { type: Boolean },
  counter: { type: Number }
});

export default mongoose.models.AdmissionFormProf || mongoose.model<IAdmissionFormProf>('AdmissionFormProf', AdmissionFormProfSchema);

