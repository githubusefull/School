import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAdmissionFormProposition extends Document {
    date_proposition: Date;
    time_proposition: string;
    userIdProposition: string;
    userIdClient: string;
    finalTotal: number;
    matiere_1: string | undefined;
    niveau_1: string | undefined;
    isAcceptedProf: boolean;
  //cv_Photo?: string; // Optional field
}

 const AdmissionFormPropositionSchema: Schema<IAdmissionFormProposition> = new Schema({
    date_proposition: {type: Date },
    time_proposition: {type: String },
    userIdProposition: {type: String },
    userIdClient:  {type: String },
    finalTotal: {type: Number },
    matiere_1: {type: String },
    niveau_1: {type: String },
    isAcceptedProf:{type: Boolean, default: false}
});



const AdmissionFormProposition: Model<IAdmissionFormProposition> = mongoose.models.AdmissionFormProposition || mongoose.model<IAdmissionFormProposition>('AdmissionFormProposition', AdmissionFormPropositionSchema);

export default AdmissionFormProposition;