import AdmissionListProfAffectation from '@/components/AdmissionsList/AdmissionListProfAffectation'
import React from 'react'

const page = () => {
  return (
    <div className="justify-center mt-4 w-[170vh]">
    <div className='text-gray-300  text-2xl font-700 justify-center flex'>
      <p className='mt-4'>Table Affectation</p>
    </div>
    <AdmissionListProfAffectation />
  </div>

  )
}

export default page