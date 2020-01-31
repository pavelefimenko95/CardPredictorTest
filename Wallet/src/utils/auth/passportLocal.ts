import passport from 'passport';
import bcrypt from 'bcrypt';
import sequelize from '../../models';
import { Strategy } from 'passport-local';

const User = sequelize.models.User;

passport.use(new Strategy({
    usernameField: 'name',
    passReqToCallback: true
}, async (req, name, password, done) => {
    const user: any = await User.findOne({
        where: { name },
        raw: true,
    });

    if(user){
        let isMatch = await bcrypt.compare(password, user.password);
        isMatch ? done(null, user) : done(null, false);
    } else {
        done(null, false);
    }
}));