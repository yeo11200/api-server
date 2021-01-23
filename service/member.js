const member = require('../repository/member');
const crypt = require('../util/crypto');
const jwt = require('../util/jwt');

const login = async (data) => {

    const result = {};

    try{

        const info = await member.login(data.id);

        result.data = {};

        if(info === null){
            result.status = 900;
            result.msg = e;
            result.data.err_code = 101;
            result.data.err_msg = '회원의 정보가 없습니다.';
        }else{
            
            const loginYn = await crypt.confirmPass(data.pw, info.salt, info.pass);

            if(loginYn === false){
                result.status = 900;
                result.msg = e;
                result.data.err_code = 102;
                result.data.err_msg = '회원의 아이디와 비밀번호를 확인해주세요.';
            }else{
                result.status = 200;
                result.msg = e;
                // key값을 delete 해당 해당 리턴을 방지
                delete info.pass;
                result.data.info = info;
                result.data.token = jwt.createToken(info.id, info.nickname);
            }
        }
    }catch(e){
        result.status = 500;
        result.msg = e;
    }

    return result;
}


module.exports = {
    'login' : login
}