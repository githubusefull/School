'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
//import jwtDecode from 'jwt-decode';

interface FormData {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
}

const AdmissionUser: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    prenome: '',
    email: '',
    password: '',
    post: '',
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Adjust this if you store the token differently

    try {
      const response = await axios.post('/api/submitFormUser', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Store the token in localStorage if received
        localStorage.setItem('token', response.data.token);

        toast.success('Form submitted successfully!');
        router.push('/useradmissions'); // Redirect to a success page or similar
      } else {
        toast.error('Form submission failed!');
        setMessage('Yes')
      }
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };
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

export default AdmissionUser;