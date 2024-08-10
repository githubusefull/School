'use client';
import withAuth from '@/hoc/withAuth';
import React from 'react'
const Payement:React.FC = () => {
  return (
    <div className="justify-center">
    <div className='text-gray-300 mt-9 text-2xl font-700 justify-center flex'>
      <p className='mt-7'>IDs Payement</p>

      
    </div>

    
    
  </div>
  )
}

export default withAuth(Payement);