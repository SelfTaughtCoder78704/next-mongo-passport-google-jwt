import connect from "../../../lib/database";
import passport from "passport";
import { setCookies } from "cookies-next";
import '../../../lib/passport';

export default async function (req, res, next) {
  await connect();
  await passport.authenticate('google', (err, user, info) => {
    if (err || !user) res.redirect('http://localhost:3000/?a=auth_fail');

    setCookies('token', info.token, { req, res });
    res.redirect('http://localhost:3000/dashboard');
  })(req, res, next);
}