'use client';
import withAuth from '@/hoc/withAuth';
import React from 'react'
//import AdmissionListProfProposition from '../AdmissionsList/AdmissionListProfProposition';
import AdmissionListProfAffectation from '../AdmissionsList/AdmissionListProfAffectation';

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



interface AffectationDataProps {
  formAffectation: FormData;
  id: string;
}
interface AffectationDataProps {
  formSelect: FormData;
}


  const AffectationTable: React.FC<AffectationDataProps> = ({ formAffectation, formSelect, id }) => {

  return (
     <div className="justify-center mt-2 w-[170vh]">
    <div className='text-gray-300  text-2xl font-700 justify-center flex'>
      <p className=''>Affectation</p>
    </div>
     <AdmissionListProfAffectation formAffectation={formAffectation} id={id} formSelect={formSelect}/>
  </div>
  )
}

export default withAuth(AffectationTable);