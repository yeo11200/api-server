// npm install --save crypto : 비밀번호 인증화
const crypto = require('crypto');

const byte = 255;
// 반복적인 횟수 지정
const key = 100000;
// 비밀번호 길이를 지정
const buffer = 64;
const incode = 'base64';
const cryptoState = 'sha512';

const createPass = async (password) => {

    let data = {};

    // ramdom Byte : 지속적으로 바뀌다보니 DB에 데이터 추가
    data.salt = await crypto.randomBytes(byte).toString(incode);

    data.pass = await crypto.pbkdf2Sync(password, data.salt, key, buffer, cryptoState).toString(incode);

    return data;
}

const confirmPass = async (password, salt, dbPass) => {
    
    const data = await crypto.pbkdf2Sync(password, salt, key, buffer, cryptoState).toString(incode);

    return (dbPass === data) ? true : false;
}


module.exports = {
    'createPass' : createPass,
    'confirmPass' : confirmPass
}