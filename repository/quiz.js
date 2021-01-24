const models = require('../models/index');

const Quiz = models.Quiz;
const Op = models.Sequelize.Op;

const createQuiz = async (data) => {

    let result = 0;
    try{

        let quiz = await models.sequelize.transaction(async (tran) => {
            return await Quiz.create(data, {transaction : tran});
        })

        result = quiz.dataValues.idx;

    }catch(e){
        console.log(e);
        result = -1;
    }

    return result;
}

const listQuiz = async (data) => {
    let result = {};

    try{

    }catch(e){

    }

    return result;
}