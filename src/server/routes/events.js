var _ = require('lodash');

var seedData = require('../framework/data/Event_mock_data.json');

module.exports = function (app) {
    var _events = seedData;

    app.post('/event', function (req, res) {
        _events.push(req.body);
        res.json({info: 'event created successfully'});
    });

    app.get('/event', function (req, res) {
        res.send(_events);
    });

    app.get('/event/id/:id', function (req, res) {
        var event = _.find(
            _events, function (event) {
                return event.id === req.params.id;
            }
        );
        console.log('search for event with id ' + req.params.id + ' resulted in this event: ' + event + ' ! ');
        res.send(
            event
        );
    });

    app.put('/event/id/:id', function (req, res) {
        var index = _.findIndex(
            _events,
            {
                id: req.params.id
            }
        );
        _.merge(_events[index], req.body);
        res.json({info: 'event updated successfully'});
    });

    app.delete('/event/id/:id', function (req, res) {
        _.remove(_events, function (event) {
            return event.id === req.params.id;
        });
        res.json({info: 'event removed successfully'});
    });

    app.get('/event/attend/eid/:eid/uid/:uid', function (req, res) {
        console.log('Trying to signup a user for an event');

        //var users = dataRepositoryInstance.getUsers();

        //var event = _.find(events, {id: req.params.eid});
        //var user = _.find(users, {id: req.params.uid});

        res.json({info: 'attend is not implemented yet.'});
    });
};

