/**
 * Created by mhylle on 21-11-2015.
 */

var Data = require('./data');

var dataRepository = function() {
    var service = this;
    var dataInstance = new Data();
    service.getEvents = function() {
        var events = dataInstance.events();
        return events;
    };
    service.getUsers = function() {
        var users = dataInstance.users();
        return users;
    };
    service.updateEvent = function(event) {
        dataInstance.updateEvent(event);
    };
};

module.exports = dataRepository;
