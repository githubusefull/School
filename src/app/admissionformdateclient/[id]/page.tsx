//import AdmissionForm from "@/pages/models/AdmissionsForm";
import AdmissionFormDateClient from "@/components/forms/AdmissionFormDateClient";

interface FormData {
  _id: string;
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
  date_interview: number;
  finalTotal: number;
  isConfirmed: boolean;
  userIdRelance:string; // Add boolean field
  userIdInterview: string;
  time_interview: string;
  userIdNote: string; // Add userId here
  //cv_Photo: File | null;
}
const defaultFormData: FormData = {
  _id: '',
  name: '',
  prenome: '',
  email: '',
  password: '',
  ville: '',
  telephone_portable:'',
  vous_etes: '',
  Les_cours_sont_pour: '',
  Niveau: '',
  Matière_souhaitée: '',
  autres_détails: '',
  comment_vous_nous_avez: '',
  date_interview: 0,
  finalTotal: 0,
  isConfirmed: false, // Add boolean field
  userIdInterview: '',
  time_interview: '',
  userIdRelance:'',
  userIdNote: '', // Add userId here

};
async function getFormById(id: string): Promise<FormData> {
  const timestamp = new Date().getTime(); // Add timestamp
  try {
    const response = await fetch(`https://school-iota-three.vercel.app/api/admissionformdateclient/${id}?t=${timestamp}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch form data:', error);
    return defaultFormData;
  }
}

      
interface FormIDProps   {
  //form: FormData | null;
  params: { id: string };
}
 
export default async function FormID({ params }: FormIDProps) {
  const form = await getFormById(params.id);

  if (!form) {
    return (
      <div>
        <p>Failed to load form details for ID: {params.id}</p>
      </div>
    );
  }
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">
      <AdmissionFormDateClient form={form}/>
    </div>
  </div>
  );
}