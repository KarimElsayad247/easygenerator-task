import * as React from 'react';
import { useCallback, useState } from 'react';
import * as jose from 'jose';
import { signIn as signInApi } from '@/apis/auth.api.ts';
import { AuthContext } from '@/contexts/auth/AuthContext.ts';
import { ACCESS_TOKEN_KEY } from '@/constants/AuthConstants.ts';
import { getUser } from '@/apis/users.api.ts';
import type { SignInParams, User, UserJwt } from '@/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<
    number | undefined | null
  >();

  const tokenHasExpired = (): boolean => {
    if (!tokenExpiration) return false;
    return tokenExpiration * 1000 < Date.now();
  };

  const accessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  };

  const setAccessToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  };

  const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const isLoggedIn = useCallback(async (): Promise<boolean> => {
    if (!accessToken()) return false;

    return !tokenHasExpired();
  }, []);

  const signIn = useCallback(
    async (signInParams: SignInParams): Promise<boolean> => {
      const newAccessToken = await signInApi(signInParams);
      console.log(newAccessToken);
      const decodedToken: UserJwt = jose.decodeJwt(newAccessToken.access_token);
      setAccessToken(newAccessToken.access_token);
      setTokenExpiration(decodedToken.exp);

      const user = await getUser(decodedToken.id);
      setUser(user);
      return true;
    },
    [],
  );

  const signOut = useCallback(async (): Promise<void> => {
    setUser(null);
    removeAccessToken()
    setTokenExpiration(null);
  }, []);

  const value: AuthContext = {
    user,
    setUser,
    isLoggedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
