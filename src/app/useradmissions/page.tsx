import AdmissionsListUser from '@/components/AdmissionsList/AdmissionsListUser';
import React from 'react'

const page = () => {
  return (
    <div className="justify-center mt-4 w-[170vh]">
    <div className='text-gray-300  text-2xl font-700 justify-center flex'>
      <p className='mt-7'>Users Admissions</p>
    </div>
     <AdmissionsListUser/>

    
    
  </div>

  )
}

export default page