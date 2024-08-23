/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
//import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';
//import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import Link from 'next/link';


interface FormPropositionSelect {
  id: string;
  IsSelected: boolean;
  name: string;
  userIdClient: string;
}
interface FormDataInfoProposition {
  id: string;
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
  finalTotal: number;
  matiere_1: string | undefined;  // Add matiere_1 here
  niveau_1: string | undefined; 

}
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
  prof_telephone: string;
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
  details: string;
  price_total: number;
  price_ticket: number;
  ticket_number: number;
  prof_percentage: number;
  prof_price: number;
  profPercentage: number,
  ticketNumber: number,
  isConfirmed: boolean;
  userIdConfirmClient: string;
  userIdClient: string;
  emailClient: string;
  emailProf: string;
  IsSelected: boolean;
  userIdProposition: string;
  userIdProfesseur: string;
  client_ville: string;
  prof_ville: string;

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
interface AdmissionFormProposition {
  id: string;
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
  finalTotal: number;
  matiere_1?: string;
  niveau_1?: string;
  isAcceptedProf: boolean;
  //cv_Photo?: string; // Optional field
}
interface IAdmissionFormProf {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  password: string;
  ville: string;
  vous_etes: string;
  quartiers_Rabat: string;
  quartiers_Casablanca: string;
  situation_professionelle: string;
  niveau_atteint_dans_les_etudes: string;
  experiences_dans_l_enseignement: string;
  cursus_economique_Commercial: string;
  specialte: string;
  motorise: string;
  mission: string;
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
  userIdClient: string;
  isConfirmed: boolean;
  IsSelected: boolean;
  counter: number;
  isAcceptedProf: boolean;
  client_ville: string;
  prof_ville: string;
}

interface PropositionDataProps {
  formProposition: FormData;
  id: string;

}


