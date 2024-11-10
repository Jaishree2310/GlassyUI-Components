import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface AuthContextProps {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  currentUser: FirebaseUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isEmailUser, setIsEmailUser] = useState<boolean>(false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: FirebaseUser | null) {
    if (user) {
      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        provider => provider.providerId === 'password',
      );
      setIsEmailUser(isEmail);

      // Set additional provider states as needed

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
