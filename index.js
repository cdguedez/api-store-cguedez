require('dotenv').config();
const express = require('express'),
      RouterApi = require('./routes'),
      Middleware = require('./midlewares/error.handler'),
      app = express(),
      port = process.env.PORT || 3000;

app.use(express.json())
new RouterApi(app);
app.use(Middleware.errorLog)
app.use(Middleware.boomErrorHandler)
app.use(Middleware.errorHandler)

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
