const express = require('express'),
      router = express.Router(),
      ProductService = require('../services/product.service'),
      service = new ProductService;

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res
      .status(200)
      .json({
        data: products
      });
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
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

router.patch('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
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
