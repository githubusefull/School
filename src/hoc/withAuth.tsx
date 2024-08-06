'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
//import axios, { AxiosError } from 'axios';
import React from 'react';
import {  useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
      const router = useRouter()



    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login')
      } else {
        setLoading(false)
        setAuthenticated(true)
        router.push('/clientadmissions')
{/*               
        axios.post('/api/loginForm', { token })
          .then(() => {
            setAuthenticated(true);
            setLoading(false);
            router.push('/admissions');
          })
          .catch((error: AxiosError) => {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            router.push('/ss');
          }); */}
      }
    }, []);

    if (loading) {
      return <div className='flex justify-center'>Loading...</div>;
    }

    if (!authenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
