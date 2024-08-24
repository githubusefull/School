/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';
import toast from 'react-hot-toast';


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
  date_interview: Date;
  time_interview: string;
  isConfirmed: boolean;
  pay: string;
  civilite: string;
  price_total: number;
  price_ticket: number;
  prof_percentage: number;
  details: string;
  profPercentage: number,
  counter: number,
  nameClient:string;
  nameProf:string;
  ticketNumber: number;
  price_prof: number;
  matiere_1: string;
  matiere_2: string;
  matiere_3: string;
  matiere_4: string;
  matiere_5: string;
  matiere_6: string;
  finalTotal: number;
  client_telephone: string;
  client_ville: string;
  emailProf: string;
  prof_ville: string;
  prof_telephone: string;
  emailClient:  string;
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
    //cv_Photo: File | null;
  }
  interface IAdmissionFormProposition {
    id: string;
    nameClient: string;
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
    price_total: number;
    ticketNumber: number;
    price_prof: number;
    price_ticket: number;
    isAcceptedProf: boolean;
    emailClient: string;
    emailProf: string;
    client_telephone: string;
    prof_telephone: string;
    client_ville: string;
    prof_ville: string;
  
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
  nameProf: string;
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
  mission: string;
}


interface AffecationDataProps {
  formAffectation: FormData;
  id: string;

}
interface FormAffectationSelect {
  id: string;
  IsSelected: boolean;
  name: string;
  userIdClient: string;
}


