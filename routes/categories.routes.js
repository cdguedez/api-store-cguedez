const express = require('express'),
      faker = require('faker'),
      router = express.Router(),
      type = "category"

router.get('/', (req, res) => {
  const categories = [];
  const limit = req.query.size || 10;
  for(let i = 0; i < limit; i++) {
    categories.push({
      type,
      id: faker.datatype.uuid(),
        attributes: {
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
          image: faker.image.imageUrl()
        }
    });
  }
  res.json({
    data: categories
  });
});

router.get('/:id', (req, res) => {
  res.json({
    data: {
      type,
      id: req.params.id,
      attributes: {
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl()
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
});

router.patch('/:id', (req, res) => {
  const { body } = req
  res.json({
    data: {
      type,
      id: req.params.id,
      attributes: body
    }
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    data: {
      type,
      id
    }
  })
});


module.exports = router;
