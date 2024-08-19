//import AdmissionForm from "@/pages/models/AdmissionsForm";
import AdmissionFormConfirm from "../../../components/forms/AdmissionFormConfirm";

interface FormData {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  password: string;
  ville: string;
  vous_etes: string;
  Les_cours_sont_pour: string;
  Niveau: string;
  Matière_souhaitée: string;
  autres_détails: string;
  comment_vous_nous_avez: string;
  telephone_portable: string;
  date_interview: number;
  counter: number;
  pay: string;
  details: string;
  price_total: number;
  price_ticket: number;
  ticket_number: number;
  prof_percentage: number;
  prof_price: number;
  profPercentage:number,
  ticketNumber:number,
  time_interview: string;
  isConfirmed: boolean;
  userIdConfirmClient: string;
  //cv_Photo: File | null;
}
const defaultFormData: FormData = {
  _id: '',
  telephone_portable:'',
  name: '',
  prenome: '',
  email: '',
  password: '',
  ville: '',
  vous_etes: '',
  Les_cours_sont_pour: '',
  Niveau: '',
  Matière_souhaitée: '',
  autres_détails: '',
  comment_vous_nous_avez: '',
  date_interview: 0,
  counter:0,
  pay: '',
  details: '',
  price_total: 0,
  price_ticket: 0,
  ticket_number: 0,
  prof_percentage: 0,
  prof_price: 0,
  profPercentage:0,
  ticketNumber:0,
  time_interview:'',
  isConfirmed: false, // Add boolean field
  userIdConfirmClient:''

};
async function getFormById(id: string): Promise<FormData> {
  const timestamp = new Date().getTime(); // Add timestamp


  try {
    const response = await fetch(`https://school-iota-three.vercel.app/api/admissionformconfirm/${id}?t=${timestamp}`, { method: 'GET' });
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
      <AdmissionFormConfirm form={form}/>
    </div>
  </div>
  );
}
