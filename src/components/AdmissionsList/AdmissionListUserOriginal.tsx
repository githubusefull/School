/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react'
import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import { format } from 'date-fns';  // or import moment from 'moment';
import { create } from 'domain';

//import { format } from 'date-fns';  // or import moment from 'moment';




interface IAdmissionFormUser {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  post: string;
  numberOfUserIds: number;
  numberOfInterviews: number;
  numberOfUserNote: number;
  numberOfUserIdsClient: number;
  numberOfUserIdsInterClient: number;
  numberOfUserIdsNoteClient: number;
  salary_month:string;
  percentage: string;
  prima: string;
  salary_net: string;
  createdAt: string;
  numberOfUserIdsConfirmClient: number;
  percentage_affectation: string;
  
}
interface IAdmissionFormClient {
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}
interface IAdmissionFormProf {
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}


const AdmissionsListUserOriginal: React.FC = () => {

  const [admissions, setAdmissions] = useState<IAdmissionFormUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchDate, setSearchDate] = useState<string>('');

  const [filteredAdmissions, setFilteredAdmissions] = useState<IAdmissionFormUser[]>([]);



  


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormUserOriginal');
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
    }  else {
      setFilteredAdmissions(
        admissions.filter((admission) =>
          admission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admission.email.includes(searchTerm) 

        )
      );
    }
  }, [searchTerm, admissions]);


   
  
  useEffect(() => {
    if (searchDate === '') {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(
        admissions.filter((admission) =>
          new Date(admission.createdAt).toISOString().split('T')[0] === searchDate
        )
      );
    }
  }, [searchDate, admissions]);
*/}


 //anumbers 
 
 useEffect(() => {
    if (searchTerm === '' && searchDate === '') {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(
        admissions.filter((admission) => {
          const termLower = searchTerm.toLowerCase();
          const dateLower = searchDate.toLowerCase();
  
          const matchesName = admission.name
            ? admission.name.toLowerCase().includes(termLower)
            : true;
  
          const matchesDate = admission.createdAt
            ? admission.createdAt.toLowerCase().includes(dateLower)
            : true;
  
          return matchesName && matchesDate;
        })
      );
    }
  }, [searchTerm, searchDate, admissions]);
  











 const [userIdL, setUserIdL] = useState<string | null>(null);

 useEffect(() => {
   const token = localStorage.getItem('token');
   if (token) {
     const userId = getUserIdFromToken(token);
     console.log('User ID:', userId);
     setUserIdL(userId);
   }
 }, []);


 const getUserIdFromToken = (token: string): string | null => {
   try {
     const decoded: any = jwtDecode(token);
     return decoded.id || null;
   } catch (error) {
     console.error('Failed to decode token:', error);
     return null;
   }
 };


 const [admissionsProf, setAdmissionsProf] = useState<IAdmissionFormProf[]>([]);

 useEffect(() => {
   const fetchForms = async () => {
     try {
       const response = await fetch('/api/submitFormProf');
       const data = await response.json();
       setAdmissionsProf(data);
     } catch (error) {
       console.error('Failed to fetch forms:', error);
     } 
   };

   fetchForms();
 }, []);


 const [admissionsClient, setAdmissionsClient] = useState<IAdmissionFormClient[]>([]);

 useEffect(() => {
   const fetchForms = async () => {
     try {
       const response = await fetch('/api/submitFormClient');
       const data = await response.json();
       setAdmissionsClient(data);
     } catch (error) {
       console.error('Failed to fetch forms:', error);
     } 
   };

   fetchForms();
 }, []);


 const numberOfUserIds = admissionsProf.filter(admission => admission.userId === userIdL).length;
 const numberOfInterviews = admissionsProf.filter(admission => admission.userIdInterview === userIdL).length;
 const numberOfUserNote = admissionsProf.filter(admission => admission.userIdNote === userIdL).length;

 const numberOfUserIdsClient = admissionsClient.filter(admission => admission.userId === userIdL).length;
 const numberOfUserIdsInterClient = admissionsClient.filter(admission => admission.userIdInterview === userIdL).length;
 const numberOfUserIdsNoteClient = admissionsClient.filter(admission => admission.userIdNote === userIdL).length;








  if (loading) {
    return <div className='flex justify-center'>Loading...</div>;
  }


  return (

      <div className="text-gray-300 p-10 w-full mt-[6px] min-h-screen gap-3">

          <div className="">

              <div className="flex justify-between px-14">

                  <span className='mr-1 text-[18px] font-[700] mt-[5px]'>Table<span className='ml-1 mr-1'>Users</span>Original</span>

                  <div className="w-80">
                      <input
                          type="text"
                          placeholder="Search by name and mobile"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="mb-3 p-[7px] text-sm  min-w-full font-[600]  placeholder:p-2 h-10 bg-gray-300 w-full py-2 px-3 text-gray-700 focus:shadow-outline outline-none rounded"
                      />
                  </div>

                  <div className="w-80">

                      <input
                          type="month"
                          id="searchDate"
                          name="searchDate"
                          className="shadow appearance-none font-[600] text-sm border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={searchDate}
                          onChange={(e) => setSearchDate(e.target.value)}
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
                  
                  <span className='inline ml-1'>Professeurs</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    Professeurs
                  <span className='inline ml-1'>Accepted</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Professeurs
                  <span className='inline ml-1'>Interview</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Clients</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Clients
                  <span className='inline ml-1'>Interview</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Clients
                  <span className='inline ml-1'>Confirmed</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Salary
                  <span className='inline ml-1'>Month</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Percentage
                  <span className='inline ml-1'>Affectation</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  
                  <span className='inline ml-1'>Prima</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                Salary
                  <span className='inline ml-1'>Net</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                     Display
                  <span className='inline ml-1'>User</span>

                </th>
                <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                     
                  <span className='inline ml-1'>Notification</span>

                </th>
                <th className="py-2 px-8 border-b border-gray-700 font-semibold text-sm">
                     
                     <span className='inline ml-1'>Date</span>
   
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
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">{form.numberOfUserIds}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">{form.numberOfUserNote}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">{form.numberOfInterviews}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">{form.numberOfUserIdsClient}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">{form.numberOfUserIdsInterClient}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">{form.numberOfUserIdsNoteClient}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">
                  
                  <span className='inline ml-1'>{form.salary_month}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">
                  
                  <span className='inline ml-1'>{form.percentage_affectation}</span>

                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">
                  <span className='inline ml-1'>{form.prima}</span>

                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-[12px] text-center">
                    
                  
                  <span className='inline ml-1'>{form.salary_net}</span>
                  </td>
                
                
                
              
                  <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px] ">
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
                        <td className="py-2 w-full gap-[2px] text-center border-b border-gray-700 text-[12px]">
                            <p className='text-gray-300  w-full font-[600] inline'>
                               
                                    {format(new Date(form.createdAt), 'dd-MM-yyyy')}
                               
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

export default withAuth(AdmissionsListUserOriginal);