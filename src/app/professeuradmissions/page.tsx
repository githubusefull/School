import AdmissionsListProfe from '@/components/AdmissionsList/AdmissionsListProfe'
import React from 'react'

const page = () => {
  return (
    <div className="justify-center mt-4 w-[170vh]">
    <div className='text-gray-300  text-2xl font-700 justify-center flex'>
      <p className='mt-3 '>Professeur Admissions</p>
    </div>
     <AdmissionsListProfe/>

    
    
  </div>

  )
}

export default page