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

        // count 함수를 사용하는 방법
        let count = await Quiz.count({where : {
            step : data.step,
            deleted_at : null,
            show_yn : 'Y'
        },});
        
        // sequelize 방법을 사용하는 방법
        // let count2 = await Quiz.findAll({
        //     attributes : [ [models.Sequelize.fn('count', 'idx'), 'cnt']],
        //     where : {
        //         step : data.step,
        //         deleted_at : null,
        //         show_yn : 'Y'
        //     }
        // })

        if(count > 0){
            let list = await Quiz.findAll({
                attributes : ['idx', 'questions', 'lists', 'type', 'step'],
                where : {
                    step : data.step,
                    deleted_at : null,
                    show_yn : 'Y'
                },
                // offset : 안보이는 갯수 이전의 페이지의 숫자를 리턴
                // offset : data.offset,
                // limit : data.limit
            })

            result.list = list;
        }
        
        result.cnt = count;

    }catch(e){

        result.cnt = 0;
        console.log('eeror', e);
    }
    
    return result;
}

const findAnswer = async (data) => {
    try{

        let find = await Quiz.findOne({
            where : {
                step : {
                    [Op.eq] : data.step
                }
            }
        })
        
        console.log(find);
    }catch(e){

    }
}

findAnswer({step : 3});

module.exports = {
    'listQuiz' : listQuiz
}
