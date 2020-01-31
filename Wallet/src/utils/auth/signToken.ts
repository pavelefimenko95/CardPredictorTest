import JWT from 'jsonwebtoken';
import config from '../../../config/index';

export default user => JWT.sign({
    iss: 'CardPredictorTest',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
}, config.JWT_SECRET);