import { getCookie, removeCookies } from 'cookies-next';
import JWT from 'jsonwebtoken';
import connect from "../lib/database";
import User from '../models/User';
import { useRouter } from 'next/router';
import Component from '../models/Component';
import { Link } from 'next/link'


export default function Dashboard({ email, name, components }) {
  console.log(email, name, components);
  const router = useRouter();
  const logout = () => {
    removeCookies('token');
    router.replace('/');
  }
  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <p>Welcome {name}</p>
      <p>{email}</p>
      <button className='btn' onClick={logout}>Logout</button>
      <div className="component-info">
        <h2>Your Components</h2>
        <Link href="/new-component">
          <a className='btn'>Create a new component</a>
        </Link>
        {components && components.map(component => (
          <div className="component" key={component._id}>
            <h3>{component.title}</h3>
          </div>
        ))}
        {components.length <= 0 ? (
          <div className="no-component">
            <h3>No components found</h3>

          </div>
        ) : null}

      </div>
    </div>
  )
}


export async function getServerSideProps({ req, res }) {
  try {
    await connect();
    const token = await getCookie('token', { req, res });
    if (!token) return { redirect: { destination: '/' } };

    const verified = await JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: verified.id })
    const components = await Component.find({ creator: verified.id })
    console.log(components)
    if (!user) return { redirect: { destination: '/' } };
    return {
      props: {
        email: user.email,
        name: user.name,
        components: JSON.parse(JSON.stringify(components))
      }
    };

  } catch (e) {
    removeCookies('token', { req, res });

    return { redirect: { destination: '/' } };
  }
}


