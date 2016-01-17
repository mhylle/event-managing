var four0four = require('../framework/utils/404')();

var data = require('../framework/data/data');
var dataService = require('../framework/data/data.service')();
//var event = require('./event')


module.exports = function () {

    var service = {
        getEvents: getEvents,
        getEvent: getEvent,
        createEvent: createEvent,
        deleteEvent: deleteEvent
    };
    return service;

    function getEvents() {
        return [];//dataService.getEvents();
    }

    function getEvent(req, res, next) {
        var id = +req.param.id;
        var result = dataService.getEvent(id);
        if (result) {
            res.status(200).send(result);
        } else {
            four0four.send404(req, res, 'event ' + id + ' not found');
        }
    }

    function createEvent(req, res, next) {
        var event = new Event();

        // todo Create ID utility --> DB Responsibility, does it have to be assigned?
        event.internalId = req.body.internalId;
        event.name = req.body.name;
        event.signend = req.body.signend;
        event.signstart= req.body.signstart;
        event.signoutend= req.body.signoutend;
        event.location= req.body.location;

        console.log(event);
        dataService.save(event);
    }

    function deleteEvent(req, res, next) {

    }
};
