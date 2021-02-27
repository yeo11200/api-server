const service = require('../service/member');

const login = async (req, res, next) => {

    let result = {};

    const body = req.body;

    let data = {
        'id' : body.id,
        'pw' : body.pw
    }

    try{
        result = await service.login(data);
    }catch(e){
        result.status = 500;
        result.msg = e;
    }

    return res.status(200).json(result);
}

const registar = async (req, res, next) => {

    let result = {};

    const body = req.body;

    

    let data = {
        'email' : body.id,
        'pw' : body.pw,
        'nickname' : body.nickname,
        'type' : (body.type === undefined) ? 'local' : body.type,
        'd_fine' : (body.type === undefined) ? 15 : body.type
    }

    try{
        result = await service.registrer(data);
    }catch(e){
        result.status = 500;
        result.msg = e;
    }

    return res.status(200).json(result);
}

const checkBoth = async (req, res, next) => {

    const body = req.body;

    const data = {
        type : body.type,
        value : body.value
    }
    const result = await service.checkBoth(data);

    return res.status(200).json(result);
}

module.exports = {
    'login' : login,
    'registar' : registar,
    'checkBoth' : checkBoth
}