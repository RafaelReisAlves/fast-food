import { Sequelize } from 'sequelize';
import sequelize from '../database/database';

const orderModel = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  produto: Sequelize.STRING,
  quatidade: Sequelize.INTEGER,
  // commandId: {
  //   allowNull:false,
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "command",
  //     key: "id"
  //   }
  // }
});

const commandModel = sequelize.define('command', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  // orderId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "order",
  //     key: "id"
  //   }
  // }
});

export {commandModel, orderModel}