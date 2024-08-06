import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAdmissionFormUser extends Document {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;

  //cv_Photo?: string; // Optional field
}

const AdmissionFormSchema: Schema<IAdmissionFormUser> = new Schema({
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  post: { type: String, required: true },

 // Initialize counter

  //cv_Photo: { type: String, required: false }, // Optional field
});



const AdmissionFormUser: Model<IAdmissionFormUser> = mongoose.models.AdmissionFormUser || mongoose.model<IAdmissionFormUser>('AdmissionFormUser', AdmissionFormSchema);

export default AdmissionFormUser;