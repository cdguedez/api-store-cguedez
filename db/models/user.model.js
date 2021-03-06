const { Model, DataTypes, Sequelize } = require('sequelize')
const USERS_TABLE = 'users'
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
  role: {
    allowNull: false,
    type: DataTypes.STRING(50),
    after: 'password',
    defaultValue: 'customer'
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(100)
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
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
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' })
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
