import AccepForm from '@/components/forms/AccepForm'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
    <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
    <AccepForm />

    </div>
  </div>
  )
}

export default page