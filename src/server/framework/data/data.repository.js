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
};

module.exports = dataRepository;
//var getEvents = function() {
//    return data.getEvents();
//};
//
//module.exports = getEvents;
//
//module.exports = function () {
//
//    var service = {
//        add: add,
//        get: get,
//        remove: remove
//    };
//    return service;
//    function add(element) {
//        data.push(element);
//    }
//
//    function remove(element) {
//        data.remove(element);
//    }
//
//    function get() {
//        if (data.length > 0) {
//            return data;
//        } else {
//            return seededData;
//        }
//    }
//
//    function getGroup(id) {
//        var groups = data.getGroups();
//        return groups.filter(function (p) {
//            return p.id === id;
//        })[0];
//    }
//};
