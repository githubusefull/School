'use client';
import React, { useEffect, useState } from 'react';
import AdmissionFormDate from '@/components/forms/AdmissionFormDate';
import AdmissionFormRelance from '@/components/forms/AdmissionFormRelance';

// Define the FormData interface
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
  date_interview: number;
  isConfirmed: boolean;
  
}

// Fetch form data by ID
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
  params: { id: string };
}

const FormID: React.FC<FormIDProps> = ({ params }) => {
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Fetch form data when component mounts or `id` changes
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getFormById(id);
        if (data) {
          setForm(data);
          setError(null);
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <p className='flex justify-center'>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!form) {
    return <p>Failed to load form details for ID: {id}</p>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">
        <AdmissionFormRelance form={form} />
      </div>
    </div>
  );
};

export default FormID;