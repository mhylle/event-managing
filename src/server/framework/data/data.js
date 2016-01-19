var utils = require('../utils/generator');

var data = function() {
    var service = this;
    service.events = function() {
        return getEvents();
    };

    service.users = function() {
        return getUsers();
    };

    service.groups = function() {
        return getGroups();
    };
};

module.exports = data;


function getUsers() {
    return [
        {
            'id': 1,
            'firstname': 'Ted',
            'lastname': 'Tedson',
            'username': 'tte',
            'passtring': 'tte',
            'address': 'Someroad 1234, 576923 NA, Illinois, USA',
            'mail': 'ted@something.com',
            'phone': '22446677',
            'logicalId': '2020147'
        },
        {
            'id': 2,
            'firstname': 'Martin',
            'lastname': 'Hylleberg',
            'username': 'mah',
            'passtring': 'mah',
            'address': 'Tousvej 6a, 8230 Åbyhøj, Danmark',
            'mail': 'mhylle@gmail.com',
            'phone': '61791394',
            'logicalId': '2020743'
        },
        {
            'id': 3,
            'firstname': 'Zed',
            'lastname': 'Zedson',
            'username': 'zze',
            'passtring': 'zze',
            'address': '',
            'mail': 'zed@something.com',
            'phone': '54461564',
            'logicalId': '2020149'
        },
        {
            'id': 4,
            'firstname': 'Tina',
            'lastname': 'Tinason',
            'username': 'tti',
            'passtring': 'tti',
            'address': '',
            'mail': 'tina@something.com',
            'phone': '16761311',
            'logicalId': '20201a7'
        }, {
            'id': 5,
            'firstname': 'Tina',
            'lastname': 'Tinason',
            'username': 'tti',
            'passtring': 'tti',
            'address': '',
            'mail': 'tina@something.com',
            'phone': '16761311',
            'logicalId': '20201a7'
        }, {
            'id': 6,
            'firstname': 'Tina',
            'lastname': 'Tinason',
            'username': 'tti',
            'passtring': 'tti',
            'address': '',
            'mail': 'tina@something.com',
            'phone': '16761311',
            'logicalId': '20201a7'
        }, {
            'id': 7,
            'firstname': 'Tina',
            'lastname': 'Tinason',
            'username': 'tti',
            'passtring': 'tti',
            'address': '',
            'mail': 'tina@something.com',
            'phone': '16761311',
            'logicalId': '20201a7'
        }
    ];
}
function getGroups() {
    return [{
        'id': 1,
        'name': 'default',
        'type': 'open'
    }, {
        'id': 2,
        'name': 'Example Closed Group',
        'type': 'open'
    }
    ];
}

function getEvents() {
    return [
        {
        'id': 1,
        'name': 'Fastelavn',
        internalId: utils.uniqueID,
        signstart: new Date(),
        signend: new Date(),
        signoutend: new Date(),
        location: 'Kantinen',
        users: []
    },
        {
        'id': 2,
        'name': 'Julefrokost',
        internalId: utils.uniqueID,
        signstart: new Date(),
        signend: new Date(),
        signoutend: new Date(),
        location: 'Kantinen',
        users: []
    }
    ];
}
