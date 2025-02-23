import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize (
    config.development.name,
    config.development.user,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        dialectModule: require('mysql2')
    }
);

export default sequelize