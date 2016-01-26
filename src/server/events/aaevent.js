/**
 * Created by mhylle on 29-11-2015.
 */
//var utils = require('../framework/utils/generator');
var anevent = function () {
    var service = this;
    service.users = [];
    service.signup = signup;
    service.cancel = cancel;
    service.getAttendees = getAttendees;
    service.clearAttendees = clearAttendees;

    function signup(user) {
        var isSigned = service.users.filter(function (u) {
                if (user) {
                    return u.id === user.id;
                }
            }) > 0;
        if (!isSigned) {
            service.users.push(user);
            return true;
        } else {
            service.users.pop(user);
            return false;
        }
    }

    function cancel(user) {
        service.users.pop(user);
    }

    function getAttendees() {
        return service.users;
    }

    function clearAttendees() {
        service.users = [];
    }
};

module.exports = anevent;
