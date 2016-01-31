//var utils = require('../utils/generator');
//var moment = require('moment');
//var eventdef = require('../../events/event');
var eventdb = [];
var userdb = [];
var groupdb = [];

var userdata = require('./User_mock_data');
var eventdata = require('./Event_mock_data');
var groupdata = require('./Group_mock_data');

var data = function () {
    initializeEvents();
    initializeUsers();
    initializeGroups();

    var service = this;
    service.events = function () {
        return getEvents();
    };

    service.users = function () {
        return getUsers();
    };

    service.groups = function () {
        return getGroups();
    };

    service.updateEvent = function (event) {
        var eid = event.id;
        var counter = 0;

        for (var i = 0; i < eventdb.length; i++) {
            var evt = eventdb[i];
            if (evt.id === eid) {
                break;
            }
            counter++;
        }
        eventdb[counter] = event;
    };
};

module.exports = data;

function getUsers() {
    return userdata;

}
function getGroups() {
    return groupdata;
}

function initializeUsers() {
    userdb = userdata;
    return userdb;
}

function initializeGroups() {
    groupdb = groupdata;
    return groupdb;
}

function initializeEvents() {
    eventdb = eventdata;
    return eventdb;
}

function getEvents() {
    return eventdb;
}
