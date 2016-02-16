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
        var uid = parseInt(req.params.id);
        res.send(
            _.find(
                _users,
                {id: uid}
            )
        );
    });

    app.put('/user/id/:id', function (req, res) {
        var uid = parseInt(req.params.id);
        var index = _.findIndex(
            _users,
            {
                id: uid
            }
        );
        _.merge(_users[index], req.body);
        res.json({info: 'group updated successfully'});
    });

    app.delete('/user/id/:id', function (req, res) {
        var uid = parseInt(req.params.id);
        _.remove(_users, function (user) {
            return user.id === uid;
        });
        res.json({info: 'user removed successfully'});
    });
};

