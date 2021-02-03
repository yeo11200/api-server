const member = require('./member');
const quiz = require('./quiz');
module.exports = (app) => {
    app.use('/member', member);
    app.use('/quiz', quiz);
}