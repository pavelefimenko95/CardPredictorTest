import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cors from 'cors';
import { HttpErrorDto } from './dto/httpError.dto';
import indexRouter from './routes/index';
import config from '../config';
import './utils/auth/passportLocal';

const app = express();

app.use(cors({origin: '*'}));

app.use(cookieParser());

app.use(expressSession({ secret: config.SESSION_SECRET, maxAge: null }));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => next(createError(404)));

app.use((err: HttpErrorDto, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if(err.status >= 400 && err.status < 500){
        res.status(400).send(err);
    } else {
        console.error(err);
        res.status(500).send(err.message);
    }
});

export default app;