import User from '../../models/User';
import Component from "../../models/Component";
import JWT from "jsonwebtoken";
import { getCookie, removeCookies } from 'cookies-next';
import connect from "../../lib/database";


export default async function createNewComponent(req, res) {

  const { title, description, files } = req.body;
  await connect();
  const token = await getCookie('token', { req, res });
  if (!token) return res.redirect('/')


  const verified = await JWT.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: verified.id });

  const component = new Component({
    title,
    description,
    files,
    creator: user
  })



  await component.save()
  await user.components.push(component)
  await user.save()
  res.redirect('/dashboard')
}

