import passport from 'passport';
import { Strategy } from 'passport-local';
import axios from 'axios';
import { AuthenticateDto } from '../../dto/authenticate.dto';

passport.use(new Strategy({
    usernameField: 'token',
    passwordField: 'token',
    passReqToCallback: true
}, async (req, name, password, done) => {
    const body: AuthenticateDto = req.body;
    const token = body.token;

    const response = await axios.post('http://wallet:5000/verify-token', {}, {
        headers: {
            'Authorization': token
        }
    });

    const user = response.data.user;

    user ? done(null, user) : done(null, false);
}));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user);
});