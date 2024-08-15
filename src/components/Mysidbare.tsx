'use client';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import { useRouter } from 'next/navigation'; // for Next.js 13 and later
import Link from 'next/link';


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
  isConfirmed: boolean;
  counter: number;
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}
interface IAdmissionFormClient {
  userId: string;
  userIdInterview: string;
  userIdNote: string;
  userIdConfirmClient: string;
}
interface FormData {
  name: string;
  prenome: string;
  email: string;
  password: string;
  post: string;
  isAdmin: boolean;
}

const Mysidbare: React.FC = () => {
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
  const router = useRouter();

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
  const [isOpen, setIsOpen] = useState(true);

 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
 




  const numberOfUserIds = admissions.filter(admission => admission.userId === userIdL).length;
  const numberOfInterviews = admissions.filter(admission => admission.userIdInterview === userIdL).length;
  const numberOfUserNote = admissions.filter(admission => admission.userIdNote === userIdL).length;

  const numberOfUserIdsClient = admissionsClient.filter(admission => admission.userId === userIdL).length;
  const numberOfUserIdsInterClient = admissionsClient.filter(admission => admission.userIdInterview === userIdL).length;
  const numberOfUserIdsConfirmClient = admissionsClient.filter(admission => admission.userIdConfirmClient === userIdL).length;





const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('formData');
    alert('Logged out');
    setTimeout(() => {
      window.location.href = '/login';
  }, 100);
};

  return (
    <>
   
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-customOrange z-60 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mt-4">
          <button
            onClick={toggleSidebar}
            className="mb-4  bg-gray-800 text-white"
          >
            Close
          </button>
          <ul className='mt-8 p-4 flex justify-center mr-8'>
            <li className="mb-2 text-[12px]">
            <div className="text-white mt-4 mb-4 flex justify-center">Profile</div>
           
              <div className="text-white mt-4 mb-4">Name : <span>{formData.name ? formData.name : 'User name' }</span></div>
              <div className="text-white mt-4 mb-4">Email : <span>{formData.email ?  formData.email : 'User email'}</span></div>
              <div className="text-white mt-4 mb-4">Nb.professors : <span>{numberOfUserIds}</span></div>
              <div className="text-white mt-4 mb-4">Nb.professors.Accepted: <span>{numberOfUserNote}</span></div>
              <div className="text-white mt-4 mb-4">NB.professors.Interviews: <span>{numberOfInterviews}</span></div>
              <div className="text-white mt-4 mb-4">NB.clients: <span>{numberOfUserIdsClient}</span></div>
              <div className="text-white mt-4 mb-4">NB.client.Interviews: <span>{numberOfUserIdsInterClient}</span></div>
              <div className="text-white mt-4 mb-4">NB.client.Confirmed: <span>{numberOfUserIdsConfirmClient}</span></div>
           
              
              <div>
              {userIdL ? (
              <button
                onClick={handleLogout}
                type="button"
                className="bg-gray-300 text-[13px]  transition-all  duration-300 hover:scale-100 text-black font-bold py-[5px] mt-2 mb-1 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button
                  type="button"
                  className="bg-gray-300 text-[13px]  transition-all  duration-300 hover:scale-100 text-black font-bold py-[5px] mt-2 mb-1 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                  Login
                </button>
              </Link>
            )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Mysidbare;
