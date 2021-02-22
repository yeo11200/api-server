const models = require('../models');

const Quiz = models.QuizLog;

const Op = models.sequelize.Op;

const quizLogCreate = async (data) => {

    let result = false;
    try{
        let quiz = await models.sequelize.transaction(async (tran) => {
            return await Quiz.create(data, {transaction : tran});
        })

        if(quiz?.idx !== undefined){
            result = true;
        }else{
            result = false;
        }
    }catch(e){
        result = false;
    }

    console.log(result);

    return result;
}

const quizLog = async (data) => {
    let result = {};

    try{
        let log = await Quiz.findAll(
        {
            attributes : ['step'],
            where : {
                mId : data
            },
            group: ['step'],
        });

        const array = [];
        log.filter((value) => {
            array.push(value.step);
        })
        result = array;

    }catch(e){
        console.log(e);
        result.errQuiz = e;
    }

    return result;
}

module.exports = { 
    'quizLogCreate' : quizLogCreate,
    'quizLog' : quizLog
}