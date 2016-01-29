var four0four = require('../framework/utils/404')();

module.exports = function () {

    var service = {
        getGroup: getGroup,
        createGroup: createGroup
    };
    return service;

    function getGroup(req, res) {
        var id = +req.param.id;
        //var result = dataService.getGroup(id);
        //if (result) {
        //    res.status(200).send(null);
        //} else {
        four0four.send404(req, res, 'group ' + id + ' not found');
        //}
    }

    function createGroup(req, res) {
        var group = {};
        // todo Create ID utility --> DB Responsibility, does it have to be assigned?
        group.internalId = req.body.internalId;
        group.name = req.body.name;
        group.type = req.body.type;
        //console.log(group);
        //dataService.save(group);
        res.status(200).send(group);
    }
}
;
