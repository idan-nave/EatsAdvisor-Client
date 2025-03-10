import { RouterProvider } from 'react-router';
import { Router } from '@router';
import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const pingBackend = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/keep-alive`)
        .then(response => {
          if (response.ok) {
            console.log('Backend pinged successfully');
          } else {
            console.error('Failed to ping backend');
          }
        })
        .catch(error => {
          console.error('Error pinging backend:', error);
        });
    };

    // Ping the backend every 10 minutes
    const intervalId = setInterval(pingBackend, 10 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return <RouterProvider router={Router} />;
}
