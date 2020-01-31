import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import sequelize from '../../models';
import config from '../../../config';

const User = sequelize.models.User;

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    let user = await User.findOne({
        where: {
            id: payload.sub
        }
    });

    user ? done(null, user) : done(null, false);
}));