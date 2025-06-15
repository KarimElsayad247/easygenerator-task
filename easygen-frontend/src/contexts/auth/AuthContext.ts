import { createContext } from 'react';
import type { SignInParams, User } from '@/types';

export interface AuthContext {
  user: User | null;
  setUser: (User: User | null) => void;
  signIn: (signInParams: SignInParams) => Promise<boolean>;
  signOut: () => Promise<void>;
  isLoggedIn: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  signIn: () => Promise.reject(),
  signOut: () => Promise.reject(),
  isLoggedIn: () => Promise.reject(),
});
