import React, { createContext, useContext } from 'react';
import { useFriends } from '../hooks/useFriends';

const FriendsContext = createContext(null);

export const FriendsProvider = ({ children }) => {
  const friendsData = useFriends();
  return (
    <FriendsContext.Provider value={friendsData}>
      {children}
    </FriendsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFriendsContext = () => {
  const ctx = useContext(FriendsContext);
  if (!ctx) {
    throw new Error('useFriendsContext must be used within FriendsProvider');
  }
  return ctx;
};
