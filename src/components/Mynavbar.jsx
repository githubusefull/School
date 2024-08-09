'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Mynavbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
};
  //const token = localStorage.getItem('token'); // Retrieve the token

  const [isDropdownOpenClient, setIsDropdownOpenClient] = useState(false);
  const [isDropdownOpenPro, setIsDropdownOpenPro] = useState(false);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);

  const dropdownRef = useRef(null);


  const toggleDropdownPro = () => {
    setIsDropdownOpenPro(!isDropdownOpenPro);

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
      setIsDropdownOpenClient(false)
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
    <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 z-40">
      <div className="container mx-auto flex justify-between items-center">
      <Link href="/">
        <div className="text-white font-bold ml-[43px] mt-3">MySchool</div>
        </Link>
        <div className="space-x-4 flex mr-8 gap-3">
        
                <Link href="/home">
                  <p className="text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Affectation</p>
                </Link>
                <Link href="/payement">
                  <p className="text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Payement</p>
                </Link>
          <div className="relative">
                  <button
                    onClick={toggleDropdownClient}
                    className="text-gray-300  font-[500] mt-1 text-[15px] "
                  >
                    Admission Client
                  </button>
                  {isDropdownOpenClient && (
                    <div 
                    ref={dropdownRef}
                    className="absolute right-0 bg-black mt-5 w-38 px-8 rounded-[5px] outline  outline-1  shadow-lg py-1 z-50">
                      <Link href="/clientadmissionform">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px] ">Apply</p>
                      </Link>
                      <Link href="/clientadmissions">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px] ">Afficher</p>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleDropdownPro}
                    className="text-gray-300 font-[500] mt-1 text-[15px]"
                  >
                    Admission Professeur
                  </button>
                  {isDropdownOpenPro && (
                    <div ref={dropdownRef} className="absolute right-0 mt-5 w-38 px-8 rounded-[5px] outline  outline-1 bg-black shadow-lg py-1 z-50">
                      <Link href="/profadmissionform">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px]">Apply</p>
                      </Link>
                      <Link href="/professeuradmissions">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px]">Afficher</p>
                      </Link>
                    </div>
                  )}

                
                </div>
                <div className="relative">
                  <button
                    onClick={toggleDropdownUser}
                    className="text-gray-300 font-[500] mt-1 text-[15px]"
                  >
                    Admission User
                  </button>
                  {isDropdownOpenUser && (
                    <div ref={dropdownRef} className="absolute right-0 mt-5 w-38 px-8 rounded-[5px] outline  outline-1 bg-black shadow-lg py-1 z-50">
                      <Link href="/useradmissionform">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px]">Apply</p>
                      </Link>
                      <Link href="/useradmissions">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px]">Afficher</p>
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
