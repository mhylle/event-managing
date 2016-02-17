/* W0116 */
var express = require('express');
var errorhandler = require('errorhandler');
var router = express.Router();

var four0four = require('./framework/utils/404')();
var security = require('./framework/security/security.service')();
//var eventservice = require('./events/event.service')();

//var DataRepository = require('./framework/data/data.repository');

var _ = require('lodash');

//var dataRepositoryInstance;

var app = express();
//app.set('jwtTokenSecret', '123456ABCDEF');
app.use(errorhandler);

var groups = require('./routes/groups.js')(router);
var users = require('./routes/users.js')(router);
var events = require('./routes/events.js')(router);
var locations = require('./routes/locations.js')(router);

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

//function requiresAuthentication(req, res, next) {
//    security.requiresAuthentication(req, res, next);
//}

//function getUsers(req, res) {
//    initializeDataRepository();
//
//    var users = dataRepositoryInstance.getUsers();
//    var result = {};
//    result.users = users;
//    result.status = 'RESPONSE_OK';
//    console.log('returning ' + users.length + ' users');
//    res.status(200).send(result);
//}
//
//function saveUser(req, res) {
//    initializeDataRepository();
//
//    var users = dataRepositoryInstance.getUsers();
//
//    var index = _.findIndex(users, {id: req.params.id});
//    _.merge(users[index], req.body);
//    res.json({info: 'user updated successfully'});
//}
//
//function getUser(req, res) {
//    console.log('Getting events');
//    initializeDataRepository();
//
//    var users = dataRepositoryInstance.getUsers();
//    var user = _.find(users, {id: req.params.id});
//
//    if (user) {
//        res.status(200).send(user);
//    } else {
//        four0four.send404(req, res, 'user ' + req.params.id + ' not found');
//    }
//}

//function getGroups(req, res) {
//    console.log('Getting groups');
//    initializeDataRepository();
//
//    var groups = dataRepositoryInstance.getGroups();
//    var result = {};
//    result.groups = groups;
//    result.status = 'RESPONSE_OK';
//    console.log('returning ' + groups.length + ' groups');
//    res.status(200).send(result);
//}

//function saveGroup(req, res) {
//    initializeDataRepository();
//
//    var groups = dataRepositoryInstance.getGroups();
//
//    var index = _.findIndex(groups, {id: req.params.id});
//    _.merge(groups[index], req.body);
//    res.json({info: 'group updated successfully'});
//}
//
//function getGroup(req, res) {
//    console.log('Getting groups');
//    initializeDataRepository();
//
//    var groups = dataRepositoryInstance.getGroups();
//    var group = _.find(groups, {id: req.params.id});
//
//    if (group) {
//        res.status(200).send(group);
//    } else {
//        four0four.send404(req, res, 'group ' + req.params.id + ' not found');
//    }
//}

//function initializeDataRepository() {
//    if (!dataRepositoryInstance) {
//        dataRepositoryInstance = new DataRepository();
//    }
//}
//function getEvents(req, res) {
//    console.log('Getting events');
//    initializeDataRepository();
//
//    var events = dataRepositoryInstance.getEvents();
//    var result = {};
//    result.events = events;
//    result.status = 'RESPONSE_OK';
//    console.log('returning ' + events.length + ' events');
//    res.status(200).send(result);
//}
//
//function getEvent(req, res) {
//    console.log('Getting event');
//    initializeDataRepository();
//
//    var events = dataRepositoryInstance.getEvents();
//    var event = _.find(events, {id: req.params.id});
//
//    if (event) {
//        res.status(200).send(event);
//    } else {
//        four0four.send404(req, res, 'event ' + req.params.id + ' not found');
//    }
//}
//
//function attend(req, res) {
//    console.log('Trying to signup a user for an event');
//    initializeDataRepository();
//
//    var events = dataRepositoryInstance.getEvents();
//    var users = dataRepositoryInstance.getUsers();
//
//    var event = _.find(events, {id: req.params.eid});
//    var user = _.find(users, {id: req.params.uid});
//
//    var result = eventservice.attend(event, user);
//    dataRepositoryInstance.updateEvent(event);
//    res.status(200).send(result);
//}
