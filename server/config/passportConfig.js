import {Strategy as JwtStrategy} from "passport-jwt"
import UserModel from "../models/usersModel.js";

const jwtOptions = {
   // whenever we send a req we put the token in the header of req and this method will extract the token from the header
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
   secretOrPrivateKey: process.env.JWT_SECRET
}


// we pass options - function accesses payload - run usermodel - find user with that ID
const passportStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
   UserModel.findOne({id: jwt_payload.sub}, function(err, user) {
      // done is a callback: if there's an error we stop process, otherwise we continue and attach user to request
       if (err) {
           return done(err, false);
       }
       if (user) {
           return done(null, user);
       } else {
           return done(null, false);
           // or you could create a new account - do we need it?
       }
   });
});

export default passportStrategy