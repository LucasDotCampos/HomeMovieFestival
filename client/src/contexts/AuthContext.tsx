import React, { useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext<any>(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (localStorage.getItem('user')) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
    }
    if (localStorage.getItem('auth') == 'false') {
      setIsLogged(false);
    } else {
      setIsLogged(false);
    }
  }, []);

  const signUp = (username: string, email: string, password: string) => {
    return api.post('users', {
      name: username,
      email: email,
      password: password,
    });
  };

  const login = (email: string, password: string) => {
    return (
      api
        .post('/sessions', {
          email: email,
          password: password,
        })
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          setToken(token);
          setCurrentUser(user);
          localStorage.setItem('token', token);
          localStorage.setItem('auth', 'true');
          localStorage.setItem('user', JSON.stringify(user));
        }),
      setIsLogged(true)
    );
  };

  const logout = () => {
    return (
      localStorage.removeItem('token'),
      localStorage.removeItem('user'),
      localStorage.setItem('auth', 'false'),
      setIsLogged(false)
    );
  };

  const value = {
    isLogged,
    signUp,
    login,
    logout,
    token,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
