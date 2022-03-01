const joi = require('joi')

const id = joi.number(),
    name = joi.string().min(3).max(50),
    description = joi.string().min(3).max(100)

const createCategory = joi.object({
  name: name.required(),
  description,
})

const updateCategory = joi.object({
  name,
  description
})

const getCategory = joi.object({
  id: id.required()
})

const deleteCategory = joi.object({
  id: id.required()
})

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory
}
