'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
//import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module


interface FormData {
    name: string;
    prenome: string;
    email: string;
    post: string;
    password: string;
    isAdmin: boolean;
 }

const Formlogin = () => {
 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Specify error type
    //const [formData, setFormData] = useState<FormData | null>(null);


    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        prenome: '',
        email: '',
        password: '',
        post: '',
        isAdmin: false
      });
    
    
     
       
      useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
          try {
            const parsedFormData = JSON.parse(storedFormData);
            console.log('Form Data:', parsedFormData);
            // Perform any other operations with the parsedFormData
            setFormData(parsedFormData);
          } catch (error) {
            console.error('Failed to parse formData from localStorage:', error);
          }
        }
      }, []);

 

    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
   
        try {
          const response = await axios.post('/api/loginForm', { email, password });
          const {token, formData} = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('formData', JSON.stringify(formData));
          toast.success('Login Success');
          router.push('/');

          // Wait a moment and then reload the page
          setTimeout(() => {
                window.location.href = '/';
            }, 100);

         } catch (error: any) {
                console.error(error);
                toast.error(`Error: ${error.response?.data?.message || error.message}`);
                setError('Login failed');
                router.push('/login');

        }
      };
        //console.log(formData)
    return (
        <form className="max-w-lg mx-auto p-8 mt-9 rounded-[5px] outline  outline-1" onSubmit={handleSubmit}>
        <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: ESPACE LOGIN</p>
       
            <div className="mb-4">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
               
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
          



            <div className="mt-[30px]">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>

            </div>
        </form>
    );
};

export default Formlogin;