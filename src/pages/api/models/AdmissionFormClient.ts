import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdmissionFormClient extends Document {
  name: string;
  prenome: string;
  email: string;
  password: string;
  ville: string;

  telephone_portable: string;

  vous_etes: string;
  Les_cours_sont_pour: string;
  Niveau: string;
  Matière_souhaitée: string;
  autres_détails: string;
  comment_vous_nous_avez: string;

  date_interview: Date;
  time_interview: string;
  isConfirmed: boolean;
  price_total: number;
  price_ticket: number;
  ticket_number: number;
  prof_percentage: number;
  prof_price: number;
  details: string;
  profPercentage: number;
  ticketNumber: number;
  counter: number; // Initialize counter
  userId: string; // Optional, as it’s added later
  userIdNote: string; // Add userId here
  userIdInterview: string;
  userIdRelance: string;
  userIdConfirmClient: string;
}

const AdmissionFormSchema: Schema<IAdmissionFormClient> = new Schema({
  userId: { type: String },
  name: { type: String, required: true },
  prenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ville: { type: String },

  telephone_portable: { type: String },

  vous_etes: { type: String },
  Les_cours_sont_pour: { type: String },
  Niveau: { type: String },
  Matière_souhaitée: { type: String },
  autres_détails: { type: String },
  comment_vous_nous_avez: { type: String },
  date_interview: { type: Date },
  time_interview: { type: String },
  isConfirmed: { type: Boolean },
  price_total: { type: Number },
  price_ticket: { type: Number },
  ticket_number: { type: Number },
  prof_percentage: { type: Number },
  prof_price: { type: Number },
  details: { type: String },
  profPercentage: { type: Number },
  ticketNumber: { type: Number },
  counter: { type: Number, default: 0 }, // Initialize counter
  userIdNote: { type: String }, // Add userId here
  userIdInterview: { type: String },
  userIdConfirmClient: { type: String },
  userIdRelance: { type: String },
  //cv_Photo: { type: String, required: false }, // Optional field
});

const AdmissionFormClient: Model<IAdmissionFormClient> =
  mongoose.models.AdmissionFormClient ||
  mongoose.model<IAdmissionFormClient>(
    "AdmissionFormClient",
    AdmissionFormSchema
  );

export default AdmissionFormClient;

// Usage

const updateAdmissionFormById = async (
  id: string,
  updateData: Partial<IAdmissionFormClient>
) => {
  try {
    const updatedDocument = await AdmissionFormClient.findByIdAndUpdate(
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
const newValues: Partial<IAdmissionFormClient> = {
  userId: "",
  userIdNote: "", // Add userId here
  userIdInterview: "",
  userIdConfirmClient: "",
  userIdRelance: "",
  price_total: 0,
  price_ticket: 0,
  ticket_number: 0,
  prof_percentage: 0,
  prof_price: 0,
  details: "",
  profPercentage: 0,
  ticketNumber: 0,
  counter: 0, // Initialize counter
  date_interview: new Date(0),
  time_interview: "",
  isConfirmed: false, //
};

updateAdmissionFormById(documentId, newValues)
  .then((updatedDocument) => {
    console.log("Successfully updated document:", updatedDocument);
  })
  .catch((error) => {
    console.error("Failed to update document:", error);
  });