const AdmissionListProfAffectation:  React.FC<AffecationDataProps> = ({ formAffectation }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null)


  const [admissions, setAdmissions] = useState<IAdmissionFormProf[]>([]);


  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmissions, setFilteredAdmissions] = useState<IAdmissionFormProf[]>([]);

  const [formData, setFormData] = useState<FormAffectationSelect>({
    id: formAffectation._id,
    name: formAffectation.name,
    userIdClient: formAffectation._id,  
    IsSelected: true,


  });

 
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
 


  const handleConfirm = async () => {

    if (!selectedForm) return;
    try {
      await handleSubmit(selectedForm._id);
      toast.success('Selected Successfully');
      setIsDialogOpen(false);


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
            IsSelected: formData.IsSelected,
            userIdClient: formAffectation._id,

          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Updated Document:', data);
      window.location.reload();


      setFormData({
        id: formAffectation._id,
        name: formAffectation.name,
        IsSelected: true,
        userIdClient: formAffectation._id,

      });

      //toast.success(data.message);
      //toast.success('Edited Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');
    }
  };



  

  

  

    
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(
        admissions.filter((admission) =>
          admission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admission.matiere_1.includes(searchTerm) ||
          admission.niveau_1.includes(searchTerm) ||
          (`${admission.matiere_1} ${admission.niveau_1}`).toLowerCase().includes(searchTerm.toLowerCase())

        )
      );
    }
  }, [searchTerm, admissions]);
 



  const handleButtonClick = async (formId: string) => {
    try {
      // Fetch the form data by ID
      const response = await fetch(`/api/admissionformaffectationselect/${formId}`);

      const data = await response.json();

      setSelectedForm(data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  console.log(selectedForm?.name)

  const [formDataPropo, setFormDataPropo] = useState<IAdmissionFormProposition>({
    id: formAffectation._id,
    price_total:formAffectation.price_total,
    ticketNumber: formAffectation.ticketNumber,
    price_prof: formAffectation.profPercentage,
    emailProf: formAffectation.emailProf,
    price_ticket:formAffectation.price_ticket,
    nameClient: formAffectation.name,
    monday_proposition: formAffectation.monday_proposition,
    tuesday_proposition: formAffectation.tuesday_proposition,
    wednesday_proposition: formAffectation.wednesday_proposition,
    thursday_proposition: formAffectation.thursday_proposition,
    friday_proposition: formAffectation.friday_proposition,
    saturday_proposition: formAffectation.saturday_proposition,
    sunday_proposition: formAffectation.sunday_proposition,
    monday_time: formAffectation.monday_time,
    tuesday_time: formAffectation.tuesday_time,
    wednesday_time: formAffectation.wednesday_time,
    thursday_time: formAffectation.thursday_time,
    friday_time: formAffectation.friday_time,
    saturday_time: formAffectation.saturday_time,
    sunday_time: formAffectation.sunday_time,
    userIdProposition: formAffectation.userIdProposition,
    userIdClient: formAffectation._id,
    emailClient: formAffectation.email,
    client_telephone: formAffectation.telephone_portable,
    prof_telephone: formAffectation.prof_telephone,
    client_ville: formAffectation.ville,
    prof_ville: formAffectation.prof_ville,

    isAcceptedProf: false

    

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
        body: JSON.stringify(
          {
          ...formDataPropo,
          userIdProfesseur: selectedForm?._id,
          emailProf: selectedForm?.email,
          nameProf: selectedForm?.name,
          finalTotal: selectedForm?.finalTotal,
           matiere_1:selectedForm?.matiere_1,
           prof_telephone: selectedForm?.telephone_portable,
           prof_ville: selectedForm?.ville,
          


      }),
      });

      const data = await response.json();
      if (response.ok) {
        setFormDataPropo({
          id: '',
          nameClient:'',
          emailClient:'',
          client_telephone:'',
          prof_telephone:'',
          client_ville:'',
          prof_ville:'',
          emailProf:'',
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
          price_total: 0,
          ticketNumber: 0,
          price_prof: 0,
          price_ticket: 0,
          isAcceptedProf: false



        });
        //toast.success(data.message);


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
        <div className="flex justify-between px-14">

          <span className='mr-1 text-[18px] font-[700] mt-[5px]'><span className='ml-1'>Affectation</span></span>






          <div className="w-80">

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
                    Mission
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
                  <th className="py-2 px-9 border-b border-gray-700 font-semibold text-sm">
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
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.mission}</td>
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

                    <td className="py-2 w-full border-b border-gray-700 text-[12px]">{form.motivation}</td>

                    <td className="py-2 px-4 gap-[2px]  border-b border-gray-700 text-[12px]">
                      {!form.date_interview ? (

                        <Link href={`/admissionformdate/${form._id}`}>
                          <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[14px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                        </Link>
                      ) : (
                        <p className='text-gray-300 font-[400] flex'>
                          <span>
                            {format(new Date(form.date_interview), 'dd-MM-yyyy')}
                          </span>
                          <span className='ml-[3px] text-blue-500'>{form.time_interview}</span>

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
                      {!(form.finalTotal === ToTal || form.finalTotal < ToTal || form.finalTotal > ToTal) && (
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

                        {formAffectation._id ? (
                        <button onClick={() => handleButtonClick(form._id)}

                            className='bg-green-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Selected </button>
                        ) : (

                          <button onClick={() => handleButtonClick(form._id)}
                            className='bg-cyan-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Select</button>
                        )}
                      </p>

                      {isDialogOpen && selectedForm && (

                        <div className="fixed inset-0 flex items-center justify-center bg-customOrange text-gray-500 bg-opacity-75 z-50">

                          <div className="bg-white p-3 mx-5 rounded-[4px] shadow-lg">


                            <div className="grid grid-cols-4 mt-4 gap-4 text-start">
                            <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Affectation</span>

                                <div className="overflow-x-auto h-72 flex text-gray-800">
                                  <div className="border-collapse font-light text-[9px]">

                                    <div className='mt-2 text-[12px]'>
                                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Civilite : {selectedForm?.civilite}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Nom : {selectedForm?.name}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Prenome : {selectedForm?.prenome}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Ville : {selectedForm?.ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Telephone : {selectedForm?.telephone_portable}</p>

                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 1 : {selectedForm?.matiere_1}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 2 : {selectedForm?.matiere_2}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 3 : {selectedForm?.matiere_3}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 4 : {selectedForm?.matiere_4}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 5 : {selectedForm?.matiere_5}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 6 : {selectedForm?.matiere_6}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">La Note Totale : {selectedForm?.finalTotal}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Date : {formDataPropo.monday_proposition}</p>

                                    </div>
                                  </div>
                                </div>
                              </div>



                              <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Proposition</span>
                                <div className='overflow-x-auto h-72'>


                                  <form  onSubmit={handleSubmitProposition} className='p-3'>

                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Mon</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="monday_proposition"
                                          name="monday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.monday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                          type="time"
                                          id="monday_time"
                                          name="monday_time"
                                          placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.monday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>


                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Tue</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="tuesday_proposition"
                                          name="tuesday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.tuesday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                         type="time"
                                         id="tuesday_time"
                                         name="tuesday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.tuesday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>



                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Wed</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="wednesday_proposition"
                                          name="wednesday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.wednesday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                         type="time"
                                         id="wednesday_time"
                                         name="wednesday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.wednesday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>
                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Thu</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="thursday_proposition"
                                          name="thursday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.thursday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                         type="time"
                                         id="thursday_time"
                                         name="thursday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.thursday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>

                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Fri</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="friday_proposition"
                                          name="friday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.friday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                         type="time"
                                         id="friday_time"
                                         name="friday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.friday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>

                                  
                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Sat</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="saturday_proposition"
                                          name="saturday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.saturday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                         type="time"
                                         id="saturday_time"
                                         name="saturday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.saturday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>

                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Sun</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="sunday_proposition"
                                          name="sunday_proposition"
                                          placeholder='Date Proposition'
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.sunday_proposition}
                                          onChange={handleChangeProposition}
                                        />

                                        <input
                                         type="time"
                                         id="sunday_time"
                                         name="sunday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={formDataPropo.sunday_time}
                                          onChange={handleChangeProposition}
                                        />

                                      </div>
                                    </div>

                                 
                                    
                                    
                                   

                                    <button

                                      type='submit'
                                      onClick={handleConfirm}
                                      className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Submit</button>


                                    <button
                                      onClick={handleCancel}
                                      className='bg-yellow-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>No</button>


                                  </form>
                                </div>
                              </div>



                              <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Client</span>

                                <div className="overflow-x-auto h-72 flex text-gray-800">
                                  <div className="border-collapse font-light text-[9px]">

                                    <div className='mt-2 text-[12px]'>

                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name: {formAffectation.name}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Email: {formAffectation.email}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Telephone: {formAffectation.telephone_portable}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Ville: {formAffectation.ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Vous Etes: {formAffectation.vous_etes}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Details: {formAffectation.details}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Total: {formAffectation.price_total}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Ticket: {formAffectation.price_ticket}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Professeur: {formAffectation.profPercentage}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Percentge Professeur: {formAffectation.prof_percentage}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Number Ticket: {formAffectation.ticketNumber}</p>


                                    </div>
                                  </div>
                                </div>
                              </div>


                            


                              <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Professeur</span>

                                <div className="overflow-x-auto h-72 flex text-gray-800">
                                  <div className="border-collapse font-light text-[9px]">

                                    <div className='mt-2 text-[12px]'>
                                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Civilite : {selectedForm?.civilite}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Nom : {selectedForm?.name}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Prenome : {selectedForm?.prenome}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Ville : {selectedForm?.ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Telephone : {selectedForm?.telephone_portable}</p>

                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 1 : {selectedForm?.matiere_1}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 2 : {selectedForm?.matiere_2}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 3 : {selectedForm?.matiere_3}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 4 : {selectedForm?.matiere_4}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 5 : {selectedForm?.matiere_5}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Matiere 6 : {selectedForm?.matiere_6}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">La Note Totale : {selectedForm?.finalTotal}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
<div className="grid grid-cols-2 mt-4 px-8 gap-4">
                      
                     
      



          <div className="text-gray-300 p-4 rounded-[2px] outline  outline-1">
            <span>Form Client</span>
            <div className="overflow-x-auto h-64">
              <div className="border-collapse font-light text-[9px]">
                <div>
                  <div className=' mt-2 text-[12px]'>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name : {formAffectation.name}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Prénome : {formAffectation.prenome}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Téléphone portable : {formAffectation.telephone_portable}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Email : {formAffectation.email}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Ville : {formAffectation.ville}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Vous ètes : {formAffectation.vous_etes}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Les cours sont pour : {formAffectation.Les_cours_sont_pour}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Niveau : {formAffectation.Niveau}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Matière Souhaitée : {formAffectation.Matière_souhaitée}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Autes Détails : {formAffectation.autres_détails}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Comment Vous Nous avez : {formAffectation.comment_vous_nous_avez}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Price Total : {formAffectation.price_total}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Price Ticket : {formAffectation.price_ticket}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Profe Percentage : {formAffectation.profPercentage}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Profe Price : {formAffectation.prof_percentage}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Number Ticket : {formAffectation.ticketNumber}</p>


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

export default withAuth(AdmissionListProfAffectation);