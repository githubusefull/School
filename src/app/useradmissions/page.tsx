import AdmissionsListUser from '@/components/AdmissionsList/AdmissionsListUser';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title:'Admission User List',
}
const page = () => {
  return (
    <div className="justify-center mt-4 w-[170vh]">
    <div className='text-gray-300  text-2xl font-700 justify-center flex'>
    </div>
     <AdmissionsListUser/>

    
    
  </div>

  )
}

export default page