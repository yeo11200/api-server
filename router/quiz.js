const controller = require('../controller/quiz');
const express = require('express');
const router = express.Router();

router.get('/anwser', controller.findAnswer);

router.route('/:step').get(controller.quizList);

router.route('/').get(controller.stepList);

module.exports = router;
