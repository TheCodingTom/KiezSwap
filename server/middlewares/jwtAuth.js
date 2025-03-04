import passport from "passport";

// middleware used in all operations where the users should be authorized (like user profile)

const jwtAuth = passport.authenticate('jwt', { session: false });

export default jwtAuth;