const { Model, DataTypes, Sequelize } = require('sequelize');
const { USERS_TABLE } = require('../models/user.model');
const CUSTOMERS_TABLE = 'customers';
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING(75),
    field: 'first_name'
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING(75),
    field: 'last_name'
  },
  dateOfBirth: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'date_of_birth'
  },
  gender: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
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
class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMERS_TABLE,
      modelName: 'Customer',
      timestamps: true
    }
  }
}

module.exports = { CUSTOMERS_TABLE, CustomerSchema, Customer }
