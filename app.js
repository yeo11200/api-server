const express = require('express');
const app = express();

const router = require('./router/index');


router(app);

app.listen(3000, () => {
    console.log('start node');
});