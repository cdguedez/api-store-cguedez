const Joi = require('joi');

const id = Joi.number().integer(),
      status = Joi.string(),
      customerId = Joi.number().integer(),
      orderId = Joi.number().integer(),
      productId = Joi.number().integer(),
      amount = Joi.number().integer().min(1)

const getOrder = Joi.object({
  id: id.required()
});

const createdOrder = Joi.object({
  customerId: customerId.required(),
  status
});

const updatedOrder = Joi.object({
  status,
  customerId
});

const addItem = Joi.object({
  orderId: orderId.required(),
  productId:productId.required(),
  amount: amount.required()
});

module.exports = {
  getOrder,
  createdOrder,
  updatedOrder,
  addItem
}
