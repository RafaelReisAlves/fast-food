import { Sequelize } from 'sequelize';
import sequelize from '../database/database';

const ratingModel = sequelize.define('rating', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  rating: Sequelize.INTEGER
});

export default ratingModel