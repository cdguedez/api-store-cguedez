const express = require('express'),
      router = express.Router(),
      ProductService = require('../services/product.service'),
      service = new ProductService;

router.get('/', (req, res) => {
  const products = service.find();
  res.json({
    data: products
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  !product ?
  res.status(404).json({
    error: {
      message: "product not found"
    }
  })
  :
  res.status(200).json({
    data: product
  })
});

router.post('/', (req, res) => {
  const { body } = req;
  const newProduct = service.create(body);
  res.status(201).json({
    data: newProduct
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json({
    data: product
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const product = service.destroy(id)
  res.json({
    data: product
  })
});

module.exports = router;
