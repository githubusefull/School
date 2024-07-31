import AdmissionsListProfe from '@/components/AdmissionsList/AdmissionsListProfe'
import React from 'react'

const page = () => {
  return (
    <div className="justify-center">
    <div className='text-gray-300 mt-9 text-2xl font-700 justify-center flex'>
      <p className='mt-7'>Professeur Admissions</p>
    </div>
     <AdmissionsListProfe/>

    
    
  </div>

  )
}

export default page