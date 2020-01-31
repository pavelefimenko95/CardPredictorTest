import express from 'express';
import { authenticate, startGame, endGame } from '../middlewares';
import { passportLocal } from '../utils/auth/passportMiddlewares';
import isAuthenticated from '../utils/auth/isAuthenticated';

const router = express.Router();

router.post('/authenticate', passportLocal, authenticate);

router.post('/start-game', isAuthenticated, startGame);

router.post('/end-game', isAuthenticated, endGame);

export default router;