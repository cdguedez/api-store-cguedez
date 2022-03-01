const { Model, DataTypes, Sequelize } = require('sequelize')
const ORDERS_TABLE = 'orders'
const { CUSTOMERS_TABLE } = require('./customer.model')
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      model: CUSTOMERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'new order'
  },
  total: {
    allowNull: false,
    type: DataTypes.VIRTUAL,
    get() {
      if(this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0)
      }
      return 0
    }
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

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' })
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Order',
      timestamps: true
    }
  }
}

module.exports = { ORDERS_TABLE, OrderSchema, Order }
