import { getCookie, removeCookies } from 'cookies-next';
import JWT from 'jsonwebtoken';
import connect from "../lib/database";
import User from '../models/User';
// import Component from '../../../models/Component';


export default function NewComponent({ email, name, components }) {
  console.log(email, name);

  return (
    <div className='component'>
      <h2>Create a new component</h2>
      <form action="/api/create" method="POST">
        <input type="text" name="title" placeholder="Component title" />
        <input type="text" name="description" placeholder="Component description" />
        <input type="text" name="files" placeholder="Component files" />
        <input type="submit" value="Create component" />
      </form>
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
    if (!user) return { redirect: { destination: '/' } };
    return {
      props: {
        email: user.email,
        name: user.name,
      }
    };

  } catch (e) {
    removeCookies('token', { req, res });

    return { redirect: { destination: '/' } };
  }
}


