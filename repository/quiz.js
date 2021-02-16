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

        const overlay = [];

        // count 함수를 사용하는 방법
        let count = await Quiz.count({
            where : {
                step : data.step,
                deleted_at : null,
                show_yn : 'Y'
            },
        });
        
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

            const listArray = [];

            if(list.length > 20){
                while(true){

                    const random = Math.floor(Math.random() * list.length);

                    if(overlay.includes(random) === false){
                        overlay.push(random);

                        if(listArray.length >= 20){
                            break;
                        }else{
                            listArray.push(list[random]);
                        }
                    }
                }
                
                list = listArray;
            }

            await list.map((value, index) => {
                list[index].lists = value.lists.split(',');
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

    const result = {};

    console.log('DB', data);
    try{

        let find = await Quiz.count({
            where : {
                idx : {
                    [Op.eq] : data.idx
                },
                anwsers : {
                    [Op.eq] : data.answers
                }
            }
        })
        result.cnt = find;
    }catch(e){
        result.cnt = 0;
    }
    return result;
}

const hintFinder = async (data) => {

    const result = {};

    try{
        let find = await Quiz.findOne({
            attributes : ['lists', 'anwsers'],
            where : {
                idx: {
                    [Op.eq] : data.idx
                },
            }
        })

        find.lists = await find.lists.split(',');

        Object.assign(result, {data : find});
    }catch(e){
        console.log(e);
        Object.assign(result, { errCode : 105, errMsg : e})
    }

    return result;
}

module.exports = {
    'listQuiz' : listQuiz,
    'findAnswer' : findAnswer,
    'hintFinder' : hintFinder
}
