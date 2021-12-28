const Joi = require('joi')

const id  = Joi.number(),
      name = Joi.string().max(50),
      price = Joi.number().min(15).max(1000),
      image = Joi.string().uri(),
      description = Joi.string(),
      categoryId = Joi.number().integer();

const createProduct = Joi.object({
  categoryId: categoryId.required(),
  name : name.required(),
  price: price.required(),
  image,
  description,
})

const updatedProduct = Joi.object({
  name,
  price,
  image,
  description,
  categoryId
})

const getProduct = Joi.object({
  id: id.required(),
})

const deletedProduct = Joi.object({
  id: id.required(),
})

module.exports = {
  createProduct,
  updatedProduct,
  getProduct,
  deletedProduct
}
