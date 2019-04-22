'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const routers = require('./routers');

const app = express();
app.use(bodyParser.json());

app.use('/api', routers.cervezasRouter);

app.listen(3002, () => {
    console.log('Server running on port 3002');
  });