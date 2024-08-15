//import AdmissionForm from "@/pages/models/AdmissionsForm";
import Proposition from "@/components/forms/Proposition";

interface FormData {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  password: string;
  ville: string;
  quartiers_Rabat: string;
  quartiers_Casablanca: string;
  situation_professionelle: string;
  niveau_atteint_dans_les_etudes: string;
  experiences_dans_l_enseignement: string;
  cursus_economique_Commercial: string;
  specialte: string;
  motorise: string;
  telephone_portable: string;
  matiere_1: string;
  niveau_1: string;
  niveau_1_note: number;
  matiere_2: string;
  niveau_2: string;
  niveau_2_note: number;
  matiere_3: string;
  niveau_3: string;
  niveau_3_note: number;
  matiere_4: string;
  niveau_4: string;
  niveau_4_note: number;
  matiere_5: string;
  niveau_5: string;
  niveau_5_note: number;
  matiere_6: string;
  niveau_6: string;
  niveau_6_note: number;
  note_de_Francaise: number;
  note_de_CV: number;
  motivation: string;
  civilite: string;
  telephone_fixe: string;
  annee_obtention_du_Bac: string;
  date_de_naissance: string;
  date_interview: number;
  finalTotal: number;
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
  isConfirmed: boolean;
  userIdConfirmClient: string;
  //cv_Photo: File | null;
}
const defaultFormData: FormData = {
  _id: '',
  name: '',
  prenome: '',
  email: '',
  password: '',
  ville: '',
  quartiers_Rabat: '',
  quartiers_Casablanca: '',
  situation_professionelle: '',
  niveau_atteint_dans_les_etudes: '',
  experiences_dans_l_enseignement: '',
  cursus_economique_Commercial: '',
  specialte: '',
  motorise: '',
  telephone_portable: '',
  matiere_1: '',
  niveau_1: '',
  niveau_1_note: 0,
  matiere_2: '',
  niveau_2: '',
  niveau_2_note: 0,
  matiere_3: '',
  niveau_3: '',
  niveau_3_note: 0,
  matiere_4: '',
  niveau_4: '',
  niveau_4_note: 0,
  matiere_5: '',
  niveau_5: '',
  niveau_5_note: 0,
  matiere_6: '',
  niveau_6: '',
  niveau_6_note: 0,
  note_de_Francaise: 0,
  note_de_CV: 0,
  motivation: '',
  civilite: '',
  telephone_fixe: '',
  annee_obtention_du_Bac: '',
  date_de_naissance: '',
  date_interview: 0,
  finalTotal: 0,
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
  isConfirmed: false, // Add boolean field
  userIdConfirmClient:''

};
async function getFormById(id: string): Promise<FormData> {
  try {
    const response = await fetch(`https://school-iota-three.vercel.app/api/admissionformproposition/${id}`, { method: 'GET' });
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
  const formProposition = await getFormById(params.id);

  if (!formProposition) {
    return (
      <div>
        <p>Failed to load form details for ID: {params.id}</p>
      </div>
    );
  }
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">
      <Proposition formProposition={formProposition}/>
    </div>
  </div>
  );
}
