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

module.exports = { 
    'quizLogCreate' : quizLogCreate
}