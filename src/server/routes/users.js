var _ = require('lodash');
var security = require('../framework/security/security.service')();
var seedData = require('../framework/data/User_mock_data.json');

module.exports = function (app) {
    var _users = seedData;

    app.post('/user', security.requiresAuthentication, function (req, res) {
        _users.push(req.body);
        res.json({status: 'ok', info: 'user created successfully', user: req.body});
    });

    app.get('/user', security.requiresAuthentication, function (req, res) {
        res.json({status: 'ok', info: '', users: _users});
    });

    app.get('/user/id/:id', security.requiresAuthentication, function (req, res) {
        var uid = parseInt(req.params.id);
        res.json({
                status: 'ok', info: '', users: _.find(
                _users,
                {id: uid}
                )
            }
        );
    });

    app.put('/user/id/:id', security.requiresAuthentication, function (req, res) {
        var uid = parseInt(req.params.id);
        var index = _.findIndex(
            _users,
            {
                id: uid
            }
        );
        _.merge(_users[index], req.body);
        res.json({status: 'ok', info: 'group updated successfully', group: req.body});
    });

    app.delete('/user/id/:id', security.requiresAuthentication, function (req, res) {
        var uid = parseInt(req.params.id);
        _.remove(_users, function (user) {
            return user.id === uid;
        });
        res.json({status: 'ok', info: 'user removed successfully'});
    });
};

