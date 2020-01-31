import { Sequelize } from 'sequelize-typescript';
import config from '../../config';
import { User } from './User';

const sequelizeConfig: object = {
    ...config.database,
    models: [User],
};

export default new Sequelize(sequelizeConfig);