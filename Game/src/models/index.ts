import { Sequelize } from 'sequelize-typescript';
import config from '../../config';
import { Round } from './Round';

const sequelizeConfig: object = {
    ...config.database,
    models: [Round],
};

export default new Sequelize(sequelizeConfig);