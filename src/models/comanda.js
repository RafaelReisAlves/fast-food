import { Sequelize } from 'sequelize';
import sequelize from '../database/database';

const order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  produto: Sequelize.STRING,
  quantidade: Sequelize.INTEGER
});

const command = sequelize.define('command', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});

command.hasMany(order)
order.belongsTo(command)


export {command, order}