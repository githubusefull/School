import mongoose, { Document, Schema, Model } from 'mongoose';



export interface IAdmissionFormUserOriginal extends Document {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
  numberOfUserIds: number;
  numberOfInterviews: number;
  numberOfUserNote: number;
  numberOfUserIdsClient: number;
  numberOfUserIdsInterClient: number;
  numberOfUserIdsConfirmClient: number;
  salary_month: string;
  percentage: string;
  prima: string;
  percentage_affectation: string;
  salary_net: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdmissionFormUserSchema: Schema<IAdmissionFormUserOriginal> = new Schema({
  name: { type: String},
  prenome: { type: String },
  email: { type: String },
  password: { type: String },
  isAdmin: {type: Boolean},
  post: { type: String },
  numberOfUserIds: {type: Number},
  numberOfInterviews: {type: Number},
  numberOfUserNote: {type: Number},
  numberOfUserIdsClient: {type: Number},
  numberOfUserIdsInterClient: {type: Number},
  numberOfUserIdsConfirmClient: {type: Number},
  salary_month:{ type: String },
  percentage: { type: String },
  prima: { type: String },
  percentage_affectation:{type: String},
  salary_net: { type: String },
}, {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields
  });

const AdmissionFormUserOriginal: Model<IAdmissionFormUserOriginal> = mongoose.models.AdmissionFormUserOriginal || mongoose.model<IAdmissionFormUserOriginal>('AdmissionFormUserOriginal', AdmissionFormUserSchema);

export default AdmissionFormUserOriginal;


