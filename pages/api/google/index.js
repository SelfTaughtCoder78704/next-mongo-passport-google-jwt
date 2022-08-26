import passport from "passport";
import connect from "../../../lib/database";
import '../../../lib/passport';

export default async function handler(req, res, next) {
  await connect();
  await passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })(req, res, next);
}