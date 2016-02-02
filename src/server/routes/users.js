var _ = require('lodash');

var seedData = require('../framework/data/User_mock_data.json');

module.exports = function (app) {
    var _users = seedData;

    app.post('/user', function (req, res) {
        _users.push(req.body);
        res.json({info: 'user created successfully'});
    });

    app.get('/user', function (req, res) {
        res.send(_users);
    });

    app.get('/user/id/:id', function (req, res) {
        res.send(
            _.find(
                _users,
                {id: req.params.id}
            )
        );
    });

    app.put('/user/id/:id', function (req, res) {
        var index = _.findIndex(
            _users,
            {
                id: req.params.id
            }
        );
        _.merge(_users[index], req.body);
        res.json({info: 'group updated successfully'});
    });

    app.delete('/user/id/:id', function (req, res) {
        _.remove(_users, function (user) {
            return user.id === req.params.id;
        });
        res.json({info: 'user removed successfully'});
    });
};

