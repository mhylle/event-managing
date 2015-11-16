/* W0116 */
var express = require('express');
var errorhandler = require('errorhandler');
var router = express.Router();

var four0four = require('./utils/404')();
var security = require('./security/security')();
var data = require('./data');


var app = express();
//app.set('jwtTokenSecret', '123456ABCDEF');
app.use(errorhandler);
router.get('/users', requiresAuthentication, getUsers);
router.get('/user/:id', requiresAuthentication, getUser);
router.post('/login/', login);
router.get('/logout/', logout);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function login(req, res, next) {
    security.login(req, res, next);
}

function logout(req, res, next) {
    security.logout(req, res, next);
}

function requiresAuthentication(req,res,next) {
    security.requiresAuthentication(req,res,next);
}
function getUsers(req, res, next) {
    console.log('getusers start');
    res.status(200).send(data.users);
}

function getUser(req, res, next) {
    var id = +req.param.id;
    var user = data.users.filter(function (p) {
        return p.id === id;
    })[0];
    if (user) {
        res.status(200).send(user);
    } else {
        four0four.send404(req, res, 'user ' + id + ' not found');
    }
}
