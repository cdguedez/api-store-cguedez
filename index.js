require('dotenv').config();
const express = require('express'),
      RouterApi = require('./routes'),
      app = express(),
      port = process.env.PORT || 3000;

app.use(express.json())
new RouterApi(app);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
