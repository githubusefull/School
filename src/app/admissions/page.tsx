import AdmissionsList from '@/components/AdmissionsList/AdmissionsList'
import AdmissionsListAccepted from '@/components/AdmissionsList/AdmissionsListAccepted'
import AdmissionsListRefused from '@/components/AdmissionsList/AdmissionsListRefused'
import React from 'react'

const page = () => {
  return (
    <div className="justify-center">
    <div className='text-gray-300 mt-9 text-2xl font-700 justify-center flex'>
      <p className='mt-7'>Admissions</p>
    </div>
     <AdmissionsList/>

     <div className='text-gray-300 text-2xl font-700 justify-center flex'>
      <p className='mt-3'>Accepted Admissions</p>
    </div>
     <AdmissionsListAccepted />
     <div className='text-gray-300 text-2xl font-700 justify-center flex'>
      <p className='mt-3'>Refused Admissions</p>
    </div>
     <AdmissionsListRefused />
  </div>

  )
}

export default page
