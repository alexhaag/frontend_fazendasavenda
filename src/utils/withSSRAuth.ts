import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from "next";

import {
  destroyCookie,
  parseCookies
} from 'nookies';

// import decode from 'jwt-decode';

import { AuthTokenError } from "../services/errors/AuthTokenError";
// import { validateUserPermissions } from "./validateUserPermissions";

//type WithSSRAuthOptions = {
// permissions?: string[];
// roles?: string[];
//}

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>
  //, options?: WithSSRAuthOptions
) {

  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['fazendas.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        }
      }
    }
    /*
    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token);
      const { permissions, roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      });

      if (!userHasValidPermissions) {
        return {
          //notFound: true, // recebe uma página 404 
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }
    */
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'fazendas.token')
        destroyCookie(ctx, 'fazendas.refreshToken')
      }

      console.log('e no whtiSSRAUTH');
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        }
      }
    }
  }
}
