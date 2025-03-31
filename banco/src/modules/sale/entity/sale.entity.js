import { DataTypes } from 'sequelize';
import sequelize from '../../../plugins/db.js';
import User from '../../users/entity/user.entity.js';

const Sale = sequelize.define(
  'Sale',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product: {
      type: DataTypes.ENUM(
        'Credito de Consumo',
        'Libranza Libre Inversión',
        'Tarjeta de Credito'
      ),
      allowNull: false
    },
    requestedLimit: { type: DataTypes.STRING(20), allowNull: false },
    franchise: {
      type: DataTypes.ENUM('AMEX', 'VISA', 'MASTERCARD'),
      allowNull: true
    },
    rate: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
    status: {
      type: DataTypes.ENUM('Open', 'In Progress', 'Completed'),
      defaultValue: 'Open'
    }
  },
  { timestamps: true }
);
Sale.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
Sale.belongsTo(User, { foreignKey: 'updatedBy', as: 'editor' });
export default Sale;
