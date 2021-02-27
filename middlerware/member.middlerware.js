const member = require('../repository/member');


const check = ['email', 'nickname'];

const join = async (req, res, next) => {

    console.log('middle', req.body);

    const body = req.body;

    try{

        const data = {
            'email' : body.id,
            'nickname' : body.nickname
        }

        const result = {};
        check.filter(async (value, index) => {
            const test = await member.checkBoth({'type' : value, 'value' : data[value] });

            if(test === false){
                if(value === 'email'){
                    result.status = 900;
                    result.msg = '오류';
                    result.data = {};
                    result.data.err_code = 106;
                    result.data.err_msg = '이미 가입된 아이디 입니다.';
                }else{
                    result.status = 900;
                    result.msg = '오류';
                    result.data = {};
                    result.data.err_code = 107;
                    result.data.err_msg = '이미 가입된 닉네임 입니다.';
                }

                return res.status(200).json(result);
            }
        });

        next();
    }catch(e){
        return res.status(200).json({msg : e});
    }
}

module.exports = {
    'join' : join
}