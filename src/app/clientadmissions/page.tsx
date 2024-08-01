import AdmissionsListClient from '@/components/AdmissionsList/AdmissionsListClient'
import React from 'react'

const page = () => {
  return (
    <div className="justify-center">
    <div className='text-gray-300 mt-9 text-2xl font-700 justify-center flex'>
      <p className='mt-7'>Client Admissions</p>
    </div>
     <AdmissionsListClient/>

    
    
  </div>

  )
}

export default page
