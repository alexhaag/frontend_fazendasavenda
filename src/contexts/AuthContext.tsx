import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import { auth } from '../services/firebase'


type User = {
  uid: string,
  email: string,
  displayName?: string,
  refreshToken: string,
  photoURL: string,
};

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

const formatUser = async (user: User) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  refreshToken: user.refreshToken,
  photoURL: user.photoURL,
})

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (currentUser: User) => {
    if (currentUser) {
      const formatedUser = await formatUser(currentUser);
      setUser(formatedUser.email)
      setSession(true);
      return formatedUser.email;
    }
    setUser(false);
    setSession(false);
    return false;
  }

  const setSession = (session) => {
    if (session) {
      cookie.set('batistaaraujo-auth', session, { expires: 1, });
    } else {
      cookie.remove('batistaaraujo-auth');
    }
  }

  async function signIn({ email, password }: SignInCredentials) {

    try {
      setLoading(true);
      const response = await auth.signInWithEmailAndPassword(email, password);
      console.log('response ----------> ', response)
      handleUser(response.user);
      Router.push('/admin/imoveis');

    } finally {

      setLoading(false);

    }
  }

  async function signOut() {

    try {
      await auth.signOut()
      handleUser(null);
      Router.push('/');
    } finally { setLoading(false) };

  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, [])

  return <AuthContext.Provider value={{
    user,
    loading,
    signIn,
    signOut
  }}>{children}</AuthContext.Provider>

}

// export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;