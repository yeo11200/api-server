// npm install --save jsonwebtoken
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET_KEY || 'save';
const JWTDATA = '1h';

// 해당하는 토큰을 생성
const createToken = async (id, name) => {

    let token = jwt.sign(
        {
            // 담아둘 데이터
            user_id : id,
            user_name : name, 
        },  
        //  project .비밀 키
            SECRET,
        {
            // jwt 유지 기간
            expiresIn: JWTDATA
        }
    )

    return token
}


const verifyToken = async (req, res, next) => {

    const body = req.body;

    console.log('test');
    try{

        if(body.token !== undefined){
            const decoded = await jwt.verify(body.token, SECRET);

            if(decoded){
                next();
            }else{
                return res.status(401).json({ error: 'unauthorized' });
            }
        }else{
            next();
        }
        
    }catch(e){
        return res.status(401).json({ error: 'token expired' });
    }
}
createToken('test', 'id');

module.exports = {
    'createToken' : createToken,
    'verifyToken' : verifyToken
}