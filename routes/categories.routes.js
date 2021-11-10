const express = require('express'),
      router = express.Router(),
      CategoryService = require('../services/categories.service'),
      validator = require('../midlewares/validator.handler'),
      { getCategory, createCategory, updateCategory, deleteCategory } = require('../schemas/category.schema'),
      service = new CategoryService;

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find()
    res
      .status(200)
      .json({
        data: categories
      });
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
validator.validatorHandler(getCategory, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res
      .status(200)
      .json({
        data: category
      });
  } catch (error) {
    next(error)
  }
});

router.post('/',
validator.validatorHandler(createCategory, 'body'),
async (req, res, next) => {
  try {
    const { body } = req
    const newCategory = await service.create(body)
    res
      .status(201)
      .json({
        data: newCategory
      })
  } catch (error) {
    next(error)
  }
});

router.patch('/:id',
validator.validatorHandler(getCategory, 'params'),
validator.validatorHandler(updateCategory, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const category = await service.update(id, body)
    res
      .status(200)
      .json({
        data: category
      })
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',
validator.validatorHandler(deleteCategory, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await service.destroy(id)
    res
      .status(200)
      .json({
        id: category
      });
  } catch (error) {
    next(error)
  }
});


module.exports = router;
