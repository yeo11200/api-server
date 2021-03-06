const models = require('../models/index');
const User = models.User;
const Op = models.Sequelize.Op;
const serverTime = require('../util/date');
const quiz = require('./quiz.log');


const login = async (data) => {

    let result = null;

    try{

        let info = await User.findAll({ 
            attributes : ['email', ['pw', 'pass'], 'salt', 'type', 'nickname', ['hint_cnt', 'hintCnt'], 'idx', ['login_authority', 'loginAuthority'], 'autority'],
            where : {
                'email' : data,
                'deleted_at' : {
                    [Op.eq]: null
                }
            }
        })
        if(info.length > 0){
            result = info[0].dataValues;
            result.quiz = await quiz.quizLog(result.idx);
        }else{
            result = 0;
        }
    }catch(e){
        result = 0;
    }

    return result;
}

const lastLoginDate = async (data) => {

    let result = 0;

    try{

        let update = await models.sequelize.transaction(async (tran) => {
            return await User.update(
                {'lastLoginAt' : serverTime.serverTime}, 
                {
                    where : {
                        idx : data
                    },
                    transaction: tran
                });
        })

        result = update[0];

    }catch(e){
        console.log(e);
        result = -1;  
    }

    return result;
}

const registor = async (data) => {

    let result = 0;

    console.log(data);
    
    try{
        
        let user = await models.sequelize.transaction(async (t) => {
            //  { fields: [ 'creator_id'] } : 해당하는 컬럼의 last insert id 리턴
            return await User.create(data, { transaction: t })
        });

        result = user.dataValues.idx;

    }catch(e){
        result = -1;
    }

    return result;
}

const checkBoth = async (data) => {

    let result = false;

    console.log(data);

    try{

        const cnt = await User.findOne({
            attributes: [ [models.Sequelize.fn('count', 'idx'), 'cnt']],
            where: {
                [data.type] : data.value
            }
        })

        if(cnt.dataValues.cnt === 0){
            result = true;
        }
        
    }catch(e){
        console.log(e);
    }

    return result;
}


module.exports = {
    'login' : login,
    'registor' : registor,
    'lastLoginDate' : lastLoginDate,
    'checkBoth' : checkBoth
}