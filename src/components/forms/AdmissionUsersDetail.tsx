/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import Link from 'next/link';
//import withAuth from '@/hoc/withAuth';

interface FormDataUser {
  id: string;
  name: string;
  prenome: string;
  post:string;
  email:string;
  numberOfUserIds: number;
  numberOfInterviews: number;
  numberOfUserNote: number;
  numberOfUserIdsClient: number;
  numberOfUserIdsInterClient: number;
  numberOfUserIdsNoteClient: number;
  numberOfUserIdsConfirmClient: number;
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







const AdmissionUsersDetail: React.FC<AdmissionFormNoteProps> = ({  form }) => {



  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState<FormDataUser>({
    id: form._id,
    name: form.name,
    prenome: form.prenome,
    post: form.post,
    email: form.email,
    percentage: form.percentage,
    salary_net: form.salary_net,
    salary_month: form.salary_month,
    percentage_affectation: form.percentage_affectation,
    prima: form.prima,
    numberOfUserIds: form.numberOfUserIds,
    numberOfInterviews: form.numberOfInterviews,
    numberOfUserNote: form.numberOfUserNote,
    numberOfUserIdsClient: form.numberOfUserIdsClient,
    numberOfUserIdsInterClient: form.numberOfUserIdsInterClient,
    numberOfUserIdsNoteClient: form.numberOfUserIdsNoteClient,
    numberOfUserIdsConfirmClient: form.numberOfUserIdsConfirmClient,

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
            name: formData.name,
            prenome: formData.prenome,
            email: formData.email,
            post: formData.post,
            percentage: formData.percentage,
            salary_net: formData.salary_net,
            salary_month: formData.salary_month,
            percentage_affectation: formData.percentage_affectation,
            prima: formData.prima,
            numberOfUserIds: formData.numberOfUserIds,
            numberOfInterviews: formData.numberOfInterviews,
            numberOfUserNote: formData.numberOfUserNote,
            numberOfUserIdsClient: formData.numberOfUserIdsClient,
            numberOfUserIdsInterClient: formData.numberOfUserIdsInterClient,
            numberOfUserIdsNoteClient: formData.numberOfUserIdsNoteClient,
            numberOfUserIdsConfirmClient: formData.numberOfUserIdsConfirmClient,

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
        name:'',
        prenome:'',
        post:'',
        email:'',
        percentage: '',
        salary_net:'',
        salary_month:'',
        percentage_affectation: '',
        prima: '',
        numberOfUserIds: 0,
        numberOfInterviews: 0,
        numberOfUserNote: 0,
        numberOfUserIdsClient: 0,
        numberOfUserIdsInterClient: 0,
        numberOfUserIdsNoteClient: 0,
        numberOfUserIdsConfirmClient: 0   
      });
    

      router.push('/useradmissions');
  
        window.location.href = '/useradmissions';
      
      toast.success(data.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');

    }
  };
  


  const formRef = useRef<HTMLFormElement>(null);


  const handleSubmitProposition = async ( ) => {
  


    try {
      const response = await fetch('/api/submitFormUserOriginal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            id: form._id,
            name: form.name,
            prenome: form.prenome,
            email: form.email,
            post: form.post,
            percentage: form.percentage,
            salary_net: form.salary_net,
            salary_month: form.salary_month,
            percentage_affectation: form.percentage_affectation,
            prima: form.prima,
            numberOfUserIds: form.numberOfUserIds,
            numberOfInterviews: form.numberOfInterviews,
            numberOfUserNote: form.numberOfUserNote,
            numberOfUserIdsClient: form.numberOfUserIdsClient,
            numberOfUserIdsInterClient: form.numberOfUserIdsInterClient,
            numberOfUserIdsNoteClient: form.numberOfUserIdsNoteClient,
            numberOfUserIdsConfirmClient: form.numberOfUserIdsConfirmClient,
          }),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({
          id: '',
          name:'',
          prenome:'',
          post:'',
          email:'',
          percentage: '',
          salary_net:'',
          salary_month:'',
          percentage_affectation: '',
          prima: '',
          numberOfUserIds: 0,
          numberOfInterviews: 0,
          numberOfUserNote: 0,
          numberOfUserIdsClient: 0,
          numberOfUserIdsInterClient: 0,
          numberOfUserIdsNoteClient: 0,
          numberOfUserIdsConfirmClient: 0   
        });
        if (formRef.current) {
          formRef.current.reset();
        }
        //toast.success(data.message);
        //setMessage(data.message);
        toast.success(data.message);

      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error); // Log error details
      toast.error(`Error: ${error.message}`);
    }
  };

 
 










 
  return (
    <div>

  
    <form className="max-w-lg mx-auto p-8 rounded-[5px] outline  outline-1" ref={formRef} onSubmit={handleSubmit}>
      <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: USER DETAILS</p>
  

      <div className="mt-4 mb-4">
        
        
      </div>


      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
          className="shadow appearance-none border font-[600] rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-700  leading-tight  focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.prenome}
          onChange={handleChange}
        />
      </div>



      <div className="mb-4">

        <input
          id="post"
          name="post"
          placeholder='Post'
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.post}
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
          value={formData.email}
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
          <label className=''>Professeurs</label>
          <input
            type="number"
            id="numberOfUserIds"
            name="numberOfUserIds"
            className="shadow appearance-none font-[600] border placeholder:text-gray-600 rounded-[4px] bg-gray-300 w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.numberOfUserIds}
            onChange={handleChange}
          />
        </div>

      <div className="mb-4">
      <label className=''>Professeurs Accepted</label>

        <input
          type="text"
          id="numberOfUserNote"
          name="numberOfUserNote"
          className="shadow appearance-none font-[600] border rounded-[4px] placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.numberOfUserNote}

          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
      <label className=''>Professeurs Interview</label>

        <input
          id="numberOfInterviews"
          name="numberOfInterviews"
          className="shadow appearance-none font-[600] border rounded-[4px] placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.numberOfInterviews}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
      <label className=''>Clients</label>

        <input
          id="numberOfUserIdsClient"
          name="numberOfUserIdsClient"
          placeholder={`Clients: ${form.numberOfUserIdsClient ? form.numberOfUserIdsClient : '0' }`}
          className="shadow appearance-none font-[600] border rounded-[4px] placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.numberOfUserIdsClient}
          onChange={handleChange}
         />
         

      </div>
        <div className="mb-4">

          <label className=''>Clients Interview</label>

          <input
            id="numberOfUserIdsInterClient"
            name="numberOfUserIdsInterClient"
            className="shadow appearance-none font-[600] border rounded-[4px] placeholder:text-gray-600 bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.numberOfUserIdsInterClient}
            onChange={handleChange}
          />
        </div>
      <div className="mb-4">
      <label className=''>Clients Confirmed</label>

      <input
          id="numberOfUserIdsConfirmClient"
          name="numberOfUserIdsConfirmClient"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 placeholder:text-gray-600 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.numberOfUserIdsConfirmClient}
          onChange={handleChange}
         />
      </div>

     {isOpen ?   
     <>
     
     <div className="mb-4">
     <label className=''>Salary Month</label>

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
      <label className=''>Percentage</label>

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
      <label className=''>Percentage Affectation</label>

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
      <label className=''>Prima</label>
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

              <button
                type="button"
                onClick={handleSubmitProposition}
                className="bg-yellow-600 ml-2 cursor-pointer text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Data
              </button>
                   
                 
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