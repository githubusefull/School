/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react'
//import axios from 'axios';
//import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';




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
  isConfirmed: boolean;
  counter: number;
}



const AdmissionsListOperation: React.FC = () => {

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
    return <div className='flex justify-center'>Loading...</div>;
  }


  return (

    <div className="text-gray-300 p-10 w-full min-h-screen gap-3">

      <div className="">

        <div className="">
          <div>
       


       <input
        type="text"
        placeholder="Search by name and mobile"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3 p-[7px] text-sm  min-w-full bg-gray-950 text-gray-300 outline-none rounded"
      />
          
     </div>
            
          

       
        </div>
        <div className='p-8 flex justify-between'>
        <div className='text-gray-300 p-4 bg-black'>
          <div className='rounded-[4px] p-4 font-[500] w-[300px]'>
          <p><span className='flex justify-start mb-3 text-[20px]'>Personnel</span></p>
          <p>Nom: <span>Aziz</span></p>
          <p>Prenom: <span>Khalidi</span></p>
          <p><span>Number of affectation: </span> <span>56</span></p>
          <p><span>Number of Prof validation: </span> <span>56</span></p>
          <p><span>Number of Client validation: </span> <span>56</span></p>

          </div>
        </div>
      


        <div className='overflow-scroll'>
       
          <table className="min-w-full border-collapse font-light">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  ID operation
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID user

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID professeur

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID
                
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                ID
                </th>
                <th className="py-2 px-4 border-b  border-gray-700 font-semibold text-sm">
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Date de <span className='inline ml-1'>naissance</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  <p className='inline mr-1'>Anne</p>d'obtention<span className='inline ml-1'>  </span>du Bac
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
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
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
                      <p className='text-gray-300 font-[600]'>
                       {format(new Date(form.date_interview), 'dd-MM-yyyy')}
                      
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

export default AdmissionsListOperation;