const AdmissionsListProfProposition: React.FC<PropositionDataProps> = ({ formProposition }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  //const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormPropositionSelect>({
    id: formProposition._id,
    name: formProposition.name,
    userIdClient: formProposition._id,  
    IsSelected: true,


  });


  const handleButtonClick = async (formId: string) => {
    try {
      // Fetch the form data by ID
      const response = await fetch(`/api/admissionformpropositionselect/${formId}`);

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
            userIdClient: formProposition._id,

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
        id: formProposition._id,
        name: formProposition.name,
        IsSelected: true,
        userIdClient: formProposition._id,

      });

      //toast.success(data.message);
      //toast.success('Edited Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');
    }
  };






  const [admissions, setAdmissions] = useState<IAdmissionFormProf[]>([]);
  const [loading, setLoading] = useState(true);
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






  const [formDataPropo, setFormDataPropo] = useState<IAdmissionFormProposition>({
    id: formProposition._id,
    price_total:formProposition.price_total,
    ticketNumber: formProposition.ticketNumber,
    price_prof: formProposition.profPercentage,
    emailProf: formProposition.emailProf,
    price_ticket:formProposition.price_ticket,
    nameClient: formProposition.name,
    monday_proposition: formProposition.monday_proposition,
    tuesday_proposition: formProposition.tuesday_proposition,
    wednesday_proposition: formProposition.wednesday_proposition,
    thursday_proposition: formProposition.thursday_proposition,
    friday_proposition: formProposition.friday_proposition,
    saturday_proposition: formProposition.saturday_proposition,
    sunday_proposition: formProposition.sunday_proposition,
    monday_time: formProposition.monday_time,
    tuesday_time: formProposition.tuesday_time,
    wednesday_time: formProposition.wednesday_time,
    thursday_time: formProposition.thursday_time,
    friday_time: formProposition.friday_time,
    saturday_time: formProposition.saturday_time,
    sunday_time: formProposition.sunday_time,
    userIdProposition: formProposition.userIdProposition,
    userIdClient: formProposition._id,
    emailClient: formProposition.email,
    client_telephone: formProposition.telephone_portable,
    prof_telephone: formProposition.prof_telephone,
    client_ville: formProposition.ville,
    prof_ville: formProposition.prof_ville,

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
           niveau_1:selectedForm?.niveau_1,
           matiere_2:selectedForm?.matiere_2,
           niveau_2:selectedForm?.niveau_2,
           matiere_3:selectedForm?.matiere_3,
           niveau_3:selectedForm?.niveau_3 ,
           matiere_4:selectedForm?.matiere_4,
           niveau_4:selectedForm?.niveau_4,
           matiere_5:selectedForm?.matiere_5,
           niveau_5:selectedForm?.niveau_5 ,
           matiere_6:selectedForm?.matiere_6,
           niveau_6:selectedForm?.niveau_6,
           prof_telephone: selectedForm?.telephone_portable,
           prof_ville: selectedForm?.ville

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


  const [ville, setVille] = useState(''); // Default selector
  const [matiere, setMatier] = useState(''); // Default selector
  const [niveau, setNiveau] = useState(''); // Default selector
  const [civilite, setCivilite] = useState(''); // Default selector
  const [motorise, setMotorise] = useState(''); // Default selector
  const [mission, setMission] = useState(''); // Default selector

  useEffect(() => {
    if (ville === '' && matiere === '' && niveau === '' && civilite === '' && motorise === '' && mission === '') {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(
        admissions.filter((admission) => {
          const villeLower = ville.toLowerCase();
          const matiereLower = matiere.toLowerCase();
          const niveauLower = niveau.toLowerCase();
          const civiliteLower = civilite.toLowerCase();
          const motoriseLower = motorise.toLowerCase();
          const missionLower = mission.toLowerCase();
          return (
            (admission.ville && admission.ville.toLowerCase() === villeLower) &&
            (matiereLower === '' || (admission.matiere_1 && admission.matiere_1.toLowerCase() === matiereLower)) &&
            (niveauLower === '' || (admission.niveau_1 && admission.niveau_1.toLowerCase() === niveauLower)) &&
            (civiliteLower === '' || (admission.civilite && admission.civilite.toLowerCase() === civiliteLower)) &&
            (motoriseLower === '' || (admission.motorise && admission.motorise.toLowerCase() === motoriseLower)) &&
            (missionLower === '' || (admission.mission && admission.mission.toLowerCase() === missionLower))
          );
        })
      );
    }
  }, [ville, matiere, niveau, civilite, motorise, mission, admissions]);




  if (loading) {
    return <div className='flex justify-center'>Loading...</div>;
  }


  return (

    <div className="text-gray-300 p-10 w-full mt-[6px] min-h-screen gap-3">
      <div className="">


        <div className="grid grid-cols-6 mt-4 px-4">
          <div className='px-4'>
            <select
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              id="ville"
              name="ville"
              className="shadow rounded-[4px]  font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"

            >
              <option value="" className="">Ville</option>
              <option value="Rabat">Rabat</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Kenitra">Kenitra</option>
              <option value="Asfi">Asfi</option>
              <option value="Kenitra">Kenitra</option>
              <option value="Asfi">Asfi</option>
              <option value="Fès">Fès</option>
              <option value="Tanger">Tanger</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Salé">Salé</option>
              <option value="Agadir">Agadir</option>
              <option value="Mohammedia">Mohammedia</option>
              <option value="Eljadida">Eljadida</option>
              <option value="Errachidia">Errachidia</option>
              <option value="Essaouira">Essaouira</option>
              <option value="Tétouan">Tétouan</option>
              <option value="Meknès">Meknès</option>
            </select>
          </div>
          <div className='px-4'>
            <select
              value={matiere}
              onChange={(e) => setMatier(e.target.value)}
              id="Matiere/1"
              name="Matiere/1"
              className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"

            >
              <option value="" className="">Matière 1</option>
              <option value="Aide/aux/devoirs">Aide aux devoirs
              </option>
              <option value="Maths">Maths</option>
              <option value="Physique">Physique</option>
              <option value="Chimie">Chimie</option>
              <option value="Biologie/SVT">Biologie/SVT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sciences/de/l'ingenieur">Sciences de l'ingénieur</option>
              <option value="Coaching/psycho-pedagogique">Coaching psycho-pédagogique</option>
              <option value="Management">Management</option>
              <option value="Français/(mission)">Français(mission)</option>
              <option value="Arabe">Arabe</option>
              <option value="Anglais">Anglais</option>
              <option value="Allemand">Allemand</option>
              <option value="Espagnol">Espagnol</option>
              <option value="Economie">Economie</option>
              <option value="Comptabilite">Comptabilité</option>
              <option value="Gestion">Gestion</option>
              <option value="Philosophie">Philosophie</option>
              <option value="Histoire/Geographie">Histoire/Géographie</option>
              <option value="Informatique">Informatique</option>
              <option value="Electronique">Électronique</option>
              <option value="Statistiques">Statistiques</option>
              <option value="Droit">Droit</option>
              <option value="Sociologie">Sociologie</option>
              <option value="Education/islamique">Education islamique</option>
              <option value="Communication">Communication</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
          <div className='px-4'>
            <select
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              id="Niveau/1"
              name="Niveau/1"
              className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"

            >
              <option value="" className="">Niveau 1</option>
              <option value="Primaire">Primaire</option>
              <option value="College">Collège</option>
              <option value="Lycee/(Sauf cientifiques)">Lycée (Sauf scientifiques)</option>
              <option value="Lycée/y/compris scientifiques">Lycée y compris scientifiques</option>
              <option value="Superieur">Supérieur</option>

            </select>
          </div>
          <div className='px-4'>
            <select
              value={civilite}
              onChange={(e) => setCivilite(e.target.value)}
              id="Civilite"
              name="Civilite"
              className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"

            >
              <option value="" className="">Civilité</option>
              <option value="Mr">Mr</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
            </select>
          </div>
          <div className='px-4'>
            <select
              value={motorise}
              onChange={(e) => setMotorise(e.target.value)}
              id="motorise"
              name="motorise"
              className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"

            >
              <option value="" className="">Motorisé</option>
              <option value="Oui">Oui</option>
              <option value="Non">No</option>

            </select>
          </div>
          <div className='px-4'>
            <select
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              id="mission"
              name="mission"
              className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"

            >
              <option value="" className="">Mission</option>
              <option value="Oui_mission">Oui</option>
              <option value="Non_mission">No</option>

            </select>
          </div>



        </div>



        <div className="flex justify-center">





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

                        {form.userIdClient === formProposition._id ? (
                          <button
                            className='bg-green-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Selected </button>
                        ) : (

                          <button onClick={() => handleButtonClick(form._id)}
                            className='bg-cyan-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Select</button>
                        )}
                      </p>

                      {isDialogOpen && selectedForm && (

                        <div className="fixed inset-0 flex items-center justify-center bg-customOrange text-gray-500 bg-opacity-75 z-50">

                          <div className="bg-white p-6 rounded-[4px] shadow-lg">


                            <div className="grid grid-cols-3 mt-4 gap-4 text-start">
                              <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Proposition</span>
                                <div className='overflow-x-auto h-72'>


                                  <form onSubmit={handleSubmitProposition} className='p-3'>

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

                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name: {formProposition.name}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Email: {formProposition.email}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Telephone: {formProposition.telephone_portable}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Ville: {formProposition.ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Vous Etes: {formProposition.vous_etes}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Details: {formProposition.details}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Total: {formProposition.price_total}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Ticket: {formProposition.price_ticket}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Professeur: {formProposition.profPercentage}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Percentge Professeur: {formProposition.prof_percentage}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Number Ticket: {formProposition.ticketNumber}</p>


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
          {/*            
          <div className="text-gray-300 p-4 rounded-[2px] outline  outline-1">
            <span>Form Professeur Proposition</span>

            <div className="overflow-x-auto h-64">
              <div className="border-collapse font-light text-[9px]">
                <div>
                  <div className=' mt-2 text-[12px]'>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name Client: {formProposition.name}</p>

                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name Professeur: {selectedForm?.name}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Email : {selectedForm?.email}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">isSelected : {selectedForm?.IsSelected === true ?
                      <button className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Selected</button>

                      : <button className='bg-yellow-400 text-gray-700  ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Not/Selected</button>


                    }</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
*/}


          <div className="text-gray-300 p-4 rounded-[2px] outline  outline-1">
            <span>Form Client</span>
            <div className="overflow-x-auto h-64">
              <div className="border-collapse font-light text-[9px]">
                <div>
                  <div className=' mt-2 text-[12px]'>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Name : {formProposition.name}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold">Prénome : {formProposition.prenome}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Téléphone portable : {formProposition.telephone_portable}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">
                      Email : {formProposition.email}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Ville : {formProposition.ville}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Vous ètes : {formProposition.vous_etes}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Les cours sont pour : {formProposition.Les_cours_sont_pour}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Niveau : {formProposition.Niveau}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Matière Souhaitée : {formProposition.Matière_souhaitée}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Autes Détails : {formProposition.autres_détails}</p>
                    <p className="py-2 px-4 border-b border-gray-700 font-semibold ">Comment Vous Nous avez : {formProposition.comment_vous_nous_avez}</p>
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


