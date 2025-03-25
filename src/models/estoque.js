import { Sequelize } from 'sequelize';
import sequelize from '../database/database.js';

const stock = sequelize.define('stock', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  produto: Sequelize.STRING,
  quantidade: Sequelize.INTEGER,
  tipo: Sequelize.STRING
});

export default stock