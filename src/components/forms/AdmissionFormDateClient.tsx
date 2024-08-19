/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';  // or import moment from 'moment';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module

interface FormDataDate {
  id: string;
  date_interview: number;
  time_interview: string;
  userIdInterview: string;


}
interface IAdmissionFormClient {
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
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}

interface FormDataUpdateUser {
  id: string;
  numberOfUserIdsInterClient: number;
}
interface FormData {
  _id: string;
  name: string;
  prenome: string;
  email: string;
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
  date_interview: number;
  time_interview: string;
  isConfirmed: boolean; // Add boolean field

}

interface AdmissionFormNoteProps {
  form: FormData;
}

const AdmissionFormDateClient: React.FC<AdmissionFormNoteProps> = ({ form }) => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

// finalTotal is a string

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


const [formData, setFormData] = useState<FormDataDate>({
  id: form._id,
  date_interview: form.date_interview,
  time_interview: form.time_interview,
  userIdInterview: form.userIdInterview

 
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

const [userIdInterview, setUserIdInterview] = useState<string | null>(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const userId = getUserIdFromToken(token);
    console.log('User ID:', userId);
    setUserIdInterview(userId);
  }
}, []);

const [formDataUpdateUser, setFormDataUpdateUser] = useState<FormDataUpdateUser>({
  id: '',
  numberOfUserIdsInterClient: 0,
});
const numberOfUserIdsInterClient = admissionsClient.filter(admission => admission.userIdInterview === userIdInterview).length + 1;


useEffect(() => {
  if (userIdInterview) {
    setFormData(prev => ({ ...prev, userIdInterview }));
    setFormDataUpdateUser(prev => ({ ...prev, id: userIdInterview })); // Update formDataUpdateUser with userId

  }
}, [userIdInterview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token');



    try {
      const response = await fetch('/api/client_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({
          id: formData.id,
          updateData: {
            date_interview: formData.date_interview,
            time_interview: formData.time_interview,
            userIdInterview,
         
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Updated Document:', data);
      await handleUpdateUser();
      setFormData({
        id: '',
        date_interview: 0,
        time_interview: '',
        userIdInterview: ''

      });
      
    
        
    router.push('/clientadmissions');
    setTimeout(() => {
      window.location.href = '/clientadmissions';
    }, 100);
      setMessage(data.message);
      toast.success('Sent Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };


   //all update here:
   
   
   const handleUpdateUser = async () => {
    if (!userIdInterview) {
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
            numberOfUserIdsInterClient,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data  = await response.json();
      console.log('Updated Document:', data);

      setFormDataUpdateUser((prevState) => ({
        ...prevState,
        numberOfUserIdsInterClient: prevState.numberOfUserIdsInterClient + 1,

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
          value={form.vous_etes}
          id="vous_etes"
          name="vous_etes">
          <option value="" className="">Vous êtes ?</option>
          <option value="parents">Parents d'eleves</option>
          <option value="ecolire/collegien/lyceen/etudiant">Ecolire, collégien, lycéen ou étudiant</option>
          <option value="adulte/souhaitant/une/formation">Adulte souhaitant une formation</option>
          <option value="entreprise">Entreprise</option>

        </select>
      </div>
      <div className="mb-4">

        <select className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          id="Les_cours_sont_pour"
          name="Les_cours_sont_pour"
          value={form.Les_cours_sont_pour}
          >
          <option value="" className="">Les cours sont pour</option>
          <option value="Vous/meme">Vous même</option>
          <option value="Votre/fils">Votre fils</option>
          <option value="Votre/fille">Votre fille</option>
          <option value="Autre">Autre</option>
          <option value="Entreprise">Entreprise</option>

        </select>
      </div>
      <div className="mb-4">

        <select className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={form.Niveau}
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
          value={form.Matière_souhaitée}

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
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-300 placeholder:text-gray-500 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={form.prenome}
          onChange={handleChange}
        />
      </div>



      <div className="mb-4">

        <select
          id="ville"
          name="ville"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          value={form.ville}
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
          value={form.telephone_portable}
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
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">

        <div className="mb-4">

          <textarea
            id="autres_détails"
            onChange={handleChange}
            name="autres_détails"
            value={form.autres_détails}
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
          value={form.comment_vous_nous_avez}
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
     

    {form.date_interview ?  

        <div className="mb-4">
        <input
          type="text"
          id="date_interview"
          name="date_interview"
          placeholder={`${format(new Date(form.date_interview), 'dd-MM-yyyy')}`}
          className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
          //value={formData.date_interview}
          //onChange={handleChange}
        />
      </div>

    : 
    <div className="mb-4 flex gap-2">
    <input
      type="date"
      id="date_interview"
      name="date_interview"
      placeholder='date_interview'
      className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={formData.date_interview}
      onChange={handleChange}
    />
     <input
    type="time"
    id="time_interview"
    name="time_interview"
    placeholder='Time Interview'
    className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={formData.time_interview}
    onChange={handleChange}
  />
  </div>  
  
  }


      <div className="mb-4">
      {form.date_interview ? 
      
      <button
          type="submit"
          className="bg-green-600  text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
                  {form.isConfirmed ? 'UnResend' : 'Resend'}

        </button>
      
      :
      
      <button
          type="submit"
          className="bg-green-500  text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      
      }



     
        
      

      </div>
    </form>
  );
};

export default AdmissionFormDateClient;