const authVerify = require('../auth/user-verify');
const apiRegister = require('../api/user-register');
const apiLogin = require('../api/user-login');
const apiLogout = require('../api/user-logout');
const apiValidate = require('../api/user-access-validation');
const apiRefresh = require('../api/user-refresh-token');

module.exports = function (router) {

    router.post('/register', apiRegister);

    router.post('/login', apiLogin);

    router.post('/logout', apiLogout);

    router.post('/validate', authVerify, apiValidate);

    router.post('/refresh', apiRefresh);

    return router;
}