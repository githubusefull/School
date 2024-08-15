/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
//import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';
//import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import Link from 'next/link';


interface FormPropositionSelect {
  id: string;
  IsSelected: boolean;
  name: string;
  
}
interface FormDataInfoProposition {
  id: string;
  date_proposition: string;
  time_proposition: string;
  userIdProposition: string;
  finalTotal: number;
  matiere_1: string | undefined;
  niveau_1: string | undefined;
}
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
    isSelected: boolean;
    date_proposition: string;
    time_proposition: string;
    userIdProposition: string;
    //cv_Photo: File | null;
  }
interface IAdmissionFormProf {
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
  finalTotal: number;
  note_de_Francaise: number;
  note_de_CV: number;
  motivation: string;
  civilite: string;
  telephone_fixe: string;
  annee_obtention_du_Bac: string;
  date_de_naissance: string;
  date_interview: Date;
  time_interview: string;
  isConfirmed: boolean;
  IsSelected: boolean;
  counter: number;
}

interface PropositionDataProps {
    formProposition: FormData;

  }
 

const AdmissionsListProfProposition: React.FC <PropositionDataProps> = ({ formProposition }) => {
  // modal dialod 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  //const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormPropositionSelect>({
    id: formProposition._id,
    name: formProposition.name,
    IsSelected: true,

    
  });

  
  const handleButtonClick = async (formId: string) => {
    try {
      // Fetch the form data by ID
      const response = await fetch(`http://localhost:3000/api/admissionformpropositionselect/${formId}`);

      const data = await response.json();
  
      setSelectedForm(data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleConfirm = async () => {
   
    if (!selectedForm) return;
    try {
      await handleSubmit(selectedForm._id);
      toast.success('Selected Successfully');
           
      setTimeout(() => {
        window.location.href = '/professeuradmissions';
      }, 100);
    } catch (error) {
      console.error('Error in handleConfirm:', error);
      toast.error('Failed to select');
    }
  };





  const handleCancel = () => {
    setIsDialogOpen(false);
  };

      

  const handleSubmit = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found');
      return;
    }

    try {
      const response = await fetch('/api/prof_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          updateData: {
            isSelected: formData.IsSelected,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Updated Document:', data);


      setFormData({
        id: formProposition._id,
        name: formProposition.name,
        IsSelected: true,
        
      });

      toast.success(data.message);
      //toast.success('Edited Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');
    }
  };






  const [admissions, setAdmissions] = useState<IAdmissionFormProf[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmissions, setFilteredAdmissions] = useState<IAdmissionFormProf[]>([]);

  //const [filteredPropositions, setFilteredPropositions] = useState<FormData>(formProposition);

 

  

  let ToTal = 10;

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormProf');
        const data = await response.json();
        setAdmissions(data);
      } catch (error) {
        console.error('Failed to fetch forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);


 
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(
        admissions.filter((admission) =>
          admission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.matiere_1.includes(searchTerm) ||
        admission.niveau_1.includes(searchTerm)  ||
        (`${admission.matiere_1} ${admission.niveau_1}`).toLowerCase().includes(searchTerm.toLowerCase())

      )
      );
    }
  }, [searchTerm, admissions]);


// form proposition
const [userIdProposition, setUserId] = useState<string | null>(null);

const getUserIdFromTokenTow = (token: string): string | null => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.id || null;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const userIdProposition = getUserIdFromTokenTow(token);
    console.log('User ID:', userIdProposition);
    setUserId(userIdProposition);
  }
}, []);

useEffect(() => {
  if (userIdProposition) {
    setFormDataPropo(prev => ({ ...prev, userIdProposition }));
  }
}, [userIdProposition]);

const [formDataPropo, setFormDataPropo] = useState<FormDataInfoProposition>({
  id: formProposition._id,
  date_proposition: formProposition.date_proposition,
  time_proposition: formProposition.time_proposition,
  userIdProposition: formProposition.userIdConfirmClient,
  finalTotal: formProposition.finalTotal,
  matiere_1: formProposition.matiere_1,
  niveau_1: formProposition.niveau_1,
  
});


