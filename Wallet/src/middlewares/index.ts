import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import sequelize from '../models';
import config from '../../config';
import signToken from '../utils/auth/signToken';

const User = sequelize.models.User;

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uniqueCheckResult = await User.findAll({
            where: {
                name: req.body.name
            },
            raw: true,
        });
        if (uniqueCheckResult.length !== 0)
            throw createError(400, {
                message: `User with name '${req.body.name}' already exists`
            });

        const user = await User.create(req.body);
        const token = signToken(user);

        res.send({ token });
    } catch(e) {
        next(e);
    }
};

export const login = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = signToken(req.user);

        res.send({ token });
    } catch(e) {
        next(e);
    }
};

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = {...req.user.get()};
        delete user.password;

        res.send({ user });
    } catch(e) {
        next(e);
    }
};

export const withdraw = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { amount, username, hash } = req.body;

        if(await bcrypt.compare(config.MICROSERVICE_SECRET, hash)) {
            const user: any = await User.findOne({
                where: {
                    name: username,
                }
            });

            await User.update({
                balance: user.balance - amount
            }, {
                where: {
                    name: username,
                }
            });

            res.send();
        } else {
            throw createError(400, {
                message: 'Invalid hash'
            });
        }
    } catch(e) {
        next(e);
    }
};

export const deposit = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { amount, username, hash } = req.body;

        if(await bcrypt.compare(config.MICROSERVICE_SECRET, hash)) {
            const user: any = await User.findOne({
                where: {
                    name: username,
                }
            });

            await User.update({
                balance: user.balance + amount
            }, {
                where: {
                    name: username,
                }
            });

            res.send();
        } else {
            throw createError(400, {
                message: 'Invalid hash'
            });
        }
    } catch(e) {
        next(e);
    }
};