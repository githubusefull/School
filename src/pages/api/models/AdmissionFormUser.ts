// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Item {
  name: string;
  prenome: string;
  email: string;
  post: string;
}

export interface IAdmissionFormUser extends Document {
  items: Item[];
}

const itemSchema: Schema<Item> = new mongoose.Schema({
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true },
  post: { type: String, required: true },
});

const userSchema: Schema<IAdmissionFormUser> = new mongoose.Schema({
  items: [itemSchema], // Array of itemSchema
});

const AdmissionFormUser = mongoose.models.AdmissionFormUser || mongoose.model<IAdmissionFormUser>('AdmissionFormUser', userSchema);

export default AdmissionFormUser;
