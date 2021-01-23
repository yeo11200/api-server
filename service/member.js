const member = require('../repository/member');
// const crypt = require('../util/crypto');
const crypto = require('crypto');
const jwt = require('../util/jwt');

const login = async (data) => {

    let result = {};

    try{

        const info = await member.login(data.id);

        result.data = {};

        if(info === null){
            result.status = 900;
            result.msg = '오류';
            result.data.err_code = 101;
            result.data.err_msg = '회원의 정보가 없습니다.';
        }else{
            
            const confirmPass = await crypto.pbkdf2Sync(data.pw, info.salt, 100000, 64, 'sha512').toString('base64');

            const loginYn = await (confirmPass === info.pw) ? true : false;

            if(loginYn === false){
                result.status = 900;
                result.msg = '오류';
                result.data.err_code = 102;
                result.data.err_msg = '회원의 아이디와 비밀번호를 확인해주세요.';
            }else{
                result.status = 200;
                result.msg = '로그인 성공';
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

const registrer = async (data) => {

    let result = {};

    try{

        const info = await member.login(data.email);

        result.data = {};

        if(info === 0){
            data.salt = await crypto.randomBytes(255).toString('base64');
            data.pw = await crypto.pbkdf2Sync(data.pw, data.salt, 100000, 64, 'sha512').toString('base64');
    
            const memId = await member.registor(data);
    
            if(memId > 0){
                result.status = 200;
                result.msg = '회원가입 성공';
            }else{
                result.status = 900;
                result.msg = '오류';
                result.data.err_code = 103;
                result.data.err_msg = '회원의 정보가 없습니다.';
            }
        }else{
            result.status = 900;
            result.msg = '오류';
            result.data.err_code = 104;
            result.data.err_msg = '이미 가입된 아이디 입니다.';
        }

    }catch(e){
        result.status = 500;
        result.msg = e;
    }

    return result;
}

module.exports = {
    'login' : login,
    'registrer' : registrer
}