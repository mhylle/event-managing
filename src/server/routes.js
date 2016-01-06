/* W0116 */
var express = require('express');
var errorhandler = require('errorhandler');
var router = express.Router();

var four0four = require('./framework/utils/404')();
var security = require('./framework/security/security.service')();
var users = require('./users/userservice.js')();
var groups = require('./groups/group.service')();
//var data = require('./framework/data/data');

var app = express();
//app.set('jwtTokenSecret', '123456ABCDEF');
app.use(errorhandler);
router.get('/users', requiresAuthentication, getUsers);
router.post('/users', requiresAuthentication, saveUser);
router.get('/user/:id', requiresAuthentication, getUser);
router.get('/groups', requiresAuthentication, getGroups);
router.post('/groups', requiresAuthentication, saveGroup);
router.get('/groups/:id', requiresAuthentication, getGroup);
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

function requiresAuthentication(req, res, next) {
    security.requiresAuthentication(req, res, next);
}
function getUsers(req, res, next) {
    var users2 = users.getUsers();
    res.status(200).send(users2);
}

function saveUser(req, res, next) {
    users.saveUser(req, res, next);
}

function getUser(req, res, next) {
    users.getUser(req, res, next);
}

function getGroups(req, res, next) {
    var groups2 = groups.getGroups();
    res.status(200).send(groups2);
}

function saveGroup(req, res, next) {
    groups.saveGroup(req, res, next);
}

function getGroup(req, res, next) {
    groups.getGroup(req, res, next);
}
