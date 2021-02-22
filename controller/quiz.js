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

const stepList = async (req, res, next) => {

    const result = {};
    
    try{

        const data = await service.stepList();

        Object.assign(result, data);
    }catch(e){

        console.log(e);
        result.msg = e;
        result.status = 500;
    }

    return res.status(200).json(result);
}

const hintFinder = async (req, res, next) => {
    const result = {};
    
    const params = req.params;

    const query = req.query;

    try{

        const data = {
            'idx' : params.idx
        }

        const servi = await service.hintFinder(data);

        const random = Math.round(Math.random() * (servi.data.lists.length - servi.data.asleng));

        if(query.hint !== undefined){
            servi.data.lists = servi.data.lists.filter((value) => {
                return query.hint.indexOf(value) == -1;
            })
            
            const random = Math.round(Math.random() * (servi.data.lists.length - servi.data.asleng));

            servi.data.lists = servi.data.lists[random];

        }else{
            servi.data.lists = servi.data.lists[random];
        }

        result.msg = '성공';
        result.status = 200;

        Object.assign(result, servi);

    }catch(e){
        result.msg = e;
        result.status = 500;
    }

    return res.status(200).json(result);
}

const quizLogCreate = async (req, res, next) => {

    const result = {};

    const body = req.body;

    const params = req.params;

    try{

        const count = await service.quizList(params);

        if(count.data.cnt === 0){
            result.status = 900;
            result.msg = '해당하는 데이터가 없습니다';
        }else{

            const data = await service.quizLogCreate(body, params.step);

            if(data.data === true){
                result.status = 200;
                result.msg = '성공 입니다';
            }else{
                result.status = 900;
                result.msg = '에러 입니다';
            }
    
            Object.assign(result, data);
        }

    }catch(e){
        result.status = 900;
        result.msg = e;
    }

    return res.status(200).json(result);
}

module.exports = {
    'findAnswer' : findAnswer,
    'quizList' : quizList,
    'stepList' : stepList,
    'hintFinder' : hintFinder,
    'quizLogCreate' : quizLogCreate
}