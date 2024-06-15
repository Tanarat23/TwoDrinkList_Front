import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../utils/local-storage';
import authApi from '../apis/auth';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data.user);
          // console.log(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAuthUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    // console.log(credentials);
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ login, logout, authUser, isAuthUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
