import mongoose, { Document, Schema, Model } from 'mongoose';

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
    finalTotal: number;
    matiere_1: string | undefined;
    niveau_1: string | undefined;
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
     finalTotal: { type: Number },
     matiere_1: { type: String },
     niveau_1: { type: String },
     isAcceptedProf: { type: Boolean, default: false },
   });



const AdmissionFormProposition: Model<IAdmissionFormProposition> = mongoose.models.AdmissionFormProposition || mongoose.model<IAdmissionFormProposition>('AdmissionFormProposition', AdmissionFormPropositionSchema);

export default AdmissionFormProposition;