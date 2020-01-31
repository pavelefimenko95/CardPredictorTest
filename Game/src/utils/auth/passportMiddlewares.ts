import passport from 'passport';

export const passportLocal = passport.authenticate('local', { session: true });