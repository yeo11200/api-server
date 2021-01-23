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

    return res.state(200).json(result);
}

const registar = async (req, res, next) => {

}

module.exports = {
    'login' : login,
    'registar' : registar
}