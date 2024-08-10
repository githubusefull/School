'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const withAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const storedFormData = localStorage.getItem('formData');
      if (!storedFormData) {
        router.push('/login');
        return;
      }

      const formData = JSON.parse(storedFormData);

      // Handle redirection based on isAdmin property
      if (formData.isAdmin === false) {
        // Redirect non-admin users away from restricted URLs
        if (pathname && ['/useradmissionform', '/useradmissions', '/payement', 'affectation'].includes(pathname)) {
          router.push('/'); // Redirect to a safe page
          return;
        }
      }

      // If authenticated, proceed to the wrapped component
      setLoading(false);
      setAuthenticated(true);
    }, [router, pathname]);

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

