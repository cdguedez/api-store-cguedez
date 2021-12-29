const express = require('express'),
      productsRouter = require('./products.routes'),
      categoriesRouter = require('./categories.routes'),
      usersRouter = require('./users.routes'),
      customerRouter = require('./customers.routes'),
      orderRouter = require('./orders.routes');

class RouterApi {
  constructor(app) {
    this.app = app
    this.apiV1(this.app)
  }

  apiV1(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/customers', customerRouter);
    router.use('/orders', orderRouter);
  }

}

module.exports = RouterApi;
