//import AdmissionForm from "@/pages/models/AdmissionsForm";
import AdmissionUsersDetail from "../../../components/forms/AdmissionUsersDetail";

interface FormData {
  _id: string;
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
  numberOfUserIdsConfirmClient: number;
  percentage_affectation: string;
  percentage: string;
  salary_net: string;
  salary_month: string;
  prima: string;
  //cv_Photo: File | null;
}
const defaultFormData: FormData = {
  _id: '',
  name: '',
  prenome: '',
  email: '',
  password: '',
  post: '',
  numberOfUserIds: 0,
  numberOfInterviews: 0,
  numberOfUserNote: 0,
  numberOfUserIdsClient: 0,
  numberOfUserIdsInterClient: 0,
  numberOfUserIdsNoteClient: 0,
  numberOfUserIdsConfirmClient: 0,
  percentage_affectation: '',
  percentage: '',
  salary_net: '',
  salary_month: '',
  prima: '',
};

async function getFormById(id: string): Promise<FormData> {
  const timestamp = new Date().getTime(); // Add timestamp

  try {
    const response = await fetch(`https://school-iota-three.vercel.app/api/admissionformusers/${id}?t=${timestamp}`, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;

    
  } catch (error) {
    console.error('Failed to fetch form data:', error);
    return defaultFormData;
  }
}

interface FormIDProps {
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
        <AdmissionUsersDetail form={form}  />
      </div>
    </div>
  );
}
