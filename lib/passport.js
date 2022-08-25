import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import User from "../models/User";
import JWT from "jsonwebtoken";

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:3000/api/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {

    const user = await User.findOne({ 'email': profile.email });
    if (!user) {
      const newUser = new User({
        name: profile.displayName,
        email: profile.email,
        accessToken: accessToken
      });
      await newUser.save();
      const token = await JWT.sign({
        id: newUser._id,
        created: Date.now().toString()
      }, process.env.JWT_SECRET);
      newUser.tokens.push(token);
      await newUser.save();
      done(null, newUser, { message: 'New user created', token: token });

    } else {
      const token = await JWT.sign({
        id: user._id,
        created: Date.now().toString()
      }, process.env.JWT_SECRET);
      user.tokens.push(token);
      await user.save();
      done(null, user, { message: 'User found', token: token });
    }
  } catch (err) {
    console.log(err);
    return done(err, false, { message: 'Something went wrong' });
  }
}));




