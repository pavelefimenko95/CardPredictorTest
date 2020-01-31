import passport from 'passport';

export const passportJwt = passport.authenticate('jwt', { session: false });
export const passportLocal = passport.authenticate('local', { session: false });