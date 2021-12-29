const express = require('express'),
      router = express.Router(),
      ProductService = require('../services/products.service'),
      validator = require('../midlewares/validator.handler'),
      { getProduct, createProduct, updatedProduct, deletedProduct, pagination } = require('../schemas/product.schema'),
      service = new ProductService;

router.get('/',
  validator.validatorHandler(pagination, 'query'),
  async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res
      .status(200)
      .json({
        data: products
      });
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
validator.validatorHandler(getProduct, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res
      .status(200)
      .json({
        data: product
      });
  } catch (error) {
    next(error)
  }
});

router.post('/',
validator.validatorHandler(createProduct, 'body'),
async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await service.create(body);
    res
      .status(201)
      .json({
        data: newProduct
      });
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
validator.validatorHandler(getProduct, 'params'),
validator.validatorHandler(updatedProduct, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res
      .status(200)
      .json({
        data: product
      })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',

validator.validatorHandler(deletedProduct, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await service.destroy(id)
    res
      .status(200)
      .json({
        id: product
      });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
