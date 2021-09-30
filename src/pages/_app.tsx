import { AppProps } from 'next/app';
import Script from 'next/script';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?//id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      <Script strategy='lazyOnload' >
        {`
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
      `}
      </Script>

      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </AuthProvider>
    </>
  )

}

export default MyApp
