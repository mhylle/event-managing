// var _ = require('lodash');
//
// var locationData = require('../framework/data/Locations_mock_data.json');
//
// module.exports = function (app) {
//     var _locations = locationData;
//
//     app.post('/location', function (req, res) {
//         _locations.push(req.body);
//         res.json({info: 'lcoation created successfully'});
//     });
//
//     app.get('/location', function (req, res) {
//         res.send(_locations);
//     });
//
//     app.get('/location/id/:id', function (req, res) {
//         var lid = parseInt(req.params.id);
//         var result = _.find(
//             _locations, function (l) {
//                 return l.id === lid;
//             });
//         res.send(
//             result
//         );
//     });
//
//     app.put('/location/id/:id', function (req, res) {
//         var lid = parseInt(req.params.id);
//         var index = _.findIndex(
//             _locations,
//             {
//                 id: lid
//             }
//         );
//         _.merge(_locations[index], req.body);
//         res.json({info: 'location updated successfully'});
//     });
//
//     app.delete('/location/id/:id', function (req, res) {
//         var lid = parseInt(req.params.id);
//         _.remove(_locations, function (l) {
//             return l.id === lid;
//         });
//         res.json({info: 'location removed successfully'});
//     });
// };
