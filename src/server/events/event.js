/**
 * Created by mhylle on 29-11-2015.
 */
var utils = require('../framework/utils/generator');

var event = function () {
    var service = this;
    service.users = [];
    service.signup = signup;
    service.cancel = cancel;
    service.getAttendees = getAttendees;
    service.clearAttendees = clearAttendees;
};

module.exports = event;

function signup(user) {
    var isSigned = users.filter(function (u) {
            if (user) {
                return u.id === user.id;
            }
        }) > 0;
    if (!isSigned) {
        event.users.push(user);
        return true;
    } else {
        event.users.pop(user);
        return false;
    }
}

function cancel(user) {
    event.users.pop(user);
}

function getAttendees() {
    return event.users;
}

function clearAttendees() {
    event.users = [];
}


