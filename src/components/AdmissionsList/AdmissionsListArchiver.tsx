/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
//import axios from 'axios';
import withAuth from '@/hoc/withAuth';
import Link from 'next/link';
import { format } from 'date-fns';  // or import moment from 'moment';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import Image from 'next/image';
import LogoSchool from '../logo.webp'


interface FormPropositionSelect {
  id: string | undefined;
  userIdArchiver: string | undefined;
  price_ticket_default: number| undefined;
  pochette_prof: number | undefined;
  price_Ticket: number | undefined;
  price_Total: number | undefined;
  price_Prof: number | undefined;
  number_ticket_Comsum: number | undefined;
  number_ticket_Prof: number | undefined;
  acceptation_Payement: number | undefined;
  number_ticket_Total: number | undefined;
  etat_affectation: string | undefined;
  reclamation: string | undefined;
  counter: number | undefined;
}
interface FormDataProf {
  number_ticket_Prof: number;
  userIdPayer: string;

}
interface FormData {
  //id:string;
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
  nameClient: string;
  nameProf: string;
  ticketNumber: number;
  price_prof: number;
  matiere_1: string;
  niveau_1: string;
  matiere_2: string;
  niveau_2: string;
  matiere_3: string;
  niveau_3: string;
  matiere_4: string;
  niveau_4: string;
  matiere_5: string;
  niveau_5: string;
  matiere_6: string;
  niveau_6: string;
  finalTotal: number;
  client_telephone: string;
  client_ville: string;
  emailProf: string;
  prof_ville: string;
  prof_telephone: string;
  emailClient: string;
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
  pochette_prof: number;
  price_ticket_default: number;
  userIdAffectation: string;
  IsAffected: boolean;
  isAcceptedProf: boolean;
  total_pocheet: number;
  userIdProfesseur: string;
  userIdClient: string;
  userIdPayer: string;
  //cv_Photo: File | null;

  id_affectation: string;
  prof_id: string;
  client_id: string;
  prix_total: number;
  prix_ticket: number;
  nombre_total_tickets: number;
  prix_ticket_prof: number;
  nombre_tickets_prof: number;
  prix_prof: number;
  nombre_tickets_demandes: number;
  acceptation_paiement: boolean;
  nombre_tickets_stable: number;
  planning: string;
  reclamation: string;
  paiement_agence: string;
  etat_affectation: string;


  price_Ticket: number,
  price_Total: number,
  price_Prof: number,
  number_ticket_Comsum: number,
  number_ticket_Prof: number,
  acceptation_Payement: number,
  number_ticket_Total: number,
}



interface IAdmissionFormAffectation {
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
  nameClient: string;
  emailClient: string;
  nameProf: string | undefined;
  emailProf: string | undefined;
  price_total: number;
  ticketNumber: number;
  prof_telephone: string | undefined;
  client_telephone: string;
  price_prof: number;
  price_ticket: number;
  client_ville: string;
  prof_ville: string | undefined;
  userIdProfesseur: string | undefined;
  finalTotal: number | undefined;
  matiere_1: string | undefined;
  niveau_1: string | undefined;
  matiere_2: string | undefined;
  niveau_2: string | undefined;
  matiere_3: string | undefined;
  niveau_3: string | undefined;
  matiere_4: string | undefined;
  niveau_4: string | undefined;
  matiere_5: string | undefined;
  niveau_5: string | undefined;
  matiere_6: string | undefined;
  niveau_6: string | undefined;
  pochette_prof: number;
  price_ticket_default: number;
  isAcceptedProf: boolean;
  IsAffected: boolean;
  total_pocheet: number;
  userIdAffectation: string;

  id_affectation: string;
  prof_id: string;
  client_id: string;
  prix_total: number;
  prix_ticket: number;
  nombre_total_tickets: number;
  prix_ticket_prof: number;
  nombre_tickets_prof: number;
  prix_prof: number;
  nombre_tickets_demandes: number;
  acceptation_paiement: boolean;
  nombre_tickets_stable: number;
  planning: string;
  reclamation: string;
  paiement_agence: string;
  etat_affectation: string;

}


