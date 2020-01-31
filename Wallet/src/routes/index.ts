import express from 'express';
import { register, login, verifyToken, withdraw, deposit } from '../middlewares';
import { passportLocal, passportJwt } from '../utils/auth/passportMiddlewares';

const router = express.Router();

router.post('/register', register);

router.post('/login', passportLocal, login);

router.post('/verify-token', passportJwt, verifyToken);

router.post('/withdraw', withdraw);

router.post('/deposit', deposit);

export default router;