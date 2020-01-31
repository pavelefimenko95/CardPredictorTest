import { Response, NextFunction } from 'express';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import axios from 'axios';
import sequelize from '../models';
import { generateCard, isUserWon } from '../utils/generateCard';
import config from '../../config';
import { StartGameDto } from '../dto/startGame.dto';
import { EndGameDto } from '../dto/endGame.dto';

const Round = sequelize.models.Round;

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const round = await Round.findOne({
            where: {
                username: req.user.name
            }
        });

        res.send({
            user: req.user,
            round
        });
    } catch(e) {
        next(e);
    }
};

export const startGame = async (req: any, res: Response, next: NextFunction) => {
    try {
        const body: StartGameDto = req.body;

        const round = await Round.findOne({
            where: {
                username: req.user.name
            }
        });

        if(round) {
            throw createError(400, {
                message: `Round already started`
            });
        } else {
            const round: any = await Round.create({
                username: req.user.name,
                card: generateCard(),
                betAmount: body.betAmount
            });

            res.send({
                card: round.card,
            });
        }

    } catch(e) {
        next(e);
    }
};

export const endGame = async (req: any, res: Response, next: NextFunction) => {
    try {
        const body: EndGameDto = req.body;

        const round: any = await Round.findOne({
            where: {
                username: req.user.name
            }
        });

        if(!round) {
            throw createError(400, {
                message: `No started round`
            });
        } else {
            const hash = bcrypt.hashSync(config.MICROSERVICE_SECRET, 10);
            await axios.post('http://wallet:5000/withdraw', {
                username: req.user.name,
                amount: round.betAmount,
                hash
            });

            const nextCard = generateCard();
            const isWon = isUserWon(round.card, nextCard, body.prediction);

            await Round.destroy({
                where: {
                    id: round.id
                }
            });

            if(isWon) {
                const hash = bcrypt.hashSync(config.MICROSERVICE_SECRET, 10);

                await axios.post('http://wallet:5000/deposit', {
                    username: req.user.name,
                    amount: round.betAmount * 2,
                    hash
                });

                res.send('You won');
            } else {
                res.send('You loose');
            }
        }
    } catch(e) {
        next(e);
    }
};