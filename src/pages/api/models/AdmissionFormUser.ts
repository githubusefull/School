import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the schema for sub-documents in the forms array
const FormSchema = new Schema({
  mobile: { type: Number, required: true },
}, { _id: false });

// Define the main schema
export interface IAdmissionFormUser extends Document {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
  forms: Array<{ mobile: number }>; // Add the forms field here
}

const AdmissionFormUserSchema: Schema<IAdmissionFormUser> = new Schema({
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  post: { type: String },
  forms: { type: [FormSchema], default: [] }, // Use FormSchema here
});

const AdmissionFormUser: Model<IAdmissionFormUser> = mongoose.models.AdmissionFormUser || mongoose.model<IAdmissionFormUser>('AdmissionFormUser', AdmissionFormUserSchema);

export default AdmissionFormUser;
