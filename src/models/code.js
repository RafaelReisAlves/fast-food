import { Sequelize } from 'sequelize';
import sequelize from '../database/database.js';

const Codes = sequelize.define('code', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  connected: Sequelize.BOOLEAN
});

export default Codes