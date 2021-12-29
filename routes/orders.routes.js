const express = require('express'),
      router = express.Router(),
      OrderService = require('../services/orders.service'),
      validator = require('../midlewares/validator.handler'),
      { getOrder, createdOrder, updatedOrder, addItem } = require('../schemas/order.schema'),
      service = new OrderService;

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res
      .status(200)
      .json({
        data: orders
      });
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
validator.validatorHandler(getOrder, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res
      .status(200)
      .json({
        data: order
      });
  } catch (error) {
    next(error)
  }
});

router.post('/',
validator.validatorHandler(createdOrder, 'body'),
async (req, res, next) => {
  try {
    const { body } = req;
    const newOrder = await service.create(body);
    res
      .status(201)
      .json({
        data: newOrder
      });
  } catch (error) {
    next(error)
  }
})

router.post('/add-item',
validator.validatorHandler(addItem, 'body'),
async (req, res, next) => {
  try {
    const { body } = req;
    const newItem = await service.addItem(body);
    res
      .status(201)
      .json({
        data: newItem
      });
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
validator.validatorHandler(getOrder, 'params'),
validator.validatorHandler(updatedOrder, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const order = await service.update(id, body);
    res
      .status(200)
      .json({
        data: order
      })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
