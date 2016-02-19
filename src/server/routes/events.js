var _ = require('lodash');

var seedData = require('../framework/data/Event_mock_data.json');
var userData = require('../framework/data/User_mock_data.json');

module.exports = function (app) {
    var _events = seedData;
    var _users = userData;

    app.post('/event', function (req, res) {
        _events.push(req.body);

        res.json({status: 'ok', info: 'Event created successfully', event: req.body});
    });

    app.get('/event', function (req, res) {
        res.send(_events);
    });

    app.get('/event/id/:id', function (req, res) {
        var eid = parseInt(req.params.id);
        var event = _.find(
            _events, function (event) {
                return event.id === eid;
            }
        );
        console.log('search for event with id ' + req.params.id + ' resulted in this event: ' + event + ' ! ');
        res.send(
            event
        );
    });

    app.put('/event/id/:id', function (req, res) {
        var eid = parseInt(req.params.id);
        var index = _.findIndex(
            _events,
            {
                id: eid
            }
        );
        _.merge(_events[index], req.body);
        res.json({info: 'event updated successfully'});
    });

    app.delete('/event/id/:id', function (req, res) {
        var eid = parseInt(req.params.id);
        _.remove(_events, function (event) {
            return event.id === eid;
        });
        res.json({info: 'event removed successfully'});
    });

    app.get('/event/attend/eid/:eid/uid/:uid', function (req, res) {
        console.log('Trying to signup a user for an event');

        var eid = parseInt(req.params.eid);
        var uid = parseInt(req.params.uid);
        var index = _.findIndex(
            _events,
            function (e) {
                return e.id === eid;
            }
        );
        var dataEvent = _events[index];
        if (!dataEvent) {
            res.json({status: 'failed', info: 'no event found'});
            return;
        }

        var dataUser = _.find(_users, function (u) {
            return u.id === uid;
        });

        if (!dataUser || dataUser === null || dataUser === undefined) {
            res.json({status: 'failed', info: 'user not found'});
            return;
        }

        var users = dataEvent.users;
        if (!users || users === null || users === undefined) {
            dataEvent.users = [dataUser];
        } else {
            users.push(dataUser);
            dataEvent.users = users;
        }
        _.merge(_events[index], dataEvent);
        var result = {status: 'ok', event: dataEvent};
        res.json(result);
    });
};

