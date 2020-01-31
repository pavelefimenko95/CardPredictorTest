import express, { Application, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import createError from 'http-errors';
import { HttpErrorDto } from './dto/httpError.dto';
import indexRouter from './routes';
import './utils/auth/passportJWT';
import './utils/auth/passportLocal';

const app: Application = express();

app.use(passport.initialize());

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => next(createError(404)));

app.use((err: HttpErrorDto, req: Request, res: Response, next: NextFunction) => {
    if(err.status >= 400 && err.status < 500){
        res.status(400).send(err);
    } else {
        console.error(err);
        res.status(500).send(err.message);
    }
});

export default app;