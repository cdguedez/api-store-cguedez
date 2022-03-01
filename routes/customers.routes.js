const express = require('express'),
      router = express.Router(),
      CustomersService = require('../services/customers.service'),
      validator = require('../midlewares/validator.handler'),
      { createCustomer, getCustomer, updateCsutomer, deleteCustomer } = require('../schemas/customer.schema'),
      service = new CustomersService

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find()
    res
      .status(200)
      .json({
        data: customers
      })
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
validator.validatorHandler(getCustomer, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await service.findOne(id)
    res
      .status(200)
      .json({
        data: customer
      })
  } catch (error) {
    next(error)
  }
})

router.post('/',
validator.validatorHandler(createCustomer, 'body'),
async (req, res, next) => {
  try {
    const body = req.body
    const newCustomer = await service.create(body)
    res
      .status(201)
      .json({
        data: newCustomer
      })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
validator.validatorHandler(getCustomer, 'params'),
validator.validatorHandler(updateCsutomer, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const customer = await service.update(id, body)
    res
      .status(200)
      .json({
        data: customer
      })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',
validator.validatorHandler(deleteCustomer, 'params'),
async (req, res, next) => {
  try {
    const { id } =  req.params
    const customer = await service.destroy(id)
    res
      .status(200)
      .json({
        data: customer
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
