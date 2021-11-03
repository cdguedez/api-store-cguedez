const express = require('express'),
      productsRouter = require('./products.routes'),
      categoriesRouter = require('./categories.routes'),
      usersRouter = require('./users.routes');

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
  }

}

module.exports = RouterApi;
