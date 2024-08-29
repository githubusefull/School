/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';
import Image from 'next/image';
import LogoSchool from '../logo.webp'



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
  counter: number;
  mission:string;
}



const AdmissionsListProfe: React.FC = () => {

  const [admissions, setAdmissions] = useState<IAdmissionFormProf[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmissions, setFilteredAdmissions] = useState<IAdmissionFormProf[]>([]);



  

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
          admission.telephone_portable.includes(searchTerm) 

        )
      );
    }
  }, [searchTerm, admissions]);
  




  if (loading) {
    return <div className='flex justify-center mt-9'>
      <Image src={LogoSchool} alt="" className='rounded-[5px] animate-bounce ' />
    </div>;
  }


  return (

    <div className="text-gray-300 p-10 w-full mt-[6px] min-h-screen gap-3">

      <div className="">

      <div className="flex justify-between px-14">

          <span className='mr-1 text-[18px] font-[700] mt-[5px]'>Table<span className='ml-1'>Professeurs</span></span>

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
                  CV<span className='inline ml-1 mr-1'>avec</span>photo
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Date<span className='ml-1'>de</span><span className='inline ml-1'>naissance</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Anne<p className='inline ml-1 mr-1'>d'obtention</p>du<span className='inline ml-1'>bac</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Situation <span className='inline ml-1'>professionelle</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  <p className='inline mr-1'>Niveau</p>
                  atteint
                  <p className='inline mr-1'>dans les</p>
                  ètudes
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  <span className='inline mr-1'>Experiences  dans</span>l'<span className='inline  ml-1'>enseignement</span>      </th>
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
                  Note<span className='inline ml-1'>de</span>  Niveau
                  <span className='inline ml-1'>1</span>
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
                  Note<span className='inline ml-1'>de</span>  Niveau
                  <span className='inline ml-1'>2</span>
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
                  Note<span className='inline ml-1'>de</span>  Niveau
                  <span className='inline ml-1'>3</span>
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
                  Note<span className='inline ml-1'>de</span>  Niveau
                  <span className='inline ml-1'>4</span>
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
                  Note<span className='inline ml-1'>de</span>  Niveau
                  <span className='inline ml-1'>5</span>
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
                  Note<span className='inline ml-1'>de</span>  Niveau
                  <span className='inline ml-1'>6</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Note<span className='inline ml-1'>de</span>  CV
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
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Notification de Relance 
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
                  <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[15px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                  </Link>
                    ):(
                      <p className='text-gray-300 font-[400] flex'>
                        <span className=''>
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
                    {!(form.finalTotal === ToTal || form.finalTotal < ToTal ||  form.finalTotal > ToTal) && (
                      <Link href={`/admissionformnote/${form._id}`}>
                        <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[14px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                      </Link>
                    )}

                  </td>
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p>

                          <Link href={`/admissionformprofrelance/${form._id}`}>
                          <button className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Relance</button>
                          <span className='ml-2 font-bold'>{form.counter == 0 ? null : form.counter}</span>

                        </Link>
                      </p>
           
                        
                    </td>
                  </tr>
              ))
           
            
           } 

            </tbody>
          </table>
          </div>
       

        </div>
      


      </div>
    </div>

  )
}

export default withAuth(AdmissionsListProfe);
