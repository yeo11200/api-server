const models = require('../models/index');
const User = models.User;
const Op = models.Sequelize.Op;
const serverTime = require('../util/date');

const login = async (data) => {

    let result = null;

    try{

        let info = await User.findAll({ 
            attributes : ['email', ['pw', 'pass'], 'salt', 'type', 'nickname', ['hint_cnt', 'hintCnt'], 'idx'],
            where : {
                'email' : data,
                'deleted_at' : {
                    [Op.eq]: null
                }
            }
        })
        if(info.length > 0){
            result = info[0].dataValues;
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

module.exports = {
    'login' : login,
    'registor' : registor,
    'lastLoginDate' : lastLoginDate
}