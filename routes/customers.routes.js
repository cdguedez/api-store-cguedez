const express = require('express'),
      router = express.Router(),
      UsersService =require('../services/customers.service'),
      validator = require('../midlewares/validator.handler'),
      { createCustomer, updateCustomer, getCustomer, deleteCustomer } = require('../schemas/customer.schema'),
      service = new UsersService;

router.get('/', async (req, res, next) => {
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
validator.validatorHandler(getCustomer, 'params'),
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
validator.validatorHandler(createCustomer, 'body'),
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
validator.validatorHandler(getCustomer, 'params'),
validator.validatorHandler(updateCustomer, 'body'),
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
validator.validatorHandler(deleteCustomer, 'params'),
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
