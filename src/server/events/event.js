/**
 * Created by mhylle on 29-11-2015.
 */
var utils = require('../framework/utils/generator');
module.exports = function () {
    var event = {

        signup: signup,
        cancel: cancel,
        getAttendees: getAttendees,
        clearAttendees: clearAttendees,

        id: '',
        internalId: utils.uniqueID(),
        name: '',
        signstart: new Date(),
        signend: new Date(),
        signoutend: new Date(),
        location: '',
        users: []
    };

    function signup(user) {
        event.users.push(user);
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

    return event;
};
