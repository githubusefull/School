//import AdmissionForm from "@/pages/models/AdmissionsForm";
import AdmissionUsersDetail from "../../../components/forms/AdmissionUsersDetail";

interface FormData {
    _id: string;
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
    professeurs: '',
    professeurs_accepted: '',
    professeurs_interview: '',
    clients: '',
    clients_interview: '',
    clients_confirmed: '',
    percentage: '',
    salary_net: '',
    salary_month: '',
    prima: '',
};

async function getFormById(id: string): Promise<FormData> {
  try {
    const response = await fetch(`http://localhost:3000/api/admissionformusers/${id}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
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
      <AdmissionUsersDetail form={form}/>
    </div>
  </div>
  );
}
