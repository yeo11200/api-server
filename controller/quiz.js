const service = require('../service/quiz');

const findAnswer = async (req, res, next) => {

    let result = {};
    
    const query = req.query;

    try{

        const data = {
            'idx' : query.idx,
            'answers' : query.answers
        }

        console.log(data);

        result = await service.findAnswer(data);
    }catch(e){
        result.status = 500;
        result.msg = e;

    }

    return res.status(200).json(result);
}

/**
 * async / await를 사용하는 이유
 * 비동기를 이용할 때 순서대로 이용하기 위해서 사용
 * try catch를 사용하는 이유는 reject를 처리 하기 위해서 사용
 */
const quizList = async (req, res, next) => {

    const result = {};

    const params = req.params;

    const data = {
        'step' : params.step,
        'start' : 0,
        'end' : 20
    }

    try{
        const test = await service.quizList(data);

        await Object.assign(result, test);

    }catch(e){
        result.status = 500;
        result.msg = e;
    }

    return res.status(200).json(result);
}

module.exports = {
    'findAnswer' : findAnswer,
    'quizList' : quizList
}