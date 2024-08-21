'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import withAuth from '@/hoc/withAuth';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import CheckoutSteps from '../ChekoutSteps';

interface FormData {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
  isAdmin: boolean;
  numberOfUserIds: 0,
  numberOfInterviews: 0,
  numberOfUserNote: 0,
  numberOfUserIdsClient: 0,
  numberOfUserIdsInterClient: 0,
  numberOfUserIdsNoteClient: 0,
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
const AdmissionUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    prenome: '',
    email: '',
    password: '',
    post: '',
    isAdmin: false,
    numberOfUserIds: 0,
    numberOfInterviews: 0,
    numberOfUserNote: 0,
    numberOfUserIdsClient: 0,
    numberOfUserIdsInterClient: 0,
    numberOfUserIdsNoteClient: 0,
  });


  



  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/submitFormUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token if present

        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('User registered successfully:', result);
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        setMessage(result.message)
        toast.success(result.message);
        setTimeout(() => {
              window.location.href = '/useradmissions';
          }, 100);  
        
        
        } else {
        console.error('Registration failed:', result.message);
        toast.error(result.message);

        // Handle errors (e.g., show error message)
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };




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


  const [admissions, setAdmissions] = useState<IAdmissionFormProf[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormProf');
        const data = await response.json();
        setAdmissions(data);
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

 
  const numberOfUserIds = admissions.filter(admission => admission.userId === userIdL).length;
  const numberOfInterviews = admissions.filter(admission => admission.userIdInterview === userIdL).length;
  const numberOfUserNote = admissions.filter(admission => admission.userIdNote === userIdL).length;

  const numberOfUserIdsClient = admissionsClient.filter(admission => admission.userId === userIdL).length;
  const numberOfUserIdsInterClient = admissionsClient.filter(admission => admission.userIdInterview === userIdL).length;
  const numberOfUserIdsNoteClient = admissionsClient.filter(admission => admission.userIdNote === userIdL).length;


  return (
    <form className="max-w-lg mx-auto p-8 mt-9 rounded-[5px] outline  outline-1" onSubmit={handleSubmit}>

      <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: ESPACE USER</p>
      {message && (<p className='text-yellow-600'>{message}</p>)}


      
 


      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
          className="shadow appearance-none border font-[600] rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500  leading-tight  focus:outline-none focus:shadow-outline"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="Prenome"
          name="prenome"
          placeholder="Prènome"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.prenome}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">

        <select
          id="post"
          name="post"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.post}
          onChange={handleChange}
        >
          <option value="" className="">Post</option>
          <option value="admin_1">Admin 1</option>
          <option value="admin_2">Admin 2</option>
          <option value="admin_3">Admin 3</option>
          <option value="admin_4">Admin 4</option>
          <option value="admin_5">Admin 5</option>
         
        </select>
      </div>
    
     
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enregister
        </button>

      </div>
    </form>
  );
};

export default withAuth(AdmissionUser);