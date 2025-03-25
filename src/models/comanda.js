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
  tipo: Sequelize.STRING
});

const command = sequelize.define('command', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING,
    unique: true
  },
  nome: Sequelize.STRING,
  pronto: Sequelize.BOOLEAN,
  entregue: Sequelize.BOOLEAN
});

command.hasMany(order, {
  onDelete:"CASCADE"
})
order.belongsTo(command)


export {command, order}