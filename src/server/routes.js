/* W0116 */
var express = require('express');
var errorhandler = require('errorhandler');
var router = express.Router();

var four0four = require('./framework/utils/404')();
var security = require('./framework/security/security.service')();
var users = require('./users/user.service')();
var groups = require('./groups/group.service')();
var eventservice = require('./events/event.service')();

var DataRepository = require('./framework/data/data.repository');
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
router.get('/events', getEvents);
router.get('/event/id/:id', getEvent);
router.get('/event/attend/eid/:eid/uid/:uid', attend);
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

function getEvents(req, res, next) {
    console.log('Getting events');
    var dataRepositoryInstance = new DataRepository();
    var events = dataRepositoryInstance.getEvents();
    var result = {};
    result.events = events;
    result.status = 'RESPONSE_OK';
    console.log('returning ' + events.length + ' events');
    res.status(200).send(result);
}
function getEvent(req, res, next) {
    console.log('Getting events');
    var dataRepositoryInstance = new DataRepository();
    var events = dataRepositoryInstance.getEvents();
    var id = +req.params.id;
    var event = events.filter(function(e) {
        return e.id === id;
    })[0];

    if (event) {
        res.status(200).send(event);
    } else {
        four0four.send404(req, res, 'event ' + id + ' not found');
    }
}

function attend(req, res, next) {
    console.log('Trying to signup a user for an event');
    var dataRepositoryInstance = new DataRepository();
    var events = dataRepositoryInstance.getEvents();
    var users = dataRepositoryInstance.getUsers();
    var eid = +req.params.eid;
    var uid = +req.params.uid;
    var event = events.filter(function(e) {
        return e.id === eid;
    })[0];
    var user = users.filter(function(u) {
        return u.id === uid;
    })[0];

    var result = eventservice.attend(event, user);
    dataRepositoryInstance.updateEvent(event);
    res.status(200).send(result);
}
