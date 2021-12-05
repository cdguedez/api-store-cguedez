const joi = require('joi')

const id  = joi.number(),
      name = joi.string().max(50),
      price = joi.number().min(15).max(1000),
      image = joi.string().uri(),
      description = joi.string();

const createProduct = joi.object({
  name : name.required(),
  price: price.required(),
  image,
  description
})

const updatedProduct = joi.object({
  name,
  price,
  image,
  description,
})

const getProduct = joi.object({
  id: id.required(),
})

const deletedProduct = joi.object({
  id: id.required(),
})

module.exports = {
  createProduct,
  updatedProduct,
  getProduct,
  deletedProduct
}
