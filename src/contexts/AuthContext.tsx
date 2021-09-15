import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { auth } from '../services/firebase'

type User = {
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel

export function signOut() {
  auth.signOut()
    .then(() => {
      alert('desconectou');
    }
    )
    .catch((error) => alert(error));
  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {

    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {

    try {

      return auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          setUser({ email });
          Router.push('/admin/imoveis');
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });


    } catch (error) {
      console.log('------> ', error.message)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}