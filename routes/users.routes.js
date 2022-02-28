const express = require('express'),
      router = express.Router(),
      UsersService =require('../services/users.service'),
      validator = require('../midlewares/validator.handler'),
      { createUser, updateUser, getUser, deleteUser } = require('../schemas/user.schema'),
      service = new UsersService,
      Auth = require('../midlewares/auth.handler');

router.get('/',
Auth.checkApiKey,
async (req, res, next) => {
  try {
    const users = await service.find();
    res
      .status(200)
      .json({
        data: users
      });
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
validator.validatorHandler(getUser, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await service.findOne(id)
    res
      .status(200)
      .json({
        data: user
      });
  } catch (error) {
    next(error)
  }
});

router.post('/',
validator.validatorHandler(createUser, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body)
    res
      .status(201)
      .json({
        data: newUser
      });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id',
validator.validatorHandler(getUser, 'params'),
validator.validatorHandler(updateUser, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await service.update(id, body);
    res
      .status(200)
      .json({
        data: user
      })
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',
validator.validatorHandler(deleteUser, 'params'),
async (req, res, next) => {
  try {
    const { id } =  req.params
    const user = await service.destroy(id)
    res
      .status(200)
      .json({
        data: user
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
