const repostory = require('../repository/quiz');
const step = require('../repository/quiz.step');

const findAnswer = async (data) => {

    const result = {};

    console.log('service', data);
    try{

        let count = await repostory.findAnswer(data);

        console.log(count.cnt);
        if(count.cnt > 0){
            result.status = 200;
            result.msg = '정답입니다';
        }else{
            result.status = 900;
            result.msg = '오류';

            let test = {
                data : {
                    errCode : 104,
                    errMsg : '오답입니다.',
                }
                
            }
            /**
             * 객체를 병합해주는 함수
             * ES6 문법중 하나로 객체들을 병합해준다.
             */
            await Object.assign(result, test);
        }
    }catch(e){
        result.status = 500;
        result.msg = '서버 오류입니다.';
    }

    return result;
}

const quizList = async (data) => {

    console.log(data);

    const result = {};

    try{

        const list = await repostory.listQuiz(data);

        let datas = {};

        datas.data = list;

        await Object.assign(result, datas);

    }catch(e){

        console.log(e);

        result.status = 900;
        result.msg = e;
    }

    return result;
}

const stepList = async () => {

    const result = {};

    try{
        const repo = await step.stepList();

        if(repo.data?.cnt !== undefined){
            result.msg = '조회성공';
            result.status = 200;

            Object.assign(result, repo);
        }else{
            result.msg = '조회실패';
            result.status = 900;
        }
    }catch(e){
        console.log(e);
        result.msg = e;
        result.status = 500;
    }

    return result;
}

const hintFinder = async (data) => {

    const result = {};

    try{

        const repo = await repostory.hintFinder(data);

        repo.data.lists = repo.data.lists.filter((value, index) => {
            return value !== repo.data.anwsers;
        })

        repo.data.asleng = repo.data.anwsers.length;
        repo.data.anwsers = undefined;

        Object.assign(result, repo);
    }catch(e){

        console.log(e);
        
        result.msg = e;
        result.status = 500;
    }

    return result
}
module.exports = {
    'findAnswer' : findAnswer,
    'quizList' : quizList,
    'stepList' : stepList,
    'hintFinder' : hintFinder
}

