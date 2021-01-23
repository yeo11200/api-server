const models = require('../models/index');
const sequelize = require('sequelize');

const User = models.User;
const Op = sequelize.Op

const login = async (data) => {

    const result = null;

    try{

        await User.findAll({ 
            attributes : ['id', ['pw', 'pass'], 'salt', 'type', 'nickname', 'created_at'],
            where : {
                id : {
                    [Op.ed] : data
                },
                deleted_at : {
                    [Op.ne] : null
                }
            }
    }).then(res => {
            console.log(res);
            result = res;
        }).catch(e => {
            console.log(e);
            result = null;
        });

    }catch(e){
        result = null;
    }

    return result;
}


module.exports = {
    'login' : login,
}