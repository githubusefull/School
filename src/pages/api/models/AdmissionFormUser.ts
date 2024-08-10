import mongoose, { Document, Schema, Model } from 'mongoose';



export interface IAdmissionFormUser extends Document {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
  professeurs: string;
  professeurs_accepted: string;
  professeurs_interview: string;
  clients: string;
  clients_interview: string;
  clients_confirmed: string;
  salary_month:string;
  percentage: string;
  prima: string;
  salary_net: string;
  isAdmin: boolean;
}

const AdmissionFormUserSchema: Schema<IAdmissionFormUser> = new Schema({
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  post: { type: String },
  isAdmin: { type: Boolean, default: false },  // isAdmin field with default value false
  professeurs: { type: String },
  professeurs_accepted: { type: String },
  professeurs_interview: { type: String },
  clients: { type: String },
  clients_interview: { type: String },
  clients_confirmed: { type: String },
  salary_month:{ type: String },
  percentage: { type: String },
  prima: { type: String },
  salary_net: { type: String },
});

const AdmissionFormUser: Model<IAdmissionFormUser> = mongoose.models.AdmissionFormUser || mongoose.model<IAdmissionFormUser>('AdmissionFormUser', AdmissionFormUserSchema);

export default AdmissionFormUser;
