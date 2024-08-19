/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';




interface IAdmissionFormClient {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  password: string;
  ville: string;
  telephone_portable: string;
  vous_etes: string;
  Les_cours_sont_pour: string;
  Niveau: string;
  Matière_souhaitée: string;
  autres_détails: string;
  comment_vous_nous_avez: string;
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
}



const AdmissionsListClientProposition: React.FC = () => {

  const [admissions, setAdmissions] = useState<IAdmissionFormClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmissions, setFilteredAdmissions] = useState<IAdmissionFormClient[]>([]);



  

  let ToTal = 10;

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormClient');
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
                <span className='inline mr-1 capitalize'>Vous</span>

                ètes
  
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                 Les 
                <span className='inline mr-1'></span>cours<span className='inline  ml-1 mr-1'>sont</span>  
                 pour
                    </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Niveau
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                <span className='inline mr-1'>Matière</span>
                    Souhaitée
  
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Name</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  <span className='inline ml-1'>Prénome</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  <span className='inline ml-1'>Ville</span>
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Téléphone
                  <span className='inline ml-1'>portable</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Email
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                
                  <span className='inline mr-1'></span>Autes<span className='inline  ml-1'>Détails</span>  
                  
                      </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Comment
                  <span className='inline mr-1'></span>Vous<span className='inline  ml-1 mr-1'>Nous</span>  
                  avez
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
                <span className='inline m-1'>Proposition</span>
                     
                </th>
              </tr>
            </thead>


            <tbody>

              
        
                {filteredAdmissions.map((form) => (
                <tr key={form._id} className="hover:bg-gray-900">
                
                <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.vous_etes}</td>
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


                  <td className="py-2 px-4 gap-[2px]  border-b border-gray-700 text-[12px]">
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

export default withAuth(AdmissionsListClientProposition);