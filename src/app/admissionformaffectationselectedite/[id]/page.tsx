import AdmissionEdite from "@/components/forms/AdmissionEdite";



interface FormData {
  _id: string;
  monday_proposition: string;
  tuesday_proposition: string;
  wednesday_proposition: string;
  thursday_proposition: string;
  friday_proposition: string;
  saturday_proposition: string;
  sunday_proposition: string;
  monday_time: string;
  tuesday_time: string;
  wednesday_time: string;
  thursday_time: string;
  friday_time: string;
  saturday_time: string;
  sunday_time: string;
  userIdProposition: string;
  userIdClient: string;
  nameClient:string;
  emailClient:string;
 
  //cv_Photo: File | null;
}
const defaultFormData: FormData = {
  _id: '',
  monday_proposition: '',
  tuesday_proposition: '',
  wednesday_proposition: '',
  thursday_proposition: '',
  friday_proposition: '',
  saturday_proposition: '',
  sunday_proposition: '',
  monday_time: '',
  tuesday_time: '',
  wednesday_time: '',
  thursday_time: '',
  friday_time: '',
  saturday_time: '',
  sunday_time: '',
  userIdProposition: '',
  userIdClient: '',
  nameClient: '',
  emailClient: '',


};
async function getFormById(id: string): Promise<FormData> {
  const timestamp = new Date().getTime(); // Add timestamp

  try {
    const response = await fetch(`https://school-iota-three.vercel.app/api/admissionformaffectationselectedite/${id}?t=${timestamp}`, { method: 'GET' });
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
  //const form = await getFormById(params.id);


    const formAfSelect = await getFormById(params.id);
   

  if (!formAfSelect) {
    return (
      <div>
        <p>Failed to load form details for ID: {params.id}</p>
      </div>
    );
  }
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">
    <AdmissionEdite formAfSelect={formAfSelect}/>
    
    </div>
  </div>
  );
}
