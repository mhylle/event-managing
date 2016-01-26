var utils = require('../utils/generator');
var moment = require('moment');

var data = function () {
    var service = this;
    service.events = function () {
        return getEvents();
    };

    service.users = function () {
        return getUsers();
    };

    service.groups = function () {
        return getGroups();
    };

    service.updateEvent = function(event) {
        var eid = event.id;
        var counter = 0;
        var events = getEvents();
        for (var i = 0; i < events.length; i++) {
            var evt = events[i];
            if (evt.id === eid) {
                break;
            }
            counter++;
        }
        getEvents()[i] = event;
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
    var users = getUsers();
    return [
        {
            id: 1,
            name: 'Fastelavn',
            internalId: utils.uniqueID,
            start: moment('07-02-2016 14:00:00', 'DD-MM-YYYY HH:mm'),
            end: moment('07-02-2016 16:00:00', 'DD-MM-YYYY HH:mm'),
            signstart: moment('17-01-2016', 'DD-MM-YYYY'),
            signend: moment('02-02-2016', 'DD-MM-YYYY'),
            signoutend: moment('02-02-2016', 'DD-MM-YYYY'),
            location: 'Kantinen',
            logo: '',
            decription: 'En festlig dag for børnene.',
            users: [users[1], users[2]],
            activities: []
        },
        {
            id: 2,
            name: 'Julefrokost',
            internalId: utils.uniqueID,
            start: moment('05-12-2016 12:00:00', 'DD-MM-YYYY HH:mm'),
            end: moment('05-12-2016 23:59:59', 'DD-MM-YYYY HH:mm'),
            signstart: moment('17-11-2016', 'DD-MM-YYYY'),
            signend: moment('02-12-2016', 'DD-MM-YYYY'),
            signoutend: moment('02-12-2016', 'DD-MM-YYYY'),
            location: 'Kantinen',
            logo: '',
            description: 'Så skal der festes',
            users: [users[1], users[2], users[3]],
            activities: []
        },
        {
            id: 3,
            name: 'Sensommerfest',
            internalId: utils.uniqueID,
            start: moment('22-09-2016 18:00:00', 'DD-MM-YYYY HH:mm'),
            end: moment('23-09-2016 02:00:00', 'DD-MM-YYYY HH:mm'),
            signstart: moment('01-09-2016', 'DD-MM-YYYY'),
            signend: moment('15-09-2016', 'DD-MM-YYYY'),
            signoutend: moment('16-09-2016', 'DD-MM-YYYY'),
            location: 'Varna',
            logo: '',
            description: 'Så skal der festes',
            users: [users[4], users[5]],
            activities: []
        }
    ];
}
