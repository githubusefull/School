import Formlogin from '@/components/forms/Formlogin';
import React from 'react'
import { Metadata } from 'next'



export const metadata: Metadata = {
    title:'Login',
  }

const page = () => {
    return (
        <div className="flex min-h-screen flex-col items-center p-10">
    <div className="z-10 w-full max-5xl items-center justify-center font-mono text-sm lg:flex">
                <Formlogin />
            </div>
        </div>
    )
}

export default page
