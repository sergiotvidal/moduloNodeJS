'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routers = require('./webserver/routes/index');
const mysqlPool = require('./databases/mysql-pool');


const app = express();
app.use(bodyParser.json());

app.use('/api', routers.accountRouter);
app.use('/api', routers.loginRouter);

async function init() {
  try {
    await mysqlPool.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const port = 3000;
  app.listen(3000, () => {
    console.log(`Server running and listening at port ${port}`);
  });
}

init();
