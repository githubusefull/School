import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAdmissionFormClient extends Document {
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
  finalTotal:  number;
  note_de_Francaise: number;
  note_de_CV: number;
  motivation: string;
  civilite: string;
  telephone_fixe: string;
  annee_obtention_du_Bac: string;
  date_de_naissance: string;
  date_interview: Date;
  isConfirmed: boolean;
  price_total: number,
  price_ticket: number,
  ticket_number: number,
  prof_percentage: number,
  prof_price: number,
  details: string,
  profPercentage: number,
  ticketNumber: number,
  counter: number, // Initialize counter
  userId: string; // Optional, as it’s added later
  userIdNote: string; // Add userId here
  userIdInterview: string;
  userIdRelance: string;}

const AdmissionFormSchema: Schema<IAdmissionFormClient> = new Schema({
  userId: { type: String },
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ville: { type: String },
  quartiers_Rabat: { type: String,},
  quartiers_Casablanca: { type: String },
  situation_professionelle: { type: String },
  niveau_atteint_dans_les_etudes: { type: String },
  experiences_dans_l_enseignement: { type: String },
  cursus_economique_Commercial: { type: String },
  specialte: { type: String },
  motorise: { type: String, },
  telephone_portable: { type: String, },
  matiere_1: { type: String, },
  niveau_1: { type: String, },
  niveau_1_note: { type: Number},
  matiere_2: { type: String, },
  niveau_2: { type: String, },
  matiere_3: { type: String, },
  niveau_3: { type: String, },
  matiere_4: { type: String, },
  niveau_4: { type: String, },
  matiere_5: { type: String, },
  niveau_5: { type: String, },
  matiere_6: { type: String, },
  niveau_6: { type: String, },
  motivation: { type: String},
  civilite: { type: String},
  telephone_fixe: { type: String },
  annee_obtention_du_Bac: { type: String},
  date_de_naissance: { type: String },
  date_interview:{type: Date},
  isConfirmed:{type: Boolean},
  price_total: {type: Number},
  price_ticket: {type: Number},
  ticket_number:{type: Number},
  prof_percentage: {type: Number},
  prof_price: {type: Number},
  details: {type: String},
  profPercentage: {type: Number},
  ticketNumber: {type: Number},
  counter: { type: Number, default: 0 }, // Initialize counter
  userIdNote: {type: String}, // Add userId here
  userIdInterview: {type: String},
  userIdRelance: {type: String}
  //cv_Photo: { type: String, required: false }, // Optional field
});



const AdmissionFormClient: Model<IAdmissionFormClient> = mongoose.models.AdmissionFormClient || mongoose.model<IAdmissionFormClient>('AdmissionFormClient', AdmissionFormSchema);

export default AdmissionFormClient;

// Usage
      
const updateAdmissionFormById = async (id: string, updateData: Partial<IAdmissionFormClient>) => {
  try {
    const updatedDocument = await AdmissionFormClient.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log('Updated Document:', updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

// Example usage
const documentId = '60d5ec49cfa1e72c4cba0c52'; // Replace with the actual ID
const newValues: Partial<IAdmissionFormClient> = {
  userId:'',
  userIdNote: '', // Add userId here
  userIdInterview:'',
  userIdRelance:'',
  price_total: 0,
  price_ticket: 0,
  ticket_number: 0,
  prof_percentage: 0,
  prof_price: 0,
  details: "",
  profPercentage: 0,
  ticketNumber: 0,
  counter: 0, // Initialize counter
  date_interview:new Date(0),
  isConfirmed: false, // 
};


updateAdmissionFormById(documentId, newValues).then(updatedDocument => {
  console.log('Successfully updated document:', updatedDocument);
}).catch(error => {
  console.error('Failed to update document:', error);
});
