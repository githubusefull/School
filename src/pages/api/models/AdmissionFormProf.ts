import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdmissionFormProf extends Document {
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
  mission: string;
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
  finalTotal: number;
  note_de_Francaise: number;
  note_de_CV: number;
  motivation: string;
  civilite: string;
  telephone_fixe: string;
  annee_obtention_du_Bac: string;
  date_de_naissance: string;
  date_interview: Date;
  time_interview: string;
  isConfirmed: boolean;
  IsSelected: boolean;
  counter: number; // Initialize counter
  userId: string; // Add userId here
  userIdNote: string; // Add userId here
  userIdInterview: string;
  userIdRelance: string;
  userIdClient: string;

  //cv_Photo?: string; // Optional field
}

const AdmissionFormProfSchema: Schema<IAdmissionFormProf> = new Schema({
  userId: { type: String },
  userIdNote: { type: String },
  userIdInterview: { type: String },
  userIdRelance: { type: String },
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  ville: { type: String },
  quartiers_Rabat: { type: String },
  quartiers_Casablanca: { type: String },
  situation_professionelle: { type: String },
  niveau_atteint_dans_les_etudes: { type: String },
  experiences_dans_l_enseignement: { type: String },
  cursus_economique_Commercial: { type: String },
  specialte: { type: String },
  motorise: { type: String },
  mission: { type: String },
  telephone_portable: { type: String },
  matiere_1: { type: String },
  niveau_1: { type: String },
  niveau_1_note: { type: Number },
  matiere_2: { type: String },
  niveau_2: { type: String },
  niveau_2_note: { type: Number },
  matiere_3: { type: String },
  niveau_3: { type: String },
  niveau_3_note: { type: Number },
  matiere_4: { type: String },
  niveau_4: { type: String },
  niveau_4_note: { type: Number },
  matiere_5: { type: String },
  niveau_5: { type: String },
  niveau_5_note: { type: Number },
  matiere_6: { type: String },
  niveau_6: { type: String },
  niveau_6_note: { type: Number },
  note_de_Francaise: { type: Number },
  finalTotal: { type: Number },
  note_de_CV: { type: Number },
  motivation: { type: String },
  civilite: { type: String },
  telephone_fixe: { type: String },
  annee_obtention_du_Bac: { type: String },
  date_de_naissance: { type: String },
  date_interview: { type: Date },
  time_interview: { type: String },
  isConfirmed: { type: Boolean },
  IsSelected: { type: Boolean },
  userIdClient: { type: String },
  counter: { type: Number, default: 0 }, // Initialize counter

  //cv_Photo: { type: String, required: false }, // Optional field
});

const AdmissionFormProf: Model<IAdmissionFormProf> =
  mongoose.models.AdmissionFormProf ||
  mongoose.model<IAdmissionFormProf>(
    "AdmissionFormProf",
    AdmissionFormProfSchema
  );

export default AdmissionFormProf;

// Usage
const updateAdmissionFormById = async (
  id: string,
  updateData: Partial<IAdmissionFormProf>
) => {
  try {
    const updatedDocument = await AdmissionFormProf.findByIdAndUpdate(
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
const newValues: Partial<IAdmissionFormProf> = {
  userIdNote: "",
  userIdInterview: "",
  userIdRelance: "",
  userIdClient: "",
  niveau_1_note: 0,
  niveau_2_note: 0,
  niveau_3_note: 0,
  niveau_4_note: 0,
  niveau_5_note: 0,
  niveau_6_note: 0,
  note_de_Francaise: 0,
  note_de_CV: 0,
  finalTotal: 0,
  date_interview: new Date(0),
  time_interview: "",
  isConfirmed: false, // Add boolean value
  counter: 0, // Initialize counter
  IsSelected: false, // Add boolean value
};

updateAdmissionFormById(documentId, newValues)
  .then((updatedDocument) => {
    console.log("Successfully updated document:", updatedDocument);
  })
  .catch((error) => {
    console.error("Failed to update document:", error);
  });
