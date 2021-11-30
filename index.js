require('dotenv').config();
const express = require('express'),
      RouterApi = require('./routes'),
      Middleware = require('./midlewares/error.handler'),
      app = express(),
      cors = require('cors'),
      port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
new RouterApi(app);
app.use(Middleware.errorLog);
app.use(Middleware.boomErrorHandler);
app.use(Middleware.sqlErrorHamdler);
app.use(Middleware.errorHandler);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
