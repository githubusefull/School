import AdmissionEdite from '@/components/forms/AdmissionEdite'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 w-full max-w-2xl items-center justify-center text-[14px] lg:flex">
     <AdmissionEdite />
    </div>
  </div>
  )
}

export default page