const handleChangeProposition = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormDataPropo(prev => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmitProposition = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
   //const token = localStorage.getItem('token');

  try {
    const response = await fetch('/api/submitFormProposition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataPropo),
    });

    const data = await response.json();
    if (response.ok) {
      setFormDataPropo({
        id:'',
        date_proposition: '',
        time_proposition: '',
        userIdProposition: '',
        finalTotal: 0,
        matiere_1: '',
        niveau_1: '',
      });
      toast.success(data.message);
      setTimeout(() => {
            window.location.href = '/';
        }, 100);
       
    } else {
      throw new Error(data.message || 'Form submission failed');
    }
  } catch (error: any) {
    console.error('Error submitting form:', error); // Log error details
    toast.error(`Error: ${error.message}`);
  }
};










  if (loading) {
    return <div className='flex justify-center'>Loading...</div>;
  }


  return (

    <div className="text-gray-300 p-10 w-full mt-[6px] min-h-screen gap-3">
      <div className="">

      <div className="flex justify-center">
      <div className="flex justify-center w-80">
       


          <input
        type="text"
        placeholder="Search by name and mobile"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3 p-[7px] text-sm  min-w-full placeholder:p-2 h-10 bg-gray-950 text-gray-300 outline-none rounded"
      />
       
          
     </div>
            
          

       
        </div>
        <div className='p-8 flex justify-between'>
       
      


        <div className='overflow-scroll'>
       
          <table className="min-w-full border-collapse font-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Civilité
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Nom
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Prènome
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Ville
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Quartiers
                  <span className='inline ml-1'>Rabat</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Quartiers
                  <span className='inline ml-1'>Casablanca</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Téléphone
                  <span className='inline ml-1'>portable</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Téléphone
                  <span className='inline ml-1'>fix</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Email
                </th>
                <th className="py-2 px-4 border-b  border-gray-700 font-semibold text-sm">
                    CV
                  <span className='inline ml-1 mr-1'>avec</span>photo
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                   Date
                  <span className='inline ml-1 mr-1'>de</span>naissance
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
            
                  <p className='inline mr-1'>Anne</p>d'obtention<span className='inline ml-1'></span>du<span className='ml-1'>Bac</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Situation<span className='inline ml-1'>professionelle</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
               

                  Niveau<span className='inline m-1'>atteint<span className='ml-1'>dans<span className='ml-1'>les</span></span></span>ètudes


                </th>
              
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">

                  Experiences<span className='inline m-1'>dans<span className='ml-1'><span className='ml-1'>l'</span></span></span>enseignement

                        </th>


          

                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  <span className='mr-1'>---Cursus</span>èconomique/<span className='inline  ml-1'>Commercial---</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Spécialté
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Motorisé
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Matière
                  <span className='inline ml-1'>1</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                  <span className='inline ml-1'>1</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Note<span className='inline m-1'>de<span className='ml-1'>Niveau</span></span>1

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Matière
                  <span className='inline ml-1'>2</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                  <span className='inline ml-1'>2</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Note<span className='inline m-1'>de<span className='ml-1'>Niveau</span></span>2

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Matière
                  <span className='inline ml-1'>3</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                  <span className='inline ml-1'>3</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Note<span className='inline m-1'>de<span className='ml-1'>Niveau</span></span>3

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Matière
                  <span className='inline ml-1'>4</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                  <span className='inline ml-1'>4</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Note<span className='inline m-1'>de<span className='ml-1'>Niveau</span></span>4

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Matière
                  <span className='inline ml-1'>5</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                  <span className='inline ml-1'>5</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Note<span className='inline m-1'>de<span className='ml-1'>Niveau</span></span>5

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Matière
                  <span className='inline ml-1'>6</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                  <span className='inline ml-1'>6</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                 
                  Note<span className='inline m-1'>de<span className='ml-1'>Niveau</span></span>6

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Note<span className='inline m-1'>de</span>CV

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Note<span className='inline m-1'>de</span>Francaise
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Total
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Motivation
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Interview/Refus
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Accp/Refus
                </th>
                <th className="py-2 px-4 border-b  border-gray-700 font-semibold text-sm">
                   
                                     
                    Notification<span className='inline m-1'>de</span>Relance

                  
                  
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Select 
                </th>
              </tr>
            </thead>


            <tbody>

              
        
                {filteredAdmissions.map((form) => (
                <tr key={form._id} className="hover:bg-gray-900">
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.civilite}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.name}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.prenome}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.ville}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.quartiers_Rabat}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.quartiers_Casablanca}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.telephone_portable}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.telephone_fixe}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">CV/photo</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.date_de_naissance}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.annee_obtention_du_Bac}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.situation_professionelle}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_atteint_dans_les_etudes}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.experiences_dans_l_enseignement}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.cursus_economique_Commercial}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.specialte}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.motorise}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_1}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_1}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_1_note}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_2}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_2}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_2_note}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_3}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_3}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_3_note}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_4}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_4}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_4_note}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_5}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_5}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_5_note}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_6}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_6}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_6_note}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.note_de_CV}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.note_de_Francaise}</td>

                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">
                    {form.finalTotal}
                  </td>

                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.motivation}</td>

                  <td className="py-2 px-4 gap-[2px]  border-b border-gray-700 text-[12px]">
                  {!form.date_interview ? (  

                    <Link href={`/admissionformdate/${form._id}`}>
                  <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[14px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                  </Link>
                    ):(
                      <p className='text-gray-300 font-[400] flex'>
                        <span>
                           {format(new Date(form.date_interview), 'dd-MM-yyyy')}
                        </span>
                      <span className='ml-1 text-blue-500'>{form.time_interview}</span>
                      
                      </p>
                    )}
                  

                  </td>
                  <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">

                    {form.finalTotal > ToTal && (
                      <Link href={`/admissionformdetail/${form._id}`}>
                        <button className='bg-green-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Accepted</button>
                      </Link>
                    )}
                      {form.finalTotal === ToTal && (
                        <Link href={`/admissionformdetail/${form._id}`}>
                          <button className='bg-green-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Accepted</button>
                        </Link>
                      )}
                    {form.finalTotal < ToTal && (
                      <Link href={`/admissionformdetail/${form._id}`}>
                        <button className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Refused</button>
                      </Link>
                    )}
                    {!(form.finalTotal === ToTal || form.finalTotal < ToTal ||  form.finalTotal > ToTal) && (
                      <Link href={`/admissionformnote/${form._id}`}>
                        <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[14px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                      </Link>
                    )}

                  </td>
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p>

                      <Link href={`/admissionformrelance/${form._id}`}>

                          <button 
                          className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Relance</button>
                          </Link>
                          <span className='ml-2 font-bold'>{form.counter == 0 ? null : form.counter}</span>

                      </p>
           
                        
                    </td>
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p>
                          {form.IsSelected ? 
                           <button
                           className='bg-green-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Selected</button>
                            :
                          
                        <button
                          onClick={() => handleButtonClick(form._id)}
                          className='bg-cyan-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Select</button>
}
                      </p>
           
                      {isDialogOpen &&  selectedForm && (

        <div className="fixed inset-0 flex items-center justify-center bg-customOrange text-gray-500 bg-opacity-75 z-50">

          <div className="bg-white p-6 rounded-[4px] shadow-lg">
         

              <div className="grid grid-cols-2 mt-4 gap-4 text-start">
                  <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Proposition</span>
                                <form  onSubmit={handleSubmitProposition}>

                                <div className="mb-4 mt-4 flex gap-2">
                                  <input
                                    type="date"
                                    id="date_proposition"
                                    name="date_proposition"
                                    placeholder='Date Proposition'
                                    className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formDataPropo.date_proposition}
                                    onChange={handleChangeProposition}
                                  />
                                  <input
                                    type="time"
                                    id="time_proposition"
                                    name="time_proposition"
                                    placeholder='Time Proposition'
                                    className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formDataPropo.time_proposition}
                                    onChange={handleChangeProposition}
                                  />
                                </div> 

                                <button 
                                
                                type='submit'
                                onClick={handleConfirm}
                                className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Submit</button>

                                </form>
                    </div>
                    


                    <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                    <span className='text-start text-gray-800'>Form Detail</span>

                    <div className="overflow-x-auto h-64 flex text-gray-800">
              <div className="border-collapse font-light text-[9px]">

                <div>

                  <div className='mt-2 text-[12px]'>

                  <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name Client: {formProposition.name}</p>

                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name Professeur: {selectedForm?.name}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Email : {selectedForm?.email}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">isSelected : {selectedForm?.isSelected === true ?
                     <button className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Selected</button>
                  
                 :                      <button className='bg-yellow-400 text-gray-700  ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Not/Selected</button>


                  }</p>
       
                  </div>
                </div>
              </div>
              </div>


                    </div>
                    </div>


            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-blue-400 text-white px-4 py-2 rounded-md "
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
                    </td>
                  </tr>
              ))
           
            
           } 

            </tbody>
          </table>
          </div>
       
              </div>
              <div className="grid grid-cols-3 mt-4 gap-4">
                  <div className="text-gray-300 p-4 rounded-[5px] outline  outline-1">
                    <span>Detail Proposition</span>
                  </div>
                  <div className="text-gray-300 p-4 rounded-[5px] outline  outline-1">
            <span>Form Professeur Proposition</span>
            
            <div className="overflow-x-auto h-64">
              <div className="border-collapse font-light text-[9px]">
                <div>
                  <div className=' mt-2 text-[12px]'>
                  <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name Client: {formProposition.name}</p>

                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name Professeur: {selectedForm?.name}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Email : {selectedForm?.email}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">isSelected : {selectedForm?.isSelected === true ?
                     <button className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Selected</button>
                  
                 :                      <button className='bg-yellow-400 text-gray-700  ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Not/Selected</button>


                  }</p>
       
                  </div>
                </div>
              </div>
              </div>

                 
              
           
            


                  </div>   
                  <div className="text-gray-300 p-4 rounded-[5px] outline  outline-1">
                      <span>Form Client</span>
                      <div className="overflow-x-auto h-64">
                          <div className="border-collapse font-light text-[9px]">
                              <div>
                                  <div className=' mt-2 text-[12px]'>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Civilité : {formProposition.civilite}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name : {formProposition.name}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Prénome : {formProposition.prenome}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Ville : {formProposition.ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Quartiers<span className="inline ml-1">Rabat : </span> {formProposition.quartiers_Rabat}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Quartiers<span className="inline ml-1">Casablanca : </span> {formProposition.quartiers_Casablanca}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Téléphone portable : {formProposition.telephone_portable}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Téléphone fix : {formProposition.telephone_fixe}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Situation Professionelle : {formProposition.situation_professionelle}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Niveau Atteint Dans Les Etudes : {formProposition.niveau_atteint_dans_les_etudes}</p>


                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Experiences Dans L'enseignement : {formProposition.experiences_dans_l_enseignement}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Cursus Economique Commercial : {formProposition.cursus_economique_Commercial}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Specialte : {formProposition.specialte}</p>
                                          <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                          Motorise : {formProposition.motorise}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Matiere 1 : {formProposition.matiere_1}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Niveau 1 : {formProposition.niveau_1}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Matiere 2 : {formProposition.matiere_2}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Niveau 2 : {formProposition.niveau_2}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Matiere 3 : {formProposition.matiere_3}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Niveau 3 : {formProposition.niveau_3}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Matiere 4 : {formProposition.matiere_4}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Niveau 4 : {formProposition.niveau_4}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Matiere 5 : {formProposition.matiere_5}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Niveau 5 : {formProposition.niveau_5}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Matiere 6 : {formProposition.matiere_6}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Niveau 6 : {formProposition.niveau_6}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Motivation : {formProposition.motivation}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Annee Obtention du Bac : {formProposition.annee_obtention_du_Bac}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Date De Naissance : {formProposition.date_de_naissance}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Price Total : {formProposition.price_total}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Price Ticket : {formProposition.price_ticket}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Profe Percentage : {formProposition.profPercentage}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Profe Price : {formProposition.prof_percentage}</p>
                                           <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                                           Number Ticket : {formProposition.ticketNumber}</p>
        
          
                                  </div>


                                 
                              </div>
    <tbody>
    </tbody>
  </div>
</div>



                  </div>           
                  
                     </div>
          </div>
        
    </div>

  )
}

export default withAuth(AdmissionsListProfProposition);


