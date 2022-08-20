import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect, useContext } from 'react';
import ICartItem from '../types/cart';

type IUserContext = {
  token: string,
  setToken: (newToken: string) => void,
  removeToken: () => void,
  role: string,
  setRole: (newRole: string) => void
} | null;

export const UserContext = createContext<IUserContext>(null);

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const removeToken = () => {
    setToken("");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    router.reload();
  }

  useEffect(() => {
    if (token) sessionStorage.setItem('token', token);
    if (sessionStorage.getItem('token')) setToken(sessionStorage.getItem('token')!);
  }, [token]);

  useEffect(() => {
    if (role) sessionStorage.setItem('role', role);
    if (sessionStorage.getItem('role')) setRole(sessionStorage.getItem('role')!);
  }, [role]);

  return (
    <UserContext.Provider value={{ token, setToken, removeToken, role, setRole}}>
      {children}
    </UserContext.Provider>
  );
};


export function useUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUserContext must be used whitin a AppContextProvider');
  return context;
}