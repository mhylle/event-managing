// var _ = require('lodash');
//
// var groupData = require('../framework/data/Group_mock_data.json');
// var userData = require('../framework/data/User_mock_data.json');
//
// module.exports = function (app) {
//     var _groups = groupData;
//     var _users = userData;
//
//     app.post('/group', function (req, res) {
//         _groups.push(req.body);
//         res.json({status: 'ok', info: 'group created successfully', group: req.body});
//     });
//
//     app.get('/group', function (req, res) {
//         res.json({status: 'ok', info: '', groups: _groups});
//     });
//
//     app.get('/group/id/:id', function (req, res) {
//         var gid = parseInt(req.params.id);
//         var result = _.find(
//             _groups, function (g) {
//                 return g.id === gid;
//             });
//         res.json({status: 'ok', info: '', group: result}
//         );
//     });
//
//     app.put('/group/id/:id', function (req, res) {
//         var gid = parseInt(req.params.id);
//         var index = _.findIndex(
//             _groups,
//             {
//                 id: gid
//             }
//         );
//         _.merge(_groups[index], req.body);
//         res.json({status: 'ok', info: 'group updated successfully', group: req.body});
//     });
//
//     app.put('/group/id/:id/users', function (req, res) {
//         var gid = parseInt(req.params.id);
//         var index = _.findIndex(
//             _groups,
//             {
//                 id: gid
//             }
//         );
//         var group = _groups[index];
//         var users = req.body;
//         group.users = _.union(group.users, users);
//         _.merge(_groups[index], group.users);
//         res.json({status: 'ok', info: 'group updated successfully', group: group});
//     });
//
//     app.put('/group/id/:gid/user/id/:uid', function (req, res) {
//         var gid = parseInt(req.params.gid);
//         var uid = parseInt(req.params.uid);
//         var index = _.findIndex(
//             _groups,
//             function (g) {
//                 return g.id === gid;
//             }
//         );
//         if (index === -1) {
//             res.json({status: 'failed', info: 'no group found'});
//             return;
//         }
//
//         var dataGroup = _groups[index];
//
//         var dataUser = _.find(_users, function (u) {
//             return u.id === uid;
//         });
//
//         if (!dataUser || dataUser === null || dataUser === undefined) {
//             res.json({status: 'failed', info: 'user not found'});
//             return;
//         }
//
//         var users = dataGroup.users;
//         if (!users || users === null || users === undefined) {
//             dataGroup.users = [dataUser];
//         } else {
//             users.push(dataUser);
//             dataGroup.users = users;
//         }
//         _.merge(_groups[index], dataGroup);
//         var result = {status: 'ok', group: dataGroup};
//         res.json(result);
//     });
//
//     app.delete('/group/id/:gid/user/id/:uid', function (req, res) {
//         var gid = parseInt(req.params.gid);
//         var uid = parseInt(req.params.uid);
//         var index = _.findIndex(
//             _groups,
//             function (g) {
//                 return g.id === gid;
//             }
//         );
//         var dataGroup = _groups[index];
//         if (!dataGroup) {
//             res.json({status: 'failed', info: 'no group found'});
//             return;
//         }
//
//         var users = dataGroup.users;
//         if (!(!users || users === null || users === undefined)) {
//             _.remove(dataGroup.users, function (user) {
//                 return user.id === uid;
//             });
//         }
//         _.merge(_groups[index], dataGroup);
//         var result = {status: 'ok', group: dataGroup};
//         res.json(result);
//     });
//
//     app.delete('/group/id/:id', function (req, res) {
//         var gid = parseInt(req.params.id);
//         _.remove(_groups, function (group) {
//             return group.id === gid;
//         });
//         res.json({info: 'group removed successfully'});
//     });
// };
