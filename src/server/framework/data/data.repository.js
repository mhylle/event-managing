/**
 * Created by mhylle on 21-11-2015.
 */

var Data = require('./data');

var dataRepository = function() {
    var service = this;
    var dataInstance = new Data();
    service.getEvents = function() {
        return dataInstance.events();
    };
    service.getUsers = function() {
        return dataInstance.users();
    };
    service.getGroups = function() {
        return dataInstance.groups();
    };
    service.updateEvent = function(event) {
        dataInstance.updateEvent(event);
    };
};

module.exports = dataRepository;
