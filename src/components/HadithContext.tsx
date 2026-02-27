import React, { createContext, useContext, useEffect, useState } from 'react';
import { Hadith, UserData } from '../types';
import { storage } from '../lib/storage';

interface HadithContextType {
  hadiths: Hadith[];
  userData: UserData;
  loading: boolean;
  toggleBookmark: (id: string) => void;
  markAsRead: (id: string) => void;
  clearReadHistory: () => void;
  setLastRead: (id: string) => void;
}

const HadithContext = createContext<HadithContextType | undefined>(undefined);

export const HadithProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [userData, setUserData] = useState<UserData>(storage.getUserData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch('/hadith.json');
        const data = await response.json();
        setHadiths(data);
      } catch (error) {
        console.error('Failed to load hadiths:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHadiths();
  }, []);

  useEffect(() => {
    storage.saveUserData(userData);
  }, [userData]);

  const toggleBookmark = (id: string) => {
    setUserData(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id)
        ? prev.bookmarks.filter(bid => bid !== id)
        : [...prev.bookmarks, id]
    }));
  };

  const markAsRead = (id: string) => {
    if (!userData.readHadiths.includes(id)) {
      setUserData(prev => ({
        ...prev,
        readHadiths: [...prev.readHadiths, id]
      }));
    }
  };

  const clearReadHistory = () => {
    setUserData(prev => ({ ...prev, readHadiths: [] }));
  };

  const setLastRead = (id: string) => {
    setUserData(prev => ({ ...prev, lastReadId: id }));
  };

  return (
    <HadithContext.Provider value={{
      hadiths,
      userData,
      loading,
      toggleBookmark,
      markAsRead,
      clearReadHistory,
      setLastRead
    }}>
      {children}
    </HadithContext.Provider>
  );
};

export const useHadiths = () => {
  const context = useContext(HadithContext);
  if (!context) throw new Error('useHadiths must be used within HadithProvider');
  return context;
};
