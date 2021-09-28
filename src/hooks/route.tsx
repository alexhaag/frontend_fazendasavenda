import { useRouter } from 'next/router';
import React from 'react';
import useAuth from './useAuth';

export const withPublic = (Component: any) => {
  return function WithPublic(props: any) {
    const auth = useAuth();
    const router = useRouter();
    if (auth.user) {
      () => router.replace("/");
      return <h1>Loading...</h1>;
    }
    return <Component auth={auth} {...props} />
  }
}

export const withProtected = (Component) => {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      return () => router.replace("/login");
    }
    return <Component auth={auth} {...props} />
  }
}