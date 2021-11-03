const express = require('express'),
      faker = require('faker'),
      router = express.Router(),
      type = "users";

router.get('/', (req, res) => {
  const users = [];
  const limit = req.params.size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      type,
      id: faker.datatype.uuid(),
      attributes: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        role: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber()
      }
    })
  }
  res.json({
    data: users
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    data: {
      type,
      id,
      attributes: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        role: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber()
      }
    }
  })
});

router.post('/', (req, res) => {
  const body = req.body;
  const id = faker.datatype.uuid()
  res.status(201).json({
    data: {
      type,
      id,
      attributes: body
    }
  })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body;
  console.log(id, body)
  res.json({
    data: {
      type,
      id,
      attributes: body
    }
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    data: {
      type,
      id
    }
  })
})

module.exports = router;
