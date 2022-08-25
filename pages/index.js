import Head from 'next/head'
import Image from 'next/image'
import { getCookie, removeCookies } from 'cookies-next';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Component Tracker</title>
        <meta name="description" content="create components and share with friends/coworkers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a href='/api/google'>Login with Google</a>
    </div>
  )
}


export async function getServerSideProps(req, res) {
  try {
    const cookieExists = getCookie('token', { req, res });
    if (cookieExists) return { redirect: { destination: '/dashboard' } };
    return { props: {} };
  } catch (e) {
    removeCookies('token', { req, res });
    console.log(e);
    return { props: {} }
  }
}