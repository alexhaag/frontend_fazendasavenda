import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout'

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </AuthProvider>
  )

}

export default MyApp
