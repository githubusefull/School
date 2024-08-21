import ChekoutSteps from '@/components/ChekoutSteps';
import AdmissionClient from '@/components/forms/AdmissionClient'
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title:'Admission Client',
}
  
const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <ChekoutSteps currentStep={1} />
      <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">
        <AdmissionClient />
      </div>
    </div>
  )
}

export default page
