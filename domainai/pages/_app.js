import Head from 'next/head'
export default function App({ Component, pageProps }) {
  return <>     <Head>
  <link rel="shortcut icon" href="/starb.png" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

</Head> <Component {...pageProps}/>
 </>
}
