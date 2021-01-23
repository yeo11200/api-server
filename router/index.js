const member = require('./member');

module.exports = (app) => {
    app.use('/member', member);
}