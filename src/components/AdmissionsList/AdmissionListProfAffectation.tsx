/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';


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
  price_total: number;
  price_ticket: number;
  prof_percentage: number;
  details: string;
  profPercentage: number,
  ticketNumber: number,
  counter: number,
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


const AdmissionListProfAffectation: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null)
  const [admissions, setAdmissions] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  //const [filteredAdmissions, setFilteredAdmissions] = useState<FormData[]>([]);



  

  let ToTal = 10;

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormProposition');
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

  {/*   
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
  */}



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


  if (loading) {
    return <div className='flex justify-center'>Loading...</div>;
  }


  return (

    <div className="text-gray-300 p-10 w-full mt-[6px] min-h-screen gap-3">

      <div className="">
        <div className="flex justify-between px-14">

          <span className='mr-1 text-[18px] font-[700] mt-[5px]'>Table<span className='ml-1'>Affectation</span></span>

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
              Client
              <span className='inline mr-1 ml-1 capitalize'>Name</span>

                
  
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Client
              <span className='inline mr-1 ml-1 capitalize'>Email</span>

                
  
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Client
              <span className='inline mr-1 ml-1 capitalize'>Telephone</span>

                
  
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
</th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                <span className='inline mr-1'>Matière</span>
                    Souhaitée
  
                </th>
            
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Client
              <span className='inline mr-1 ml-1 capitalize'>Ville</span>
                </th>
       
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                  <span className='inline ml-1'> Payment</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Price  
                <span className='inline ml-1'>Total</span>
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Price
                <span className='inline ml-1'>Ticket</span>
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              
                <span className='inline mr-1'> Number</span>Ticket
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              
                <span className='inline mr-1'> Percentage</span>Professor
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                <span className='inline mr-1'>Professor</span>Price
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                <span className='inline ml-1 px-9'>Details</span>
              </th>
              
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                <span className='inline mr-1'>Professor</span>Name
              </th>

              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                <span className='inline mr-1'>Professor</span>Email
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                <span className='inline mr-1'>Professor</span>Telehpone
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                <span className='inline mr-1'>Professor</span>Ville
              </th>
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Matiere
                <span className='inline ml-1'>1</span>
              </th> 
              <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Matiere
                <span className='inline ml-1'>2</span>
              </th>    <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Matiere
                <span className='inline ml-1'>3</span>
              </th>    <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Matiere
                <span className='inline ml-1'>4</span>
              </th>    <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Matiere
                <span className='inline ml-1'>5</span>
              </th>    <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
              Matiere
                <span className='inline ml-1'>6</span>
              </th>   
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    La
                    <span className='inline ml-1'>
                      note
                    </span>
                    <span className='inline ml-1'>totale</span>
                  </th> 

                <th className="py-2 px-9 border-b border-gray-700 font-semibold text-sm">
                  Interview/Refus
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Confir/NoConfir
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    Notification
                <span className='inline m-1'>de</span>
                    Relance 
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Proposition
                     
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Affectation
                </th>
              </tr>
            </thead>

            <tbody>

              
        
                {admissions.map((form) => (
                  <tr key={form._id} className="hover:bg-gray-900">
           <td className="py-2 w-full text-center border-b border-gray-700 text-[12px]">{form.vous_etes}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.Les_cours_sont_pour}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.Niveau}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.Matière_souhaitée}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.name}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.prenome}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.ville}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.telephone_portable}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.autres_détails}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.comment_vous_nous_avez}</td>
                 
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.pay}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.price_total}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.price_ticket}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">
                    {form.ticketNumber}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.prof_percentage}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.profPercentage}</td>
                  <td className="py-2 text-center border-b border-gray-700 text-[12px]">{form.details}</td>

                



                    <td className="py-2 px-8 gap-[2px]  border-b border-gray-700 text-[12px]">
                  {!form.date_interview ? (  

                    <Link href={`/admissionformdateclient/${form._id}`}>
                  <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[14px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                  </Link>
                    ):(
                      <p className='text-gray-300 font-[400] flex'>
                      <span>
                         {format(new Date(form.date_interview), 'dd-MM-yyyy')}
                      </span>
                    <span className='ml-[3px] text-blue-500'>{form.time_interview}</span>
                    
                    </p>
                    )}
                  

                  </td>
                  <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">

                 
                  {(form.isConfirmed === false) && (
                     <Link href={`/admissionformconfirm/${form._id}`}>
                        <button className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Refused</button>
                      </Link>
                  )}
                   {(form.isConfirmed === true) && (
                     <Link href={`/admissionformconfirm/${form._id}`}>
                        <button className='bg-blue-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Confirmed</button>
                      </Link>
                  )}
                   
                   {!(form.isConfirmed === true || form.isConfirmed === false) && (
                      <Link href={`/admissionformconfirm/${form._id}`}>
                        <button className='bg-orange-400 hover:text-black ml-1 p-1 px-[14px] rounded-sm text-gray-900 font-[600]'><p className='inline ml-1'>During</p></button>
                      </Link>
                    )}

                
                    

                  </td>
  
                    <td className="py-2 px-4 gap-[2px]  border-b border-gray-700 text-[12px]">
                      <p className='flex justify-center'> 
                        <Link href={`/admissionformclientrelance/${form._id}`}>

                          <button className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Relance</button>
                          <span className='ml-2 font-bold'>{form.counter === 0 ? null : form.counter }</span>
                        </Link>
                        </p>
                    </td>
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p className='flex'> 
                      <Link href={`/admissionformproposition/${form._id}`}>

                          <button className='bg-green-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Proposition</button>
                      </Link>
                        </p>
                    
                    </td>

                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p className='flex'> 
                      <Link href={`/admissionformproposition/${form._id}`}>

                          <button className='bg-yellow-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Affectation</button>
                      </Link>
                        </p>
                    </td>

                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p className='flex'> 


                      <button onClick={() => handleButtonClick(form._id)}
                            className='bg-cyan-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Select</button>                        </p>
                    </td>
                 

                 
                    {isDialogOpen && selectedForm && (

<div className="fixed inset-0 flex items-center justify-center bg-customOrange text-gray-500 bg-opacity-75 z-50">

  <div className="bg-white p-6 rounded-[4px] shadow-lg">


    <div className="grid grid-cols-2 mt-4 gap-4 text-start">
      <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
        <span className='text-start text-gray-800'>Form Affectation</span>
        <div className='overflow-x-auto h-72'>

        <form className='p-3'>
                                 
                                 <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Price Total</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>
                             <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Price Ticket</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>
                             <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Price Professeur</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>
                             <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Pochette Professeur</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>

                             <button

                               type='submit'
                               // onClick={handleConfirm}
                               className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Submit</button>


                             <button
                               //onClick={handleCancel}
                               className='bg-yellow-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>No</button>


                           </form>
                               
        </div>
      </div>



      <div className="text-customOrange font-[500] p-4 rounded-[2px] outline  outline-1">
      <span className='text-start text-gray-800'>Form Affectation</span>
        <div className='overflow-x-auto h-72'>

        <form className='p-3'>
                                 
                                 <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Number Ticket consummation </label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>
                             <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Number Ticket Professeur</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>
                            
                             <div className="mb-5">
                                 <label className='text-gray-600 text-[14px]'>Payement Acceptation</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>
                             <div className="mb-5">
                             <label className='text-gray-600 text-[14px]'>Number Ticket Total</label>

                                 <input
                                   type="text"
                                   id="numberOfUserNote"
                                   name="numberOfUserNote"
                                   className="shadow appearance-none font-[600] border rounded-[4px] mt-1 placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 //value={formData.numberOfUserNote}
                                 //onChange={handleChange}
                                 />
                             </div>

                             <button

                               type='submit'
                               // onClick={handleConfirm}
                               className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Submit</button>


                             <button
                               //onClick={handleCancel}
                               className='bg-yellow-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>No</button>


                           </form>
                                
        </div>
      </div>


    

    </div>


  </div>
</div>
)}











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

export default withAuth(AdmissionListProfAffectation);