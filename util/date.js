const moment = require('moment-timezone');

const serverTime = moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:DD:ss');

module.exports = {
    'serverTime' : serverTime
}