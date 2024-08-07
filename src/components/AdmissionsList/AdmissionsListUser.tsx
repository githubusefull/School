/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react'
//import axios from 'axios';
//import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
//import { format } from 'date-fns';  // or import moment from 'moment';




interface IAdmissionFormUser {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  post: string;
  professeurs: string;
  professeurs_accepted: string;
  professeurs_interview: string;
  clients: string;
  clients_interview: string;
  clients_confirmed: string;
  salary_month:string;
  percentage: string;
  prima: string;
  salary_net: string;
}



const AdmissionsListUser: React.FC = () => {

  const [admissions, setAdmissions] = useState<IAdmissionFormUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmissions, setFilteredAdmissions] = useState<IAdmissionFormUser[]>([]);



  


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormUser');
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
          admission.email.includes(searchTerm) 

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
        <div className='p-8 flex justify-center'>

     
        <div className='overflow-scroll'>
          
          <table className="min-w-full border-collapse font-light">
            <thead>
              <tr>
              
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Nom
                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Prènome
                </th>
              

                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Email</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Post</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Display User</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Professeurs</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Professeurs Accepted</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Professeurs Interview</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Clients</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Clients Interview</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Clients Confirmed</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Salary Month</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Percentage Affectation</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Prima</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Salary Net</span>

                </th>
 
              
              
           
              </tr>
            </thead>


            <tbody>

              
        
                {filteredAdmissions.map((form) => (
                <tr key={form._id} className="hover:bg-gray-900">
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.name}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.prenome}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.post}</td>

                  <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                  <p className='flex justify-center'> 
                  <Link href={`/admissionformusers/${form._id}`}>
                        <button className='bg-green-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Display</button>
                      </Link>
                    </p>
                    </td>
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p className='flex justify-center'> 
                        <Link href={`/admissionformclientrelance/${form._id}`}>

                          <button className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Relance</button>
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

export default AdmissionsListUser;