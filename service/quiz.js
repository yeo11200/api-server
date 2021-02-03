const repostory = require('../repository/quiz');


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
module.exports = {
    'findAnswer' : findAnswer,
    'quizList' : quizList
}

