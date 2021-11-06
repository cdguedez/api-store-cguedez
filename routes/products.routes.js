const express = require('express'),
      router = express.Router(),
      ProductService = require('../services/product.service'),
      service = new ProductService;

router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res
      .status(200)
      .json({
        data: products
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: 'Internal Server Error',
          details: error.message
        }
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    if(!product) {
      res
        .status(404)
        .json({
          error: {
            status: 404,
            title: 'Not Found',
            details: `Product with id ${id} not found`
          }
        });
    }
    res
      .status(200)
      .json({
        data: product
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: 'Internal Server Error',
          details: error.message
        }
      });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const newProduct = await service.create(body);
    res
      .status(201)
      .json({
        data: newProduct
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: 'Internal Server Error',
          details: error.message
        }
      });
  }
})

router.patch('/:id', async (req, res) => {
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
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: `Product not found`,
          details: error.message
        }
      });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await service.destroy(id)
    res
      .status(200)
      .json({
        id: product
      });
  } catch (error) {
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: "not fount",
          details: error.message
        }
      });
  }
});

module.exports = router;
