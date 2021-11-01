const express = require('express'),
      faker = require('faker'),
      router = express.Router(),
      type = "products"

router.get('/', (req, res) => {
  let products = [];
  const limit = req.query.size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      type,
      id: faker.datatype.uuid(),
      attributes: {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.lorem.sentence(),
      }
    })
  }
  res.json({
    data: products
  })
});

router.get('/:id', (req, res) => {
  res.json({
    data: {
      type,
      id: req.params.id,
      attributes: {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.lorem.sentence(),
      }
    }
  });
});

router.post('/', (req, res) => {
  const { body } = req
  res.json({
    data: {
      type,
      id: faker.datatype.uuid(),
      attributes: body
    }
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  res.json({
    data: {
      type,
      id,
      attributes: body,
    }
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    data: {
      type,
      id,
    }
  })
});

module.exports = router;
