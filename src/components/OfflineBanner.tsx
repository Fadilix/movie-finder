import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  const checkOnlineStatus = async () => {
    try {
      await axios.get(`${API_URL}`, {
        params: {
          apikey: API_KEY,
          s: 'test'
        }
      });
      setIsOnline(true);
    //  console.log('User is online');
    } catch (error) {
      setIsOnline(false);
    //   console.log('User is offline');
    }
  };

  useEffect(() => {
    const handleOnline = () => checkOnlineStatus();
    const handleOffline = () => {
      setIsOnline(false);
      console.log('Browser reports offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    checkOnlineStatus();

    const interval = setInterval(checkOnlineStatus, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-red-500 text-white px-4 py-3 text-center fixed bottom-0 left-0 right-0 z-[9999] w-full
      text-sm sm:text-base md:px-6 md:py-4 safe-area-bottom">
      <p className="max-w-3xl mx-auto">
        You are currently offline. Please check your internet connection.
      </p>
    </div>
  );
}; 