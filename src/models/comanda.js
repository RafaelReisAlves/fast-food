import { Sequelize } from 'sequelize';
import sequelize from '../database/database.js';

const order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  produto: Sequelize.STRING,
  quantidade: Sequelize.INTEGER,
  sabor: Sequelize.STRING
});

const command = sequelize.define('command', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});

command.hasMany(order, {
  onDelete:"CASCADE"
})
order.belongsTo(command)


export {command, order}