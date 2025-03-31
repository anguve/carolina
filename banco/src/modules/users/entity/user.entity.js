import { DataTypes } from 'sequelize';
import sequelize from '../../../plugins/db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('password', bcrypt.hashSync(value, salt));
      }
    },
    role: {
      type: DataTypes.ENUM('Administrador', 'Asesor'),
      allowNull: false
    }
  },
  { tableName: 'users', timestamps: true }
);

export default User;
