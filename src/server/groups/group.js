/**
 * Created by mhylle on 29-11-2015.
 */
var utils = require('../framework/utils/generator');
module.exports = function () {
    var group = {

        addUser: addUser,
        removeUser: removeUser,
        getUsers: getUsers,
        clearUsers: clearUsers,

        id: '',
        internalId: utils.uniqueID(),
        name: '',
        type: open,
        users: []
    };

    function addUser(user) {
        users.push(user);
    }

    function removeUser(user) {
        users.pop(user);
    }

    function getUsers() {
        return users;
    }
    function clearUsers() {
        users = [];
    }

    return group;
};
