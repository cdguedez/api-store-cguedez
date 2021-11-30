const { Model, DataTypes, Sequelize } = require('sequelize');

const USERS_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100),
    validate: {
      isEmail: true
    }
  },
  userName: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100),
    field: 'username'
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(100)
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate() {
    // associate
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'User',
      timestamps: true
    }
  }
}

module.exports = { USERS_TABLE, UserSchema, User }
