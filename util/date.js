const moment = require('moment-timezone');

const serverTime = moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:DD:ss');

const loginDate = moment().add(3, 'month').format('YYYY-MM-DD');

console.log(loginDate);

module.exports = {
    'serverTime' : serverTime
}