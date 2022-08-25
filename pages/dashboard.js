import { getCookie, removeCookies } from 'cookies-next';
import JWT from 'jsonwebtoken';
import connect from "../lib/database";
import User from '../models/User';
import { useRouter } from 'next/router';


export default function Dashboard({ email, name, components }) {
  console.log(email, name);
  const router = useRouter();
  const logout = () => {
    removeCookies('token');
    router.replace('/');
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {name}</p>
      <p>{email}</p>
      <button onClick={logout}>Logout</button>
      <div class="component-info">
        <h2>Your Components</h2>
        {components && components.map(component => (
          <div class="component">
            <h3>{component.name}</h3>
          </div>
        ))}
        {components.length <= 0 ? (
          <div class="component">
            <h3>No components found</h3>
            <a className='btn' href="/api/create">Create a component</a>
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
    const user = await User.findOne({ _id: verified.id });
    console.log(user);
    if (!user) return { redirect: { destination: '/' } };
    return {
      props: {
        email: user.email,
        name: user.name,
        components: user.components
      }
    };

  } catch (e) {
    removeCookies('token', { req, res });

    return { redirect: { destination: '/' } };
  }
}