interface AffecationDataProps {
  formAffectation: FormData;
  id: string;
  onDelete: (id: string) => void;


}



const AdmissionsListArchiver: React.FC<AffecationDataProps> = ({ onDelete   }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [formDataProf, setFormDataProf] = useState<FormDataProf>({
    number_ticket_Prof: selectedForm?.number_ticket_Prof || 0,
    userIdPayer: selectedForm?.userIdPayer || ""
    // Initialize other fields here
  });




  const toggleOpen = () => {
    setIsOpen(!isOpen);

  };
          
  const [formData, setFormData] = useState<FormPropositionSelect>({
    id: selectedForm?._id,
    userIdArchiver: selectedForm?._id,
    price_ticket_default: selectedForm?.price_ticket_default,
    pochette_prof: selectedForm?.pochette_prof,
    price_Ticket: selectedForm?.price_Ticket,
    price_Total: selectedForm?.price_Total,
    price_Prof: selectedForm?.price_Prof,
    number_ticket_Comsum: selectedForm?.number_ticket_Comsum,
    number_ticket_Prof: selectedForm?.number_ticket_Prof,
    acceptation_Payement: selectedForm?.acceptation_Payement,
    number_ticket_Total: selectedForm?.number_ticket_Total,
    etat_affectation: selectedForm?.etat_affectation,
    counter: selectedForm?.counter,
    reclamation: selectedForm?.reclamation

  }); 




  const handleButtonClick = async (formId: string) => {
    try {
      // Fetch the form data by ID
      const response = await fetch(`/api/admissionformarchiverselect/${formId}`);

      const data = await response.json();

      setSelectedForm(data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };


  const handleConfirm = async () => {

    if (!selectedForm  || !selectedForm._id) return;
    try {
      await handleSubmit(selectedForm._id);
      //await handleSubmitCounter(1)

      setIsDialogOpen(false);


    } catch (error) {
      console.error('Error in handleConfirm:', error);
      toast.error('Failed to select');
    }
  };







  const handleConfirmProf = async () => {

    if (!selectedForm) return;
    try {

      await handleButtonClickProf(selectedForm._id)

      setIsDialogOpen(false);


    } catch (error) {
      console.error('Error in handleConfirm:', error);
      toast.error('Failed to select');
    }
  };




  const handleCancel = () => {
    setIsDialogOpen(false);
  };


  
 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name,  value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  const [userIdArchiver, setUserId] = useState<string | null>(null);

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
      const userIdArchiver = getUserIdFromTokenTow(token);
      console.log('User ID:', userIdArchiver);
      setUserId(userIdArchiver);
    }
  }, []);

  useEffect(() => {
    if (userIdArchiver) {
      setFormData(prev => ({ ...prev, userIdArchiver }));
    }
  }, [userIdArchiver]);

 // userIdPayer

 const [userIdPayer, setUserIdPayer] = useState<string | null>(null);

  const getUserIdFromTokenPayer = (token: string): string | null => {
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
      const userIdPayer = getUserIdFromTokenPayer(token);
      console.log('User ID:', userIdPayer);
      setUserIdPayer(userIdPayer);
    }
  }, []);

  useEffect(() => {
    if (userIdPayer) {
      setFormDataProf(prev => ({ ...prev, userIdPayer }));
    }
  }, [userIdPayer]);



 

  const handleSubmit = async (id: string) => {
    //const total_pocheet: number =
    //Number(selectedForm?.ticketNumber) *
    //Number(selectedForm?.price_prof);


    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found');
      return;
    }  
    try {

     



      
      const response = await fetch('/api/archiver_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id:  id,
          updateData: {
            
            ...formData,
            counter: (selectedForm?.counter || 0) + 1,
            userIdArchiver,


           
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
     

      const data = await response.json();
      
    
      
    

      console.log('Updated Document:', data);
      setFormData(prev => ({
        ...prev,
        counter: (prev.counter ?? 0) + 1,
        // update other fields if necessary
      }));


      window.location.reload();

       

      toast.success(data.message);
      //toast.success('Edited Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');
    }
  };















  
  
  


 

  const [admissions, setAdmissions] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredAdmissions, setFilteredAdmissions] = useState<FormData[]>([]);


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormArchiver');
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


  const handleSubmitArchiver = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/submitFormArchiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {  
          ...selectedForm,
          userIdArchiver

  
                
      }),
      });

      const data = await response.json();
      if (response.ok) {

        toast.success(data.message);


      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error); // Log error details
      toast.error(`Error: ${error.message}`);
    }
  };


 
  

  const handleButtonClickProf = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found');
      return;
    }

    // Update number_ticket_Prof to 0
    setFormDataProf((prevState) => ({
      ...prevState,
      number_ticket_Prof: 0,
    }));

    try {
      const response = await fetch('/api/archiver_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          updateData: {
            ...formDataProf,
            number_ticket_Prof: 0,  // Ensure the value is set to 0 before submission
            userIdPayer, // Assuming this is set elsewhere in your code
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Updated Document:', data);
      window.location.reload();

      toast.success(data.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');
    }
  };



  

  const handleDeleteClick = async (formId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this document?');
    if (!confirmed) return;
  
    try {
      const response = await fetch(`/api/admissionformarchiverselect/${formId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the document');
      }
  
      toast.success('Document deleted successfully');
   
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete the document');
    }
  };
  
 
 

  const handleDeleteConfirm = async () => {
    if (!selectedForm) return;
    try {
      await handleDeleteClick(selectedForm._id); // This will delete the document
      setIsDialogOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error('Error in handleDeleteConfirm:', error);
      toast.error('Failed to delete the document');
    }
  };
 




 



    
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(
        admissions.filter((admission) =>
          admission.nameClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admission.client_telephone.includes(searchTerm) 

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

          <span className='mr-1 text-[18px] font-[700] mt-[5px]'><span className='ml-1'>Archiver</span></span>






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
                    <span className='inline ml-1'>Name</span>

                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Client
                  <span className='inline ml-1'>Telephone</span>


                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Client
                  <span className='inline ml-1'>Ville</span>


                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Client
                  <span className='inline ml-1'>Email</span>


                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Professeur
                  <span className='inline ml-1'>Name</span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Professeur
                    <span className='inline ml-1'>Telephone</span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Professeur
                    <span className='inline ml-1'>Ville</span>

                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                  Professeur
                    <span className='inline ml-1'>Email</span>

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
                    Matière
                    <span className='inline ml-1'>2</span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    Niveau
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
                    Matière
                    <span className='inline ml-1'>4</span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    Niveau
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
                    Matière
                    <span className='inline ml-1'>6</span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    Niveau
                    <span className='inline ml-1'>6</span>
                  </th>
                 
                 
                 
                  <th className="py-2 px-4 border-b border-gray-700 font-semibold text-sm">
                    La<span className='inline ml-1 mr-1'>Note</span>
                     Totale
                  </th>
               

                
                
                </tr>
              </thead>


              <tbody>



                {filteredAdmissions.map((form) => (
                  <tr key={form._id} className="hover:bg-gray-900">
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.nameClient}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.client_telephone}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.client_ville}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.emailClient}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.nameProf}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.prof_telephone}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.prof_ville}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.emailProf}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_1}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_1}</td>

                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_2}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_2}</td>

                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_3}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_3}</td>

                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_4}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_4}</td>

                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_5}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_5}</td>

                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.matiere_6}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.niveau_6}</td>


                    <td className="py-2 px-4 border-b border-gray-700 text-[12px]">{form.finalTotal}</td>
                  



{/*               
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
          
                        */}

                    {/*     
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p>

                        <Link href={`/admissionformrelance/${form._id}`}>

                          <button
                            className='bg-red-400 hover:text-black ml-1 p-1 px-[5px] rounded-sm text-gray-900 font-[600]'>Relance</button>
                        </Link>
                        <span className='ml-2 font-bold'>{form.counter == 0 ? null : form.counter}</span>

                      </p>


                    </td>

                     */}
                    <td className="py-2 px-4 gap-[2px] text-center border-b border-gray-700 text-[12px]">
                      <p>
                  
                        {/* formAffectation._id ? (
                        <button onClick={() => handleButtonClick(form._id)}

                            className='bg-green-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Selected </button>
                        ) : (

                          <button onClick={() => handleButtonClick(form._id)}
                            className='bg-cyan-400 hover:text-black ml-1 p-1 px-[10px] rounded-sm text-gray-900 font-[600]'>Select</button>
                        ) */}
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
                                    

                                        <p className="py-2 px-4 border-b  font-semibold">Price Total: {selectedForm?.price_total}</p>
                                        <p className="py-2 px-4 border-b  font-semibold">Price Ticket: {selectedForm?.price_ticket}</p>
                                        <p className="py-2 px-4 border-b  font-semibold">Price Professeur:{selectedForm?.price_prof}</p>
                                        <p className="py-2 px-4 border-b font-semibold">Number Ticket Professeur:{selectedForm?.price_ticket_default}</p>
                                        <p className="py-2 px-4 border-b  font-semibold">Pochette Professeur:{selectedForm?.pochette_prof}</p>
                       <div>
                                        

                                        <form onSubmit={handleSubmitArchiver} className='flex'>

                                          <button
                                            type='submit'
                                            //onClick={handleConfirm}
                                            className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Archiver</button>


                                          <div
                                            onClick={toggleOpen}
                                            className='bg-green-400 text-gray-700 ml-1 cursor-pointer p-1 px-[10px] w-[80px] rounded-sm  font-[600]'>Renouvler</div>


                                      <button
                                        onClick={handleCancel}
                                        className='bg-red-500 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>No</button>

                                        </form>
                                        <div className='flex'>

                                 
                                                        <div
                                          onClick={handleConfirmProf}
                                          className='bg-blue-400 mt-2 text-gray-700 ml-1 cursor-pointer p-1 px-[10px] w-[50px] rounded-sm  font-[600]'>Payer</div>


                                        <button
                                          onClick={handleDeleteConfirm}
                                          className='bg-red-400 hover:text-gray-700 mt-2 ml-1 p-1 px-[5px] rounded-sm text-gray-700 font-[600]'>Delete</button>

                                        </div>
                                 

                                      </div>

                              

                                    
                                            
                                        
                                    


                                    
                                     
                                      
                                        
                                       
                                    {isOpen && (

                                      <form className='w-[220px]'>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Number Ticket Professeur Default: </label>

                                          <input

                                            name="price_ticket_default"
                                            value={formData.price_ticket_default}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>

                                        
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Price Ticket:
                                          </label>

                                          <input
                                            name="price_Ticket"
                                            value={formData.price_Ticket}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Price Total:
                                          </label>

                                          <input

                                            name="price_Total"
                                            value={formData.price_Total}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Price Professeur:
                                          </label>

                                          <input
                                             name="price_Prof"
                                            value={formData.price_Prof}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Number Ticket Consummation:
                                          </label>

                                          <input

                                            name="number_ticket_Comsum"
                                            value={formData.number_ticket_Comsum}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">number ticket Professeur:
                                          </label>

                                          <input

                                            name="number_ticket_Prof"
                                            value={formData.number_ticket_Prof}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>



                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Pochette Professeur:
                                          </label>

                                          <input

                                            name="pochette_prof"
                                            value={formData.pochette_prof}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Acceptation Payement:
                                          </label>

                                          <input

                                            name="acceptation_Payement"
                                            value={formData.acceptation_Payement}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold">Number Ticket Total:
                                          </label>

                                          <input

                                            name="number_ticket_Total"
                                            value={formData.number_ticket_Total}
                                            onChange={handleChange}
                                            type='number'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>
                                        <div className='mt-3 ml-2'>
                                          <label className="py-2   border-gray-700 font-semibold"> Reclamation
                                          </label>

                                          <input

                                            name="reclamation"
                                            value={formData.reclamation}
                                            onChange={handleChange}
                                            type='text'
                                            className='bg-gray-300 rounded-[3px] px-2 w-full h-7   focus:outline-none text-black' />
                                        </div>

                                        

                                        <div className='mt-2 m-1'>
                                          <button

                                            type='submit'
                                            onClick={handleConfirm}
                                            className='bg-green-400 text-gray-700 ml-1 p-1 px-[10px] rounded-sm  font-[600]'>Submit</button>


                                    </div>
                                       
                                      </form>
                                            )}
                                       
                                       
                                    </div>
                                  </div>
                                </div>
                              </div>



                              <div className="text-customOrange font-[500] p-2 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Proposition</span>
                                <div className='overflow-x-auto h-72'>


                                  <form   className=''>

                                    <div className="mb-4 mt-4  gap-1">
                                      <label className='text-gray-700'>Mon</label>
                                      <div className='flex'>
                                        <input
                                          type="date"
                                          id="monday_proposition"
                                          name="monday_proposition"
                                          className="shadow appearance-none font-[600] border rounded-[4px]  placeholder:text-gray-600 bg-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.monday_proposition}
                                        />

                                        <input
                                          type="time"
                                          id="monday_time"
                                          name="monday_time"
                                          placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.monday_time}
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
                                          value={selectedForm?.tuesday_proposition}
                                        />

                                        <input
                                         type="time"
                                         id="tuesday_time"
                                         name="tuesday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.tuesday_time}
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
                                          value={selectedForm?.wednesday_proposition}
                                        />

                                        <input
                                         type="time"
                                         id="wednesday_time"
                                         name="wednesday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.wednesday_time}
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
                                          value={selectedForm?.thursday_proposition}
                                        />

                                        <input
                                         type="time"
                                         id="thursday_time"
                                         name="thursday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.thursday_time}
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
                                          value={selectedForm?.friday_proposition}
                                        />

                                        <input
                                         type="time"
                                         id="friday_time"
                                         name="friday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.friday_time}
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
                                          value={selectedForm?.saturday_proposition}
                                        />

                                        <input
                                         type="time"
                                         id="saturday_time"
                                         name="saturday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.saturday_time}
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
                                          value={selectedForm?.sunday_proposition}
                                        />

                                        <input
                                         type="time"
                                         id="sunday_time"
                                         name="sunday_time"
                                         placeholder='Time Proposition'
                                          className="shadow appearance-none font-[600] w-full border rounded-[4px] bg-gray-300  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          value={selectedForm?.sunday_time}
                                        />

                                      </div>
                                    </div>

                                 
                                    
                                    
                                   


                                  </form>
                                </div>
                              </div>





                            


                              <div className="text-customOrange font-[500] p-2 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Professeur</span>

                                <div className="overflow-x-auto h-72 flex text-gray-800">
                                  <div className="border-collapse font-light text-[9px]">

                                    <div className='mt-2 text-[12px]'>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Nom : {selectedForm?.nameProf}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Ville : {selectedForm?.prof_ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Telephone : {selectedForm?.prof_telephone}</p>

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



                              <div className="text-customOrange font-[500] p-2 rounded-[2px] outline  outline-1">
                                <span className='text-start text-gray-800'>Form Client</span>

                                <div className="overflow-x-auto h-72 flex text-gray-800">
                                  <div className="border-collapse font-light text-[9px]">

                                    <div className='mt-2 text-[12px]'>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Nom : {selectedForm?.nameClient}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Ville : {selectedForm?.client_ville}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Telephone : {selectedForm?.client_telephone}</p>

                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Email : {selectedForm?.emailClient}</p>
                                      <p className="py-2 px-4 border-b border-gray-700 font-semibold">Price Total : {selectedForm?.price_total}</p>
         
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
                      
                     
      


                           
                             
 
                <tbody>
                </tbody>
              </div>
            </div>



          </div>

      

   


  )
}

export default withAuth(AdmissionsListArchiver);