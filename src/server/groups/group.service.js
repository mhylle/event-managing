var four0four = require('../framework/utils/404')();
var dataService = require('../framework/data/data.service')();

module.exports = function () {

    var service = {
        getGroups: getGroups,
        getGroup: getGroup,
        createGroup: createGroup
    };
    return service;

    function getGroups() {
        return dataService.getGroups();
    }

    function getGroup(req, res) {
        var id = +req.param.id;
        var result = dataService.getGroup(id);
        if (result) {
            res.status(200).send(result);
        } else {
            four0four.send404(req, res, 'group ' + id + ' not found');
        }
    }

    function createGroup(req, res) {
        var group = {};
        // todo Create ID utility --> DB Responsibility, does it have to be assigned?
        group.internalId = req.body.internalId;
        group.name = req.body.name;
        group.type = req.body.type;
        //console.log(group);
        dataService.save(group);
        res.status(200).send(group);
    }
};
