const express = require('express');
const app = express();
const env = require('dotenv');
const path = require('path');
const router = require('./router/index');

env.config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV == "dev" ? ".env" : ".env.dev"
    )
});

router(app);

console.log(process.env.PROJECT);


app.listen(3000, () => {
    console.log('start node');
});