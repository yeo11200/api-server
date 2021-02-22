const express = require('express');
const app = express();
const env = require('dotenv');
const path = require('path');
const router = require('./router/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const models = require('./models/index').sequelize;


models.sync();

env.config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV == "development" ? ".env" : ".env.dev"
    )
});

/**
 * express에서 데이터를 받기위한 middleware 추가
 */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
/**
 * cookie 데이터 활성화
 */
app.use(cookieParser());

router(app);


console.log(process.env.SECRET_KEY);


app.listen(5000, () => {
    console.log('start node');
});