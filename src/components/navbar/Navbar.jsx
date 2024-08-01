'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
};
  //const token = localStorage.getItem('token'); // Retrieve the token

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isDropdownOpenPro, setIsDropdownOpenPro] = useState(false);
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenPro(false)

  };

  const toggleDropdownPro = () => {
    setIsDropdownOpenPro(!isDropdownOpenPro);
    setIsDropdownOpen(false)
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpenPro(false);
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
    <nav className="bg-black text-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16  mt-4">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-6 rounded-md text-gray-400 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>



            <div className="flex-shrink-0  mt-5 ml-4">
              <Link href="/">
                <p className="text-2xl font-bold">MySchool</p>
              </Link>
            </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end  mt-8">
          
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-3   gap-4">
                <Link href="/">
                  <p className="text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Home</p>
                </Link>
              
              
                
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-gray-300  font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100"
                  >
                    Admission Client
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 bg-black mt-5 w-38 px-8 rounded-[5px] outline  outline-1  shadow-lg py-1">
                      <Link href="/clientadmissionform">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Apply</p>
                      </Link>
                      <Link href="/clientadmissions">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Afficher</p>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleDropdownPro}
                    className="text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100"
                  >
                    Admission Professeur
                  </button>
                  {isDropdownOpenPro && (
                    <div ref={dropdownRef} className="absolute right-0 mt-5 w-38 px-8 rounded-[5px] outline  outline-1 bg-black shadow-lg py-1">
                      <Link href="/profadmissionform">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Apply</p>
                      </Link>
                      <Link href="/professeuradmissions">
                        <p className="block  py-2  text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Afficher</p>
                      </Link>
                    </div>
                  )}

                
                </div>
                <Link href="/affectation">
                  <p className="text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Affectation</p>
                </Link>
                <Link href="/payement">
                  <p className="text-gray-300 font-[500] mt-1 text-[15px] scale-110 transition-all duration-300 hover:scale-100">Payement</p>
                </Link>
                
                  {/*  
               {token ? (

                  <button
                     onClick={handleLogout}
                    type="button"
                    className="bg-gray-300 text-[13px] scale-110 transition-all  duration-300 hover:scale-100 text-black font-bold py-[7px]  px-3 rounded focus:outline-none focus:shadow-outline"
                >

                    Logout
                </button> 
               ):(

                <Link href="/login">
                
                 <button
                    type="button"
                    className="bg-gray-300 text-[13px] scale-110 transition-all  duration-300 hover:scale-100 text-black font-bold py-[7px]  px-3 rounded focus:outline-none focus:shadow-outline"
                >

                    Login
                </button> 
                </Link>
                 
               )}
                   
               */}
              
               

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden p-4 justify-center flex`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 w-full">
          <Link href="/">
            <p className="block px-3 py-2  text-base text-gray-300 font-[500] text-[15px] hover:text-black rounded-[4px] hover:bg-gray-300">Home</p>
          </Link>
          <Link href="/about">
            <p className="block px-3 py-2  text-base text-gray-300 font-[500] text-[15px] hover:text-black rounded-[4px] hover:bg-gray-300">About Us</p>
          </Link>
          <Link href="/admissions">
            <p className="block px-3 py-2  text-base text-gray-300 font-[500] text-[15px] hover:text-black rounded-[4px] hover:bg-gray-300">Admissions</p>
          </Link>
          <Link href="/apply">
            <p className="block px-3 py-2  text-base text-gray-300 font-[500] text-[15px] hover:text-black rounded-[4px] hover:bg-gray-300">Apply</p>
          </Link>
          <Link href="/contact">
            <p className="block px-3 py-2  text-base text-gray-300 font-[500] text-[15px] hover:text-black rounded-[4px] hover:bg-gray-300">Contact Us</p>
          </Link>
              {/*   
          {token ? (

<button
   onClick={handleLogout}
  type="button"
  className="bg-gray-300 ml-[15px] mt-4 px-5 text-[13px] scale-110 transition-all  duration-300 hover:scale-100 text-black font-bold py-[7px]  rounded focus:outline-none focus:shadow-outline"
>

  Logout
</button> 
):(

<Link href="/login">

<button
  type="button"
  className="bg-gray-300 ml-[15px] mt-[13px] px-5 text-[13px] scale-110 transition-all  duration-300 hover:scale-100 text-black font-bold py-[7px]  rounded focus:outline-none focus:shadow-outline"
>

  Login
</button> 
</Link>

)}
*/}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

