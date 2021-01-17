const authVerify = require('../auth/user-verify');
const apiRegister = require('../api/user-register');
const apiLogin = require('../api/user-login');
const apiLogout = require('../api/user-logout');
const apiValidate = require('../api/user-access-validation');
const apiRefresh = require('../api/user-refresh-token');
const apiMapSave = require('../api/user-map-save');
const apiMapList = require('../api/user-map-list');
const apiMapLoad = require('../api/user-map-load');

module.exports = function (router) {

    router.post('/register', apiRegister);

    router.post('/login', apiLogin);

    router.post('/logout', apiLogout);

    router.post('/validate', authVerify, apiValidate);

    router.post('/refresh', apiRefresh);

    router.post('/map/save', authVerify, apiMapSave);

    router.post('/map/list', apiMapList);

    router.post('/map/load', apiMapLoad);

    return router;
}