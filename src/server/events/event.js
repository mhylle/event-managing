var utils = require('../framework/utils/generator');

exports.create = function () {
    // structure of an event.
    var event = {
        id: null,
        name: null,
        internalId: utils.uniqueID,
        start: null,
        end: null,
        signstart: null,
        signend: null,
        signoutend: null,
        location: null,
        logo: null,
        decription: null,
        users: [],
        activities: []
    };
    return event;
};
