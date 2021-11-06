const express = require('express'),
      router = express.Router(),
      UsersService =require('../services/users.service'),
      service = new UsersService;

router.get('/', (req, res) => {
  const users = service.find();
  res
    .status(200)
    .json({
      data: users
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = service.findOne(id)
  !user ?
  res
    .status(404)
    .json({
      error: {
        message: 'User not found'
      }
    })
  :
  res
    .status(200)
    .json({
      data: user
    })
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body)
  res
    .status(201)
    .json({
      data: newUser
    })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res
    .status(200)
    .json({
      data: user
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.destroy(id)
  res
    .status(200)
    .json({
      id: user
    })
})

module.exports = router;
