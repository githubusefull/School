/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Ensure you import the correct jwt-decode module
import withAuth from '@/hoc/withAuth';

export interface FormDataClient {
  userId: string;
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
  userIdNote: string; // Add userId here
  userIdInterview: string;
  userIdRelance: string;

}
interface IAdmissionFormClient {
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}

interface FormDataUpdateUser {
  id: string;
  numberOfUserIdsClient: number;

}
const AdmissionClient: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataClient>({
    userId: '',
    name: '',
    prenome: '',
    email: '',
    password: '',
    ville: '',
    telephone_portable: '',
    vous_etes: '',
    Les_cours_sont_pour: '',
    Niveau: '',
    Matière_souhaitée: '',
    autres_détails: '',
    comment_vous_nous_avez: '',
    userIdNote: '', // Add userId here
    userIdInterview: '',
    userIdRelance: '',    //cv_Photo: null,

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


  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      console.log('User ID:', userId);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setFormData(prev => ({ ...prev, userId }));
      setFormDataUpdateUser(prev => ({ ...prev, id: userId })); // Update formDataUpdateUser with userId

    }
  }, [userId]);








  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));



  };

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');


    try {
      const response = await fetch('/api/submitFormClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        await handleUpdateUser();
        setFormData({
          userId: '',
          userIdNote: '', // Add userId here
          userIdInterview: '',
          userIdRelance: '',
          name: '',
          prenome: '',
          email: '',
          password:'',
          ville: '',
          telephone_portable: '',
          vous_etes:'',
          Les_cours_sont_pour:'',
          Niveau:'',
          Matière_souhaitée:'',
          autres_détails:'',
          comment_vous_nous_avez:'',


         
        });
        setMessage(data.message);
        toast.success(data.message);
        router.push('/clientadmissions');
        setTimeout(() => {
          window.location.href = '/clientadmissions';
        }, 100);

      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error); // Log error details
      toast.error(`Error: ${error.message}`);
    }
  };




  // update 

  const [admissionsClient, setAdmissionsClient] = useState<IAdmissionFormClient[]>([]);
  const [userIdL, setUserIdL] = useState<string | null>(null);




  const getUserIdFromTokenClient = (token: string): string | null => {
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
      const userId = getUserIdFromTokenClient(token);
      console.log('User ID:', userId);
      setUserIdL(userId);
    }
  }, []);


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
  const numberOfUserIdsClient = admissionsClient.filter(admission => admission.userId === userIdL).length + 1;

  const [formDataUpdateUser, setFormDataUpdateUser] = useState<FormDataUpdateUser>({
    id: '',

    numberOfUserIdsClient: 0,

  });


  const handleUpdateUser = async () => {
    if (!userId) {
      toast.error('No user ID found');
      return;
    }

    try {
      const response = await fetch('/api/user_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          id: formDataUpdateUser.id,
          updateData: {
            numberOfUserIdsClient,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Updated Document:', data);

      setFormDataUpdateUser((prevState) => ({
        ...prevState,
        numberOfUserIdsClient: prevState.numberOfUserIdsClient + 1,

      }));

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-8 rounded-[5px] outline  outline-1" onSubmit={handleSubmit}>
      <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: ESPACE CLIENT</p>
      {message && (<p className='text-yellow-600'>{message}</p>)}


      <p className='text-gray-300 font-sans text-[15px] mb-4'>
        Complétez les champs suivants pour vous inscrire à nos services de cours de soutien à domicile. Nous traiterons votre demande et nous vous informerons de notre réponse.
      </p>


      <div className="mb-4">

        <select className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={formData.vous_etes}
          id="vous_etes"
          name="vous_etes">
          <option value="" className="">Vous êtes ?</option>
          <option value="Parents d'eleves">Parents d'eleves</option>
          <option value="Ecolire collégien lyceen étudiant">Ecolire, collégien, lycéen ou étudiant</option>
          <option value="Adulte souhaitant une formation">Adulte souhaitant une formation</option>
          <option value="Entreprise">Entreprise</option>

        </select>
      </div>
      <div className="mb-4">

        <select className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          id="Les_cours_sont_pour"
          name="Les_cours_sont_pour"
          value={formData.Les_cours_sont_pour}
          >
          <option value="" className="">Les cours sont pour</option>
          <option value="Vous meme">Vous même</option>
          <option value="Votre fils">Votre fils</option>
          <option value="Votre fille">Votre fille</option>
          <option value="Autre">Autre</option>
          <option value="Entreprise">Entreprise</option>

        </select>
      </div>
      <div className="mb-4">

        <select className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={formData.Niveau}
          id="Niveau"
          name="Niveau"
          >
          <option value="" className="">Niveau</option>
          <option value="Maternelle">Maternelle</option>
          <option value="CP">CP</option>
          <option value="Autre">Autre</option>
          <option value="CE1">CE1</option>
          <option value="CE2">CE2</option>
          <option value="CM1">CM1</option>
          <option value="CM2">CM2</option>
          <option value="6ème">6ème</option>
          <option value="5ème">5ème</option>
          <option value="4ème">4ème</option>
          <option value="3ème">3ème</option>
          <option value="CAP">CAP</option>
          <option value="Seconde">Seconde</option>
          <option value="Première">Première</option>
          <option value="Terminale">Terminale</option>
          <option value="BEP">BEP</option>
          <option value="Bac/pro">Bac pro</option>
          <option value="Bac+1">Bac+1</option>
          <option value="Bac+2/ou/plus">Bac+2 ou plus</option>
          <option value="Adulte/débutant">Adulte débutant</option>
          <option value="Adulte avancé">Adulte avancé</option>
        </select>

      </div>

      <div className="mb-4">

        <select className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          id="Matière_souhaitée"
          name="Matière_souhaitée"
          value={formData.Matière_souhaitée}

          >
          <option value="" className="">Matière souhaitée</option>
          <option value="Aide aux devoirs">Aide aux devoirs</option>
          <option value="Maths">Maths</option>
          <option value="Physique">Physique</option>
          <option value="Chimie">Chimie</option>
          <option value="Biologie SVT">Biologie/SVT</option>
          <option value="Français">Français</option>
          <option value="Arabe">Arabe</option>
          <option value="Anglais">Anglais</option>
          <option value="Allemand">Allemand</option>
          <option value="Espagnol">Espagnol</option>
          <option value="Economie">Economie</option>
          <option value="Comptabilité">Comptabilité</option>
          <option value="Gestion">Gestion</option>
          <option value="Philosophie">Philosophie</option>
          <option value="Histoire Géographie">Histoire/Géographie</option>
          <option value="Informatique">Informatique</option>
          <option value="Eléctronique">Eléctronique</option>
          <option value="Statistiques">Statistiques</option>
          <option value="Droit">Droit</option>
          <option value="Sociologie">Sociologie</option>
          <option value="Education islamique">Education islamique</option>
          <option value="Communication">Communication</option>
          <option value="Marketing">Marketing</option>
          <option value="Coaching">Coaching</option>
          <option value="Management">Management</option>
          <option value="Sciences de l'ingénierie">Sciences de l'ingénierie</option>
          <option value="Autres">Autres</option>

        </select>

      </div>
      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nom"
          className="shadow appearance-none border font-[600] rounded-[4px] w-full py-2 px-3 placeholder:text-gray-500 bg-gray-300 text-gray-500  leading-tight  focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 placeholder:text-gray-500 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.prenome}
          onChange={handleChange}
        />
      </div>



      <div className="mb-4">

        <select
          id="ville"
          name="ville"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.ville}
          onChange={handleChange}
        >
          <option value="" className="">Ville</option>
          <option value="Rabat">Rabat</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Kenitra">Kenitra</option>
          <option value="Asfi">Asfi</option>
          <option value="Fès">Fès</option>
          <option value="Tanger">Tanger</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Salé">Salé</option>
          <option value="Agadir">Agadir</option>
          <option value="Mohammedia">Mohammedia</option>
          <option value="Eljadida">Eljadida</option>
          <option value="Errachidia">Errachidia</option>
          <option value="Essaouira">Essaouira</option>
          <option value="Tétouan">Tétouan</option>
          <option value="Tanger">Tanger</option>
          <option value="Meknès">Meknès</option>
        </select>
      </div>

      <div className="mb-4">
        <input
          type="number"
          id="Telephone_portable"
          name="telephone_portable"
          placeholder="Téléphone portable"
          className="shadow appearance-none border font-[600] placeholder:text-gray-500 rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-500  leading-tight  focus:outline-none focus:shadow-outline"
          value={formData.telephone_portable}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 mt-8">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="shadow appearance-none font-[600] border rounded-[4px] placeholder:text-gray-500  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">

        <div className="mb-4">

          <textarea
            id="autres_détails"
            onChange={handleChange}
            name="autres_détails"
            value={formData.autres_détails}
            placeholder="Autres détails"
            className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border placeholder:text-gray-500  w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

        </div>
      </div>

      <div className="mb-4">

        <select
          id="comment_vous_nous_avez"
          name="comment_vous_nous_avez"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.comment_vous_nous_avez}
          onChange={handleChange}
        >
          <option value="">Comment vous nous avez connu?</option>
          <option value="Internet - Moteur de recherche">Internet - Moteur de recherche</option>
          <option value="Réseaux sociaux">Réseaux sociaux</option>
          <option value="Télévision">Télévision</option>
          <option value="Presse écrite">Presse écrite</option>
          <option value="Mailing">Mailing</option>
          <option value="SMS">SMS</option>
          <option value="Publicité mobile">Publicité mobile</option>
          <option value="Flyers publicitaires">Flyers publicitaires</option>
          <option value="Affiche publicitaire">Affiche publicitaire</option>
          <option value="Bouche à oreille (Parents)">Bouche à oreille (Parents)</option>
          <option value="Bouche à oreille (Élèves)">Bouche à oreille (Élèves)</option>
          <option value="Événement">Événement</option>
        </select>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Commander
        </button>

      </div>
    </form>
  );
};

export default withAuth(AdmissionClient);