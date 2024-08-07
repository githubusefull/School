/* eslint-disable react/no-unescaped-entities */
'use client';
import './inputDate.css';
import Link from 'next/link';


  
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
    finalTotal: number;
  }
  
  interface AdmissionFormNoteProps {
    form: FormData;
  }

 

   
const AdmissionFormDetail: React.FC<AdmissionFormNoteProps> = ({form}) => {

    
    
   
  

    let Total = 10;

    return (
        <form className="max-w-lg mx-auto p-8 rounded-[5px] outline  outline-1">
            <p className='text-2xl font-[500] mb-4 text-gray-300'>MYSCHOOL: ESPACE PROFESSEUR</p>
           

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
                            value="Mr"
                            className="form-radio  bg-gray-300"
                            //onChange={handleChange}
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
                            //onChange={handleChange}
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
                />
            </div>



            <div className="mb-4">

                <select
                    id="ville"
                    name="ville"
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.ville}
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
                />
            </div>
          
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
   
            <div className="mb-4">
                <input
                    type="date"
                    id="Date_de_naissance"
                    name="date_de_naissance"
                    placeholder="Date de naissance"
                    className="shadow appearance-none font-[600] border rounded-[4px] bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.date_de_naissance}
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
                />
            </div>

            <div className="mb-4">

                <select
                    id="Situation_professionelle"
                    name="situation_professionelle"
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.situation_professionelle}
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
                            value="Oui"
                            className="form-radio  bg-gray-300"
                            checked={form.motorise === 'Oui'}
                        />
                        <span className="ml-2 text-gray-300">Oui</span>
                    </label>
                    <label className="inline-flex rounded-[4px] items-center ml-6">
                        <input
                            type="radio"
                            name="motorise"
                            value="Non"
                            className="form-radio bg-gray-300"
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
                    >
                        <option value="" className="">Niveau 1</option>
                        <option value="Primaire">Primaire</option>
                        <option value="Collège">Collège</option>
                        <option value="Lycée">Lycée</option>
                    </select>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            name="niveau_1_note"
                            id="Niveau_1_note"
                            value={form.niveau_1_note}
                            placeholder='1/10'
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>


                </div>
            </div>





            <div className="mb-4">

                <select
                    id="Matiere_2"
                    name="matiere_2"
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.matiere_2}
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
                        value={form.niveau_2}

                    >
                        <option value="" className="">Niveau 2</option>
                        <option value="physique">Physique</option>
                        <option value="maths">Maths</option>
                    </select>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            name="niveau_2_note"
                            id='Niveau_2_note'
                            value={form.niveau_2_note}
                            placeholder='1/10'
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>


                </div>
            </div>







            <div className="mb-4">

                <select
                    id="Matiere_3"
                    name="matiere_3"
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.matiere_3}

                >
                    <option value="physique">Physique</option>
                    <option value="maths">Maths</option>

                </select>
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <select
                        id="Niveau_3"
                        name="niveau_3"
                        className="shadow rounded-[4px] font-[600]   w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={form.niveau_3}          >
                        <option value="" className="">Niveau 3</option>
                        <option value="physique">Physique</option>
                        <option value="maths">Maths</option>
                    </select>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            value={form.niveau_3_note}
                            name="niveau_3_note"
                            id="Niveau_3_note"
                            placeholder='1/10'
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>


                </div>
            </div>

            <div className="mb-4">
                <select
                    id="Matiere_4"
                    name="matiere_4"
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        value={form.niveau_4}
                    >
                        <option value="" className="">Niveau 4</option>
                        <option value="physique">Physique</option>
                        <option value="maths">Maths</option>
                    </select>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            id='Niveau_4_note'
                            name="niveau_4_note"
                            placeholder='1/10'
                            value={form.niveau_4_note}
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>


                </div>
            </div>



            <div className="mb-4">

                <select
                    id="Matiere_5"
                    name="matiere_5"
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.matiere_5}

                >
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
                        value={form.niveau_5}

                    >
                        <option value="" className="">Niveau 5</option>
                        <option value="physique">Physique</option>
                        <option value="maths">Maths</option>
                    </select>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            name="niveau_5_note"
                            id="Niveau_5_note"
                            value={form.niveau_5_note}
                            placeholder='1/10'
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>


                </div>
            </div>
            <div className="mb-4">

                <select
                    id="Matiere_6"
                    name="matiere_6"
                    value={form.matiere_6}
                    className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    >
                        <option value="" className="">Niveau 6</option>
                        <option value="Physique">Physique</option>
                        <option value="Maths">Maths</option>
                    </select>
                    <label className="inline-flex items-center ml-4">
                    

                        <input
                            type="text"
                            name="niveau_6_note"
                            id='Niveau_6_note'
                            value={form.niveau_6_note}
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>


                </div>
            </div>

            <div className="mb-4 flex justify-between">
                <div className="">
                    <label className="inline-flex items-center mr-1">
                        <input
                            type="number"
                            name="note_de_Francaise"
                            value={form.note_de_Francaise}
                            id='Note_de_Francaise'
                            placeholder='Note de Française'
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>
                </div>

                <div className="">
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            value={form.note_de_CV}
                            name="note_de_CV"
                            id="Note_de_CV"
                            placeholder='Note de CV'
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>
                </div>
                <div className="">
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="number"
                            value={form.finalTotal}
                            name="finalTotal"
                            id="finalTotal"
                            //placeholder={`${form.finalTotal}`}
                            className="shadow rounded-[4px] font-[600] w-full bg-gray-300 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </label>
                </div>
            </div>
            <div className="mb-4">

                <div className="mb-4">

                    <textarea
                        id="motivation"
                        name="motivation"
                        value={form.motivation}
                        placeholder="Votre motivation"
                        className="shadow rounded-[4px] font-[600] bg-gray-300 appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                </div>
            </div>
            <div className="mb-4 p-2">

                {form.finalTotal < Total ? (

                    <Link href={`/admissionformnote/${form._id}`}>

<button
                        type="submit"
                        className="bg-green-500 px-7  hover:bg-blue-700  text-gray-300 font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edite
                    </button>
                    </Link>
                ) : (



                    <button
                        type="submit"
                        className="bg-blue-500  hover:bg-blue-700  text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Accepted
                    </button>

                )}
                    
                    
                  
                   
                     
                      
            </div>
        </form>
  );
};

export default AdmissionFormDetail;