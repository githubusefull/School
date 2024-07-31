import AdmissionFormDetail from '../../../components/forms/AdmissionFormDetail'
import React from 'react'

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
    finalTotal: number;
    //cv_Photo: File | null;
  }
  
  async function getFormById(id: string): Promise<FormData | null> {
    try {
        const response = await fetch(`http://localhost:3000/api/submitFormId/${id}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch form data:', error);
        return null;
    }
}
  
  interface FormIDProps {
    form: FormData | null;
    params: { id: string  };
  }
  
  export default async function FormID({ params }: FormIDProps) {
    const form = await getFormById(params.id);

    console.log(form?.finalTotal)
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
      <AdmissionFormDetail form={form}/>
    </div>
    </div>
  )
}
