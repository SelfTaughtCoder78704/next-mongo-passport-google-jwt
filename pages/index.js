import Head from 'next/head'
import Image from 'next/image'
import { getCookie, removeCookies } from 'cookies-next';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="home">
      <Head>
        <title>Component Tracker</title>
        <meta name="description" content="create components and share with friends/coworkers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <h1 >Welcome to the Component Tracker</h1>
        <p>Create components and share with friends/coworkers</p>


        {/* <a href="/api/google" className='btn' >Login with Google</a> */}
        <Link href="/api/google">
          <a className='btn'>Login with Google</a>
        </Link>
      </div>
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