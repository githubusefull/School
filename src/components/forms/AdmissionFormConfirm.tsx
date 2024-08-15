/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './inputDate.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module


interface FormDataClient {
  userIdConfirmClient: string;
  id: string;
  pay: string;
  price_total: number;
  price_ticket: number;
  ticket_number: number;
  prof_percentage: number;
  prof_price: number;
  details: string;
  isConfirmed: boolean;
}
interface IAdmissionFormClient {
  userId: string;
  userIdConfirmClient:string;
}
interface FormData {
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
  note_de_Francaise: number;
  note_de_CV: number;
  motivation: string;
  civilite: string;
  telephone_fixe: string;
  annee_obtention_du_Bac: string;
  date_de_naissance: string;
  date_interview: number;
  pay: string;
  details: string;
  price_total: number;
  price_ticket: number;
  ticket_number: number;
  prof_percentage: number;
  prof_price: number;
  profPercentage:number,
  ticketNumber:number,
  isConfirmed: boolean; // Add boolean field
  counter: number; // Add counter field
  //numberOfUserIdsConfirmClient: number;
  userIdConfirmClient: string;

}
interface FormDataUpdateUser {
  id: string;
  numberOfUserIdsConfirmClient: number;
}

interface AdmissionFormNoteProps {
  form: FormData;
}

const AdmissionFormCofirm: React.FC<AdmissionFormNoteProps> = ({ form }) => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const [formDataUpdateUser, setFormDataUpdateUser] = useState<FormDataUpdateUser>({
    id: '',
    numberOfUserIdsConfirmClient: 0,
  });


  const [formData, setFormData] = useState<FormDataClient>({
    id: form._id,
    userIdConfirmClient:form.userIdConfirmClient,
    pay: form.pay,
    details: form.details,
    price_total: form.price_total,
    price_ticket: form.price_ticket,
    ticket_number: form.ticket_number,
    prof_percentage: form.prof_percentage,
    prof_price: form.prof_price,
    isConfirmed: true,

    //finalTotal: 0,
  
  });

// userL here: 





  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = Number(formData.price_total) / Number(formData.price_ticket);
    const percentageToSubtract = result * Number(formData.prof_percentage) / 100;
    const profPT = result - percentageToSubtract;
    const tickNT = Number(formData.price_total) / Number(formData.price_ticket);
  
       
  
    //const profPercentage: number = Math.ceil(profPT * 100) / 100;
    const ticketNumber: number = Math.ceil(tickNT * 100) / 100;
    const profPercentage = Number(formData.price_ticket) * Number(formData.prof_percentage) / 100;

    
    try {
      const response = await fetch('/api/client_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        id: formData.id,
          updateData: {
            pay: formData.pay,
            details: formData.details,
            price_total: formData.price_total,
            price_ticket: formData.price_ticket,
            ticket_number: formData.ticket_number,
            prof_percentage: formData.prof_percentage,
            prof_price: formData.prof_price,
            isConfirmed: formData.isConfirmed,
            profPercentage,
            ticketNumber,
            userIdConfirmClient,
           
          
        
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
        userIdConfirmClient: '',
        id: '',
        pay: '',
        details: '',
        price_total: 0,
        price_ticket: 0,
        ticket_number: 0,
        prof_percentage: 0,
        prof_price: 0,
        isConfirmed: true

        
      });

    
  

    router.push('/clientadmissions');
    setTimeout(() => {
      window.location.href = '/clientadmissions';
    }, 100);
      setMessage(data.message);
      toast.success('Edited Successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update document');

    }
  };
  
 // userIdClientConfirm
 const [userIdConfirmClient, setUserIdConfirmClient] = useState<string | null>(null);

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
    setUserIdConfirmClient(userId);
  }
}, []);

