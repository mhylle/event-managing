var _ = require('lodash');

var groupData = require('../framework/data/Group_mock_data.json');
var userData = require('../framework/data/User_mock_data.json');

module.exports = function (app) {
    var _groups = groupData;
    var _users = userData;

    app.post('/group', function (req, res) {
        _groups.push(req.body);
        res.json({info: 'group created successfully'});
    });

    app.get('/group', function (req, res) {
        res.send(_groups);
    });

    app.get('/group/id/:id', function (req, res) {
        var result = _.find(
            _groups, function (g) {
                return g.id === parseInt(req.params.id);
            });
        res.send(
            result
        );
    });

    app.put('/group/id/:id', function (req, res) {
        var index = _.findIndex(
            _groups,
            {
                id: req.params.id
            }
        );
        _.merge(_groups[index], req.body);
        res.json({info: 'group updated successfully'});
    });

    app.put('/group/id/:id/users', function (req, res) {
        var index = _.findIndex(
            _groups,
            {
                id: parseInt(req.params.id)
            }
        );
        var group = _groups[index];
        var users = req.body;
        group.users = _.union(group.users, users);
        _.merge(_groups[index], group.users);
        res.json({info: 'group updated successfully'});
    });

    app.put('/group/id/:gid/user/id/:uid', function (req, res) {
        var gid = req.params.gid;
        var uid = req.params.uid;
        var index = _.findIndex(
            _groups,
            function (g) {
                return g.id === parseInt(gid);
            }
        );
        var dataGroup = _groups[index];
        if (!dataGroup) {
            res.json({status: 'failed', info: 'no group found'});
            return;
        }

        var dataUser = _.find(_users, function (u) {
            return u.id === parseInt(uid);
        });

        if (!dataUser || dataUser === null || dataUser === undefined) {
            res.json({status: 'failed', info: 'user not found'});
            return;
        }

        var users = dataGroup.users;
        if (!users || users === null || users === undefined) {
            dataGroup.users = [dataUser];
        } else {
            users.push(dataUser);
            dataGroup.users = users;
        }
        _.merge(_groups[index], dataGroup);
        var result = {status: 'ok', group: dataGroup};
        res.json(result);
    });

    app.delete('/group/id/:gid/user/id/:uid', function (req, res) {
        var gid = req.params.gid;
        var uid = req.params.uid;
        var index = _.findIndex(
            _groups,
            function (g) {
                return g.id === parseInt(gid);
            }
        );
        var dataGroup = _groups[index];
        if (!dataGroup) {
            res.json({status: 'failed', info: 'no group found'});
            return;
        }

        var users = dataGroup.users;
        if (!(!users || users === null || users === undefined)) {
            _.remove(dataGroup.users, function (user) {
                return user.id === parseInt(uid);
            });
        }
        _.merge(_groups[index], dataGroup);
        var result = {status: 'ok', group: dataGroup};
        res.json(result);
    });

    app.delete('/group/id/:id', function (req, res) {
        _.remove(_groups, function (group) {
            return group.id === req.params.id;
        });
        res.json({info: 'group removed successfully'});
    });
}
;

