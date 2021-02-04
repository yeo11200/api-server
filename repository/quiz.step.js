const models = require('../models/index');

const Quiz = models.QuizStep;
const Op = models.Sequelize.Op;

const stepList = async () => {

    const result = {};

    result.data = {};
    const data = result.data;
    try{

        const list = await Quiz.findAll({});
        const count = await Quiz.count({});

        data.list = list;
        data.cnt = count;
    }catch(e){
        data.errCode = 105;
        data.errMsg = e;
    }

    return result;
}

module.exports = {
    'stepList' : stepList
}