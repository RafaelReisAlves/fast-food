import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import mysql2 from "mysql2"

const sequelize = new Sequelize (
    config.development.name,
    config.development.user,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        dialectModule: mysql2
    }
);

export default sequelize