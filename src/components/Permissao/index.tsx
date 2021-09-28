import Head from 'next/head';
export default function Permissao() {
  return (
    <Head>
      <script dangerouslySetInnerHTML={{
        __html: `
            if(!document.cookie || !document.cookie.includes('batistaaraujo-auth')) {
              window.location.href ="/admin"
            }
          `,
      }}
      />
    </Head>
  )

}
