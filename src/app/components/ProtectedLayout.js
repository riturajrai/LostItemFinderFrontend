'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import logo from './WhatsApp Image 2025-09-02 at 07.23.36_c0a1b5be.jpg'

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const response = await fetch('http://localhost:4000/api/users/verify-token', {
          method: 'GET',
          credentials: 'include', // Send cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Verify token response:', response.status, response.statusText);
        if (!response.ok) {
          const errorData = await response.json();
          console.log('Verify token error:', errorData);
          throw new Error(errorData.message || 'Authentication failed');
        }
        const data = await response.json();
        console.log('Verify token success:', data);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Token verification failed:', error.message);
        toast.error('Session expired. Please log in again.');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering until redirect
  }

  return <>{children}</>;
};

export default ProtectedLayout;