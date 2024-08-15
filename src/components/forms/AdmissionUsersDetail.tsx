/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import Link from 'next/link';
//import withAuth from '@/hoc/withAuth';

interface FormDataUser {
  id: string;
  percentage_affectation: string;
  percentage: string;
  salary_net: string;
  salary_month: string;
  prima: string;

}

interface FormData {
  _id: string;
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
  numberOfUserIds: number;
  numberOfInterviews: number;
  numberOfUserNote: number;
  numberOfUserIdsClient: number;
  numberOfUserIdsInterClient: number;
  numberOfUserIdsNoteClient: number;
  numberOfUserIdsConfirmClient: number;
  salary_month:string;
  percentage: string;
  percentage_affectation: string;
  prima: string;
  salary_net: string;
}

interface AdmissionFormNoteProps {
  form: FormData;
}

const AdmissionUsersDetail: React.FC<AdmissionFormNoteProps> = ({ form }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState<FormDataUser>({
    id: form._id,
    percentage: form.percentage,
    salary_net: form.salary_net,
    salary_month: form.salary_month,
    percentage_affectation: form.percentage_affectation,
    prima: form.prima

  });


  const getUserIdFromToken = (token: string): string | null => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  const [userIdNote, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      console.log('User ID:', userId);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (userIdNote) {
      setFormData(prev => ({ ...prev, userIdNote }));
    }
  }, [userIdNote]);






  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');


{/*   
    const total: number =
    Number(formData.niveau_1_note) +
    Number(formData.niveau_2_note) +
    Number(formData.niveau_3_note) +
    Number(formData.niveau_4_note) +
    Number(formData.niveau_5_note) +
    Number(formData.niveau_6_note);
  const average: number = total / 6;
  const finalTotal: number = Math.ceil(average * 100) / 100;
  */}

    try {
      const response = await fetch('/api/user_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({
        id: formData.id,
          updateData: {
            salary_month:formData.salary_month,
            percentage: formData.percentage,
            salary_net:formData.salary_net,
            percentage_affectation: formData.percentage_affectation,
            prima:formData.prima

          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Updated Document:', data);
      setFormData({
        id: '',
        percentage: '',
        salary_net:'',
        salary_month:'',
        percentage_affectation:'',
        prima:''     
      });
    

      router.push('/useradmissions');
      setTimeout(() => {
        window.location.href = '/useradmissions';
      }, 100);
      setMessage(data.message);
      toast.success('Edited Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');

    }
  };
  



  const handleUpdateUnaccepted = async () => {
    try {
      const response = await fetch('/api/unaccepted_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
         
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Updated Document:', data);
      
      router.push('/professeuradmissions');
      setMessage(data.message);
      toast.success('Refuse Sent Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');
    }
  };


  {/*  

  const total: number =
    Number(formData.niveau_1_note) +
    Number(formData.niveau_2_note) +
    Number(formData.niveau_3_note) +
    Number(formData.niveau_4_note) +
    Number(formData.niveau_5_note) +
    Number(formData.niveau_6_note);
  const average: number = total / 6;
  const finalTotal: number = Math.ceil(average * 100) / 100;
 */}
 
  return (
    <div>

  
    <form className="max-w-lg mx-auto p-8 rounded-[5px] outline  outline-1" onSubmit={handleSubmit}>
      <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: USER DETAILS</p>
      {message && (<p className='text-yellow-600'>{message}</p>)}
   


      <div className="mt-4 mb-4">
        
        
      </div>


      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
          className="shadow appearance-none border font-[600] rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-700  leading-tight  focus:outline-none focus:shadow-outline"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="Prenome"
          name="prenome"
          placeholder="Prènome"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.prenome}
          onChange={handleChange}
        />
      </div>



      <div className="mb-4">

        <input
          id="post"
          name="post"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.post}
          onChange={handleChange}
        />
          
          
      </div>
      <div className="mb-4">

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.email}
          onChange={handleChange}
        />
      </div>
{/*     
      <div className="mb-4">
        <label className="block text-gray-400 font-[600]  text-sm mb-2" htmlFor="cv_Photo">
          CV (avec photo obligatoire)
        </label>
        <input
          type="file"
          id="cv_Photo"
          //name="cv_Photo"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //onChange={handleChange} 

        />
      </div>
      */}
      <div className="mb-4">
        <input
          type="text"
          id="professeurs"
          name="professeurs"
          placeholder="Professeurs"
          className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={`Professeurs : ${!form.numberOfUserIds ? '0': form.numberOfUserIds}`}

          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="professeurs_accepted"
          name="professeurs_accepted"
          placeholder="Professeurs Accepted"
          className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={`Professeurs Accepted: ${!form.numberOfUserNote ? '0': form.numberOfUserNote}`}

          onChange={handleChange}
        />
      </div>

      <div className="mb-4">

        <input
          id="professeurs_interview"
          name="professeurs_interview"
          placeholder="Professeurs Interview"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={`Professeurs Interview: ${!form.numberOfInterviews ? '0': form.numberOfInterviews}`}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">

        <input
          id="clients"
          placeholder='Clients'
          name="clients"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={`Clients: ${!form.numberOfUserIdsClient ? '0': form.numberOfUserIdsClient}`}
          onChange={handleChange}
         />
         

      </div>
      <div className="mb-4">

      <input
          id="clients_interview"
          placeholder='Clients Interview'
          name="clients_interview"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={`Clients Interview: ${!form.numberOfUserIdsInterClient ? '0': form.numberOfUserIdsInterClient}`}

          onChange={handleChange}
         />
      </div>
      <div className="mb-4">

      <input
          id="clients_confirmed"
          placeholder='Clients Confirmed'
          name="clients_confirmed"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={`Clients Confirmed: ${!form.numberOfUserIdsConfirmClient ? '0': form.numberOfUserIdsConfirmClient}`}
          onChange={handleChange}
         />
      </div>

     {isOpen ?   
     <>
     
     <div className="mb-4">
        <input
          type="text"
          id="salary_month"
          name="salary_month"
          placeholder="Salary Month"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.salary_month}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="percentage"
          name="percentage"
          placeholder="Percentage"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.percentage}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="percentage_affectation"
          name="percentage_affectation"
          placeholder="Percentage Affectation"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.percentage_affectation}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="prima"
          name="prima"
          placeholder="Prima"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.prima}
          onChange={handleChange}
        />
      </div>
      
      </>
     : null}

    
    


     

    

      





              <div className="mt-8 mb-4">
                {isOpen ? 
                <>
                  <button
                      type="submit"
                      className="bg-blue-600  text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Accepted
                  </button>

                    <Link href="/">
                     <button
                      //onClick={handleUpdateUnaccepted}
                     
                      type="button"
                      className="bg-red-600 ml-2 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >

                      Back
                  </button>
                    </Link>
                 
                  </>
                     : 

                       <div
                          
                          onClick={toggleSidebar}
                          className="bg-green-600 cursor-pointer  text-gray-300 font-bold py-2 px-5 w-20 rounded focus:outline-none focus:shadow-outline">
                            Edite
                   
                      </div>
                     
}
                  </div>
    </form> 
   
    </div>
  );
};

export default AdmissionUsersDetail;