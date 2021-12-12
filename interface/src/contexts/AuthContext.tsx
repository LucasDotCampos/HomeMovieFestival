import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext<any>(AuthContext);
}

export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
  //* usar o criar usuário do back
};

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
  //* usar o logar usuário do back
};

const logout = () => {
  return signOut(auth);
  //* deslogar o logar usuário do back
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
