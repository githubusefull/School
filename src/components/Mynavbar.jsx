
'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import img from '../components/logo.webp'
import Image from 'next/image';
const Mynavbar = () => {

  //const [isOpen, setIsOpen] = useState(false);

  {/*  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };*/}


 

  const [isDropdownOpenClient, setIsDropdownOpenClient] = useState(false);
  const [isDropdownOpenPro, setIsDropdownOpenPro] = useState(false);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);
  const [isDropdownOpenReglement, setIsDropdownOpenReglement] = useState(false);
  const [isDropdownOpenAffectation, setIsDropdownOpenAffectation] = useState(false);

  const [userIdlocal, setUserIdlocal] = useState(null);


  const dropdownRef = useRef(null);


  const toggleDropdownPro = () => {
    setIsDropdownOpenPro(!isDropdownOpenPro);

  };

  const toggleDropdownReglment = () => {
    setIsDropdownOpenReglement(!isDropdownOpenReglement);

  };


  const toggleDropdownAffectatio = () => {
    setIsDropdownOpenAffectation(!isDropdownOpenAffectation);
  };
  const toggleDropdownClient = () => {
    setIsDropdownOpenClient(!isDropdownOpenClient);
  };
  const toggleDropdownUser = () => {
    setIsDropdownOpenUser(!isDropdownOpenUser)
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpenPro(false);
      setIsDropdownOpenUser(false);
      setIsDropdownOpenClient(false);
      setIsDropdownOpenReglement(false)
      setIsDropdownOpenAffectation(false)

    }
  };

  useEffect(() => {
    // Add event listener for clicks outside of the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



 
  return (
    <nav className="fixed top-0 left-0 w-full bg-white p-4 z-40 text-gray-500 text-[14px] font-[600]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white font-bold ml-[43px] mt-3">
            <Image alt='' src={img} width={120}/>
          </div>
        </Link>
        <div className="space-x-4 flex mr-8 gap-3">
        <Link href="/proposition ">
            <p className="mt-1 scale-110 transition-all duration-300 hover:scale-100">
              Proposition
            </p>
          </Link>
         
          <div className="relative">
            <button
              onClick={toggleDropdownAffectatio}
              className="mt-1 font-[600]"
            >
              Affectation
            </button>
            {isDropdownOpenAffectation && (
              <div
                ref={dropdownRef}
                className="bg-white  text-gray-500 text-[14px] font-[600]  absolute right-0 mt-5 w-38 px-8 rounded-[3px] outline  outline-0  shadow-lg  py-1 z-50"
              >
                <Link href="/affectation">
                  <p className="block  py-2   mt-1 ">
                  Affectation
                  </p>
                </Link>
                <Link href="/affectationedite">
                  <p className="block  py-2 mt-1">
                  <span className='inline mr-1'>All</span>Affectation
                  </p>
                </Link>
              </div>
            )}
          </div>
        

                
          {/*        
          <Link href="/payement">
            <p className="mt-1  scale-110 transition-all duration-300 hover:scale-100">
              Payement
            </p>
          </Link>
          */}
          <div className="relative">
            <button
              onClick={toggleDropdownClient}
              className="mt-1 font-[600]"
            >
              Admission Client
            </button>
            {isDropdownOpenClient && (
              <div
                ref={dropdownRef}
                className="bg-white  text-gray-500 text-[14px] font-[600]    absolute right-0 mt-5 w-38 px-8 rounded-[3px] outline  outline-0  shadow-lg  py-1 z-50"
              >
                <Link href="/clientadmissionform">
                  <p className="block  py-2   mt-1 ">
                    Apply
                  </p>
                </Link>
                <Link href="/clientadmissions">
                  <p className="block  py-2 mt-1">
                    Afficher
                  </p>
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdownPro}
              className=" font-[600] mt-1"
            >
              Admission Professeur
            </button>
            {isDropdownOpenPro && (
              <div
                ref={dropdownRef}
                className="bg-white  text-gray-500 text-[14px] font-[600]    absolute right-0 mt-5 w-38 px-8 rounded-[3px] outline  outline-0  shadow-lg  py-1 z-50"
              >
                <Link href="/profadmissionform">
                  <p className="block  py-2   mt-1 ">
                    Apply
                  </p>
                </Link>
                <Link href="/professeuradmissions">
                  <p className="block  py-2  mt-1">
                    Afficher
                  </p>
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdownUser}
              className="mt-1 font-[600]"
            >
              Admission User
            </button>
            {isDropdownOpenUser && (
              <div
                ref={dropdownRef}
                className="bg-white  text-gray-500 text-[14px] font-[600]    absolute right-0 mt-5 w-38 px-8 rounded-[3px] outline  outline-0  shadow-lg  py-1 z-50"
              >
                <Link href="/useradmissionform">
                  <p className="block  py-2  font-[500] mt-1">
                    Apply
                  </p>
                </Link>
                <Link href="/useradmissions">
                  <p className="block  py-2   font-[500] mt-0 ">
                    Afficher
                  </p>
                </Link>
                <Link href="/useradmissionsoriginal">
                  <p className="block  py-2   font-[500] mt-0 ">
                    All_Users
                  </p>
                </Link>
                
              
              </div>
            )}

           
          </div>



          <div className="relative">
            <button
              onClick={toggleDropdownReglment}
              className="mt-1 font-[600]"
            >
             Règlement

            </button>
            {isDropdownOpenReglement && (
              <div
                ref={dropdownRef}
                className="bg-white  text-gray-500 text-[14px] font-[600]    absolute right-0 mt-5 w-38 px-8 rounded-[3px] outline  outline-0  shadow-lg  py-1 z-50"
              >
                {/*  
                <Link href="/payement">
                  <p className="block  py-2  font-[500] mt-1">
                    Payement
                  </p>
                </Link>*/}
                <Link href="/renouveler">
                  <p className="block  py-2   font-[500] mt-0 ">
                    Reglement
                  </p>
                </Link>
             
                
              
              </div>
            )}

           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Mynavbar;
