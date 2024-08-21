import AdmissionUser from '@/components/forms/AdmissionUser';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title:'Admission User',
}
const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">

      <AdmissionUser/>
    </div>
    </div>
  )
}

export default page