useEffect(() => {
  if (userIdConfirmClient) {
    setFormDataUpdateUser(prev => ({ ...prev, id: userIdConfirmClient })); // Update formDataUpdateUser with userId

  }
}, [userIdConfirmClient]);


  const result = Number(formData.price_total) / Number(formData.price_ticket);
  const percentageToSubtract = result * Number(formData.prof_percentage) / 100;
  const profPT = result - percentageToSubtract;
  const tickNT = Number(formData.price_total) / Number(formData.price_ticket);

     
 
  const profPercentage = Number(formData.price_ticket) * Number(formData.prof_percentage) / 100;

  
  //const profPercentage : number = Math.ceil(profPT * 100) / 100;
  const ticketNumber: number = Math.ceil(tickNT * 100) / 100;
  
// user update from client update
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


const [userIdL, setUserIdL] = useState<string | null>(null);
const numberOfUserIdsConfirmClient = admissionsClient.filter(admission => admission.userIdConfirmClient === userIdL).length + 1;



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
    const userId = getUserIdFromTokenTow(token);
    console.log('User ID:', userId);
    setUserIdL(userId);
  }
}, []);

const handleUpdateUser = async () => {
  if (!userIdL) {
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
          numberOfUserIdsConfirmClient,
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
      numberOfUserIdsConfirmClient: prevState.numberOfUserIdsConfirmClient + 1,

    }));
    } catch (error) {
    console.error('Error updating user:', error);
  }
};




  return (
    <form className="max-w-lg mx-auto p-8 rounded-[5px] outline  outline-1" onSubmit={handleSubmit}>
      <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: ESPACE PROFESSEUR</p>
      {message && (<p className='text-yellow-600'>{message}</p>)}
   
      <p className='text-gray-300 font-sans text-[15px]'>Professeurs : Vous avez un excellent relationnel, un solide bagage et une réelle passion pour l’enseignement ?

        Vous souhaitez intégrer notre équipe enseignante ? Déposez votre candidature</p>

      <div className="mt-4 mb-4">
        <label className="block font-[600] text-gray-400   mb-2">
          Civilité
        </label>
        <div>
          <label className="inline-flex   items-center">
            <input
              type="radio"
              name="civilite"
              value='Mr'
              className="form-radio  bg-gray-300"
              onChange={handleChange}
              checked={form.civilite === 'Mr'}
            />
            <span className="ml-2 text-gray-300">Mr</span>
          </label>
          <label className="inline-flex rounded-[4px] items-center ml-6">
            <input
              type="radio"
              name="civilite"
              value="Mme"
              className="form-radio bg-gray-300"
              onChange={handleChange}
              checked={form.civilite === 'Mme'}
            />
            <span className="ml-2 text-gray-300">Mme</span>
          </label>
          <label className="inline-flex rounded-[4px] items-center ml-6">
            <input
              type="radio"
              name="civilite"
              value="Mlle"
              className="form-radio bg-gray-300"
              onChange={handleChange}
              checked={form.civilite === 'Mlle'}
            />
            <span className="ml-2 text-gray-300">Mlle</span>
          </label>
        </div>
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

        <select
          id="ville"
          name="ville"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.ville}
          onChange={handleChange}
        >
          <option value="" className="">Ville</option>
          <option value="Rabat">Rabat</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Kenitra">Kenitra</option>
          <option value="Asfi">Asfi</option>
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
          <option value="Meknès">Meknès</option>
        </select>
      </div>
      <div className="mb-4">

        <select
          id="quartiers_Rabat"
          name="quartiers_Rabat"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.quartiers_Rabat}
          onChange={handleChange}
        >
          <option value="" className="">Quartiers Rabat</option>
          <option value="Agdal">Agdal</option>
          <option value="Akkari">Akkari</option>
          <option value="Ambassadours">Ambassadours</option>
          <option value="Aviation">Aviation</option>
          <option value="Fath">Fath</option>
          <option value="Hay Riad">Hay Riad</option>
          <option value="Hay Nahda">Hay Nahda</option>
          <option value="Océan">Océan</option>
          <option value="Mabella">Mabella</option>
          <option value="Massira">Massira</option>
          <option value="Médina">Médina</option>
          <option value="Orangers">Orangers</option>
          <option value="Oudaya">Oudaya</option>
          <option value="Souissi">Souissi</option>
          <option value="Takadoum">Takadoum</option>
          <option value="Témara">Témara</option>
        </select>
      </div>
      <div className="mb-4">

        <select
          id="Quartiers_Casablanca"
          name="quartiers_Casablanca"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.quartiers_Casablanca}
          onChange={handleChange}
        >
          <option value="" className="">Quartiers Casablanca</option>
          <option value="Aïn Diab">Aïn Diab</option>
          <option value="Ain Sebaâ">Ain Sebaâ</option>
          <option value="Ain Chok">Ain Chok</option>
          <option value="Ali 1 et 2">Ali 1 et 2</option>
          <option value="Anfa">Anfa</option>
          <option value="Ancienne Medina">Ancienne Medina</option>
          <option value="bourgogne">Bourgogne</option>
          <option value="California">California</option>
          <option value="Florida">Florida</option>
          <option value="Sidi Maarouf">Sidi Maarouf</option>
          <option value="Derb Ghallef">Derb Ghallef</option>
          <option value="CIL">CIL</option>
          <option value="Belvédère">Belvédère</option>
          <option value="Ben M'Sick">Ben M'Sick</option>
          <option value="Sbata">Sbata</option>
          <option value="Hay Mohammadi">Hay Mohammadi</option>
          <option value="Hay Qods">Hay Qods</option>
          <option value="Hay Hanna">Hay Hanna</option>
          <option value="Ain Sebaa">Ain Sebaa</option>
          <option value="Roches Noires">Roches Noires</option>
          <option value="Sidi Bernoussi">Sidi Bernoussi</option>
          <option value="Mers Sultan">Mers Sultan</option>
          <option value="Sidi Moumen">Sidi Moumen</option>
          <option value="Bernoussi">Bernoussi</option>

        </select>
      </div>
      <div className="mb-4">
        <input
          type="number"
          id="Telephone_portable"
          name="telephone_portable"
          placeholder="Téléphone portable"
          className="shadow appearance-none border font-[600] rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-700  leading-tight  focus:outline-none focus:shadow-outline"
          value={form.telephone_portable}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          id="Telephone_fixe"
          name="telephone_fixe"
          placeholder="Téléphone fixe"
          className="shadow appearance-none border font-[600] rounded-[4px] w-full py-2 px-3 bg-gray-300 text-gray-700  leading-tight  focus:outline-none focus:shadow-outline"
          value={form.telephone_fixe}
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
          type="date"
          id="Date_de_naissance"
          name="date_de_naissance"
          placeholder="Date de naissance"
          className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.date_de_naissance}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="Annee_obtention_du_Bac"
          name="annee_obtention_du_Bac"
          placeholder="Année d'obtention du Bac ex: 2003"
          className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.annee_obtention_du_Bac}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">

        <select
          id="Situation_professionelle"
          name="situation_professionelle"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.situation_professionelle}
          onChange={handleChange}
        >
          <option value="" className="">Situation professionelle</option>
          <option value="etudiant">Etudiant</option>
          <option value="doctora/en/cours">Doctora en cours</option>
          <option value="professeur ">Professeur </option>
          <option value="retraité ">Retraité </option>
          <option value="a/la/recherche/d'emploi ">À la recherche d'emploi </option>
          <option value="auteur/Profession ">Auteur Profession</option>
        </select>
      </div>

      <div className="mb-4">

        <select
          id="Niveau_atteint_dans_les_etudes"
          name="niveau_atteint_dans_les_etudes"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.niveau_atteint_dans_les_etudes}
          onChange={handleChange}
        >
          <option value="" className="">Niveau atteint dans les ètudes</option>
          <option value="bac+3/license">bac+3 / License</option>
          <option value="bac+4/maitrise">bac+4 / Maitrise</option>
          <option value="bac+5/master">bac+5 / Master</option>
          <option value="bac+6">bac+6</option>
          <option value="doctorat">Doctorat</option>

        </select>
      </div>
      <div className="mb-4">

        <select
          id="ville"
          name="experiences_dans_l_enseignement"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.experiences_dans_l_enseignement}
          onChange={handleChange}
        >
          <option value="" className="">Experiences dans l'enseignement</option>
          <option value="ry">je suis professeur depuis plus d'un an </option>
          <option value="rj">j'ai eu plusieur expérience éducatives significatives</option>
          <option value="t">Il m'est arrivé de donner un cours ou deux</option>
          <option value="y">Je n'ai pas d'expérience éducative significative</option>
        </select>
      </div>
      <div className="mb-4">

        <select
          id="Cursus_economique_Commercial"
          name="cursus_economique_Commercial"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.cursus_economique_Commercial}
          onChange={handleChange}
        >
          <option value="" className="">---Cursus èconomique / Commercial---</option>
          <option value="ENCG">ENCG</option>
          <option value="ESCC">ESCC</option>
          <option value="ESCA">ESCA</option>
          <option value="ESIG">ESIG</option>
          <option value="ESG">ESG</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="specialte"
          name="specialte"
          placeholder="Votre Spécialté"
          className="shadow appearance-none border font-[600]  rounded-[4px] w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.specialte}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block font-[600] text-gray-400   mb-2">
          Motorisé
        </label>
        <div>
          <label className="inline-flex   items-center">
            <input
              type="radio"
              name="motorise"
              //value={form.motorise}
              className="form-radio  bg-gray-300"
              onChange={handleChange}
              checked={form.motorise === 'Oui'}
            />
            <span className="ml-2 text-gray-300">Oui</span>
          </label>
          <label className="inline-flex rounded-[4px] items-center ml-6">
            <input
              type="radio"
              name="motorise"
              //value={form.motorise}
              className="form-radio bg-gray-300"
              onChange={handleChange}
              checked={form.motorise === 'Non'}

            />
            <span className="ml-2 text-gray-300">Non</span>
          </label>

        </div>
      </div>
      <div className="mb-4">
        <label className="block font-[600] text-gray-400   mb-2">
          Pour chaque matière, indiquez le niveau maximal que vous pouvez enseigner :
        </label>
        <select
          id="Matiere_1"
          name="matiere_1"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.matiere_1}
          onChange={handleChange}
        >
          <option value="" className="">Matière 1</option>
          <option value="Physique">Physique</option>
          <option value="Maths">Maths</option>

        </select>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          
          <select
            id="Niveau_1"
            name="niveau_1"
            className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={form.niveau_1}
            onChange={handleChange}
          >
            <option value="" className="">Niveau 1</option>
            <option value="Primaire">Primaire</option>
            <option value="Collège">Collège</option>
            <option value="Lycée">Lycée</option>
          </select>
        


        </div>
      </div>





      <div className="mb-4">

        <select
          id="Matiere_2"
          name="matiere_2"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={form.matiere_3}


        >
          <option value="" className="">Matière 2</option>
          <option value="physique">Physique</option>
          <option value="maths">Maths</option>

        </select>
      </div>




      <div className="mb-4">
        <div className="flex items-center justify-between">
          <select
            id="Niveau_2"
            name="niveau_2"
            className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            value={form.niveau_2}

          >
            <option value="" className="">Niveau 2</option>
            <option value="physique">Physique</option>
            <option value="maths">Maths</option>
          </select>
        
        </div>
      </div>







      

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <select
            id="Niveau_3"
            name="niveau_3"
            className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            value={form.niveau_3}          >
            <option value="" className="">Niveau 3</option>
            <option value="physique">Physique</option>
            <option value="maths">Maths</option>
          </select>
        
        


        </div>
      </div>

      <div className="mb-4">
        <select
          id="Matiere_4"
          name="matiere_4"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={form.matiere_4}

        >
          <option value="" className="">Matière 4</option>
          <option value="physique">Physique</option>
          <option value="maths">Maths</option>

        </select>
      </div>


      <div className="mb-4">
        <div className="flex items-center justify-between">
          <select
            id="Niveau_4"
            name="niveau_4"
            className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            value={form.niveau_4}
          >
            <option value="" className="">Niveau 4</option>
            <option value="physique">Physique</option>
            <option value="maths">Maths</option>
          </select>
       
        </div>
      </div>



      <div className="mb-4">

        <select
          id="Matiere_5"
          name="matiere_5"
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={form.matiere_5}>

          <option value="" className="">Matière 5</option>
          <option value="physique">Physique</option>
          <option value="maths">Maths</option>

        </select>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <select
            id="Niveau_5"
            name="niveau_5"
            className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            value={form.niveau_5}

          >
            <option value="" className="">Niveau 5</option>
            <option value="physique">Physique</option>
            <option value="maths">Maths</option>
          </select>
        
        

        </div>
      </div>
      <div className="mb-4">

        <select
          id="Matiere_6"
          name="matiere_6"
          value={form.matiere_6}
          className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        >
          <option value="" className="">Matière 6</option>
          <option value="Physique">Physique</option>
          <option value="Maths">Maths</option>
        </select>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <select
            id="Niveau_6"
            name="niveau_6"
            value={form.niveau_6}

            className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          >
            <option value="" className="">Niveau 6</option>
            <option value="Physique">Physique</option>
            <option value="Maths">Maths</option>
          </select>
         
        </div>

        <div className="inline-flex text-gray-300  mt-4 items-center space-x-4">
        <label className="block font-[600] text-gray-400 ">
          Type of payement
        </label>
        <label className="inline-flex   items-center">
            <input
              type="radio"
              name="pay"
              value='cash'
              className="form-radio  bg-gray-300"
              onChange={handleChange}
              checked={formData.pay === 'cash'}
            />
            <span className="ml-2 text-gray-300">Cash</span>
          </label>
          <label className="inline-flex rounded-[4px] items-center ml-6">
            <input
              type="radio"
              name="pay"
              value="check"
              className="form-radio bg-gray-300"
              onChange={handleChange}
              checked={formData.pay === 'check'}
            />
            <span className="ml-2 text-gray-300">Check</span>
          </label>
          <label className="inline-flex rounded-[4px] items-center ml-6">
            <input
              type="radio"
              name="pay"
              value="other"
              className="form-radio bg-gray-300"
              onChange={handleChange}
              checked={formData.pay === 'other'}
            />
            <span className="ml-2 text-gray-300">Other</span>
          </label>
    </div>


    <div className="mt-4">

          <textarea
            id="details"
            onChange={handleChange}
            name="details"
            value={formData.details}
            placeholder="Details of Other"
            className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

        </div>
        
      </div>

      
          <div className="mb-4">
        <div className="flex items-center justify-between">
         
          <label className="inline-flex items-center">
            <input
              type="number"
              name="price_total"
              id="price_total"
              value={formData.price_total}
              onChange={handleChange}
              placeholder="Price Total"
              className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="inline-flex items-center">
            <input
              type="number"
              name="price_ticket"
              id="price_ticket"
              value={formData.price_ticket}
              onChange={handleChange}
              placeholder='Price Ticket'
              className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          </div>
        
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between">
         
          <label className="inline-flex items-center">
            <input
              type="number"
              name="ticket_number"
              id="ticket_number"
             //value={formData.ticketNumber}
              onChange={handleChange}
              placeholder={`Ticket Number: ${ticketNumber ? ticketNumber : '0'}`}
              className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 placeholder:text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="inline-flex items-center">
            <input
              type="number"
              name="prof_percentage"
              id="prof_percentage"
              value={formData.prof_percentage}
              onChange={handleChange}
              placeholder='Professor Percentage'
              className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          </div>
        
      </div>
      <div className="mb-4">
         
          <label className=" items-center">
            <input
              type="number"
              name="prof_price"
              id="prof_price"
             //value={formData.profPercentage}
              onChange={handleChange}
              placeholder={`Professor Price : ${profPercentage ? profPercentage: '0'}`}
              className="shadow rounded-[4px] placeholder:text-gray-600 font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
         
         
        
      </div>
    
    


     

    

        <div className="mb-4">

          <textarea
            id="motivation"
            onChange={handleChange}
            name="motivation"
            value={form.motivation}
            placeholder="Votre motivation"
            className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

        </div>
  


                 

      <div className="mb-4">
        {form.isConfirmed === true ? (
          <button
            type="submit"
            className="bg-blue-500  text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
             Confirmed
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500  text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
             Confirm
          </button>
        )}
  

 


      </div>
    </form>
  );
};

export default AdmissionFormCofirm;