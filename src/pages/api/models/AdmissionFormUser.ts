import mongoose, { Document, Schema, Model } from 'mongoose';



export interface IAdmissionFormUser extends Document {
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
  numberOfUserIdsNoteClient: number;
  salary_month: string;
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
  numberOfUserIds: {type: Number},
  numberOfInterviews: {type: Number},
  numberOfUserNote: {type: Number},
  numberOfUserIdsClient: {type: Number},
  numberOfUserIdsInterClient: {type: Number},
  numberOfUserIdsNoteClient: {type: Number},
  isAdmin: { type: Boolean, default: false },  // isAdmin field with default value false
  salary_month:{ type: String },
  percentage: { type: String },
  prima: { type: String },
  salary_net: { type: String },
});

const AdmissionFormUser: Model<IAdmissionFormUser> = mongoose.models.AdmissionFormUser || mongoose.model<IAdmissionFormUser>('AdmissionFormUser', AdmissionFormUserSchema);

export default AdmissionFormUser;

const updateAdmissionFormById = async (id: string, updateData: Partial<IAdmissionFormUser>) => {
  try {
    const updatedDocument = await AdmissionFormUser.findByIdAndUpdate(
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
const newValues: Partial<IAdmissionFormUser> = {
  numberOfUserIds: 0,
  numberOfInterviews: 0,
  numberOfUserNote: 0,
  numberOfUserIdsClient: 0,
  numberOfUserIdsInterClient: 0,
  numberOfUserIdsNoteClient: 0,
  salary_month:'',
  percentage:'',
  prima: '',
  salary_net: '',

};


updateAdmissionFormById(documentId, newValues).then(updatedDocument => {
  console.log('Successfully updated document:', updatedDocument);
}).catch(error => {
  console.error('Failed to update document:', error);
});
