//var utils = require('../utils/generator');
//var moment = require('moment');
//var eventdef = require('../../events/event');
var eventdb = [];

var userdata = require('./User_mock_data');
var eventdata = require('./Event_mock_data');
var groupdata = require('./Group_mock_data');

var data = function () {
    initializeEvents();

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

    service.updateEvent = function (event) {
        var eid = event.id;
        var counter = 0;

        for (var i = 0; i < eventdb.length; i++) {
            var evt = eventdb[i];
            if (evt.id === eid) {
                break;
            }
            counter++;
        }
        eventdb[counter] = event;
    };
};

module.exports = data;

function getUsers() {
    return userdata;
    //return [
    //    {
    //        'id': 1,
    //        'firstname': 'Ted',
    //        'lastname': 'Tedson',
    //        'username': 'tte',
    //        'passtring': 'tte',
    //        'address': 'Someroad 1234, 576923 NA, Illinois, USA',
    //        'mail': 'ted@something.com',
    //        'phone': '22446677',
    //        'logicalId': '2020147'
    //    },
    //    {
    //        'id': 2,
    //        'firstname': 'Martin',
    //        'lastname': 'Hylleberg',
    //        'username': 'mah',
    //        'passtring': 'mah',
    //        'address': 'Tousvej 6a, 8230 Åbyhøj, Danmark',
    //        'mail': 'mhylle@gmail.com',
    //        'phone': '61791394',
    //        'logicalId': '2020743'
    //    },
    //    {
    //        'id': 3,
    //        'firstname': 'Zed',
    //        'lastname': 'Zedson',
    //        'username': 'zze',
    //        'passtring': 'zze',
    //        'address': '',
    //        'mail': 'zed@something.com',
    //        'phone': '54461564',
    //        'logicalId': '2020149'
    //    },
    //    {
    //        'id': 4,
    //        'firstname': 'Tina',
    //        'lastname': 'Tinason',
    //        'username': 'tti',
    //        'passtring': 'tti',
    //        'address': '',
    //        'mail': 'tina@something.com',
    //        'phone': '16761311',
    //        'logicalId': '20201a7'
    //    }, {
    //        'id': 5,
    //        'firstname': 'Tina',
    //        'lastname': 'Tinason',
    //        'username': 'tti',
    //        'passtring': 'tti',
    //        'address': '',
    //        'mail': 'tina@something.com',
    //        'phone': '16761311',
    //        'logicalId': '20201a7'
    //    }, {
    //        'id': 6,
    //        'firstname': 'Tina',
    //        'lastname': 'Tinason',
    //        'username': 'tti',
    //        'passtring': 'tti',
    //        'address': '',
    //        'mail': 'tina@something.com',
    //        'phone': '16761311',
    //        'logicalId': '20201a7'
    //    }, {
    //        'id': 7,
    //        'firstname': 'Tina',
    //        'lastname': 'Tinason',
    //        'username': 'tti',
    //        'passtring': 'tti',
    //        'address': '',
    //        'mail': 'tina@something.com',
    //        'phone': '16761311',
    //        'logicalId': '20201a7'
    //    }
    //];
}
function getGroups() {
    return groupdata;
    //return [{
    //    'id': 1,
    //    'name': 'default',
    //    'type': 'open'
    //}, {
    //    'id': 2,
    //    'name': 'Example Closed Group',
    //    'type': 'open'
    //}
    //];
}

function initializeEvents() {
    //var users = getUsers();

    //function createEvent1() {
    //    var evt1 = eventdef.create();
    //    evt1.id = 1;
    //    evt1.name = 'Fastelavn';
    //    evt1.start = moment('07-02-2016 14:00:00', 'DD-MM-YYYY HH:mm');
    //    evt1.end = moment('07-02-2016 16:00:00', 'DD-MM-YYYY HH:mm');
    //    evt1.signstart = moment('17-01-2016', 'DD-MM-YYYY');
    //    evt1.signend = moment('02-02-2016', 'DD-MM-YYYY');
    //    evt1.signoutend = moment('02-02-2016', 'DD-MM-YYYY');
    //    evt1.location = 'Kantinen';
    //    evt1.logo = '';
    //    evt1.decription = 'En festlig dag for børnene.';
    //    evt1.users = [users[1], users[2]];
    //    evt1.activities = [];
    //
    //    eventdb.push(evt1);
    //}
    //
    //createEvent1();
    //function createEvent2() {
    //    var evt2 = eventdef.create();
    //    evt2.id = 2;
    //    evt2.name = 'Julefrokost';
    //    evt2.start = moment('05-12-2016 12:00:00', 'DD-MM-YYYY HH:mm');
    //    evt2.end = moment('05-12-2016 23:59:59', 'DD-MM-YYYY HH:mm');
    //    evt2.signstart = moment('17-11-2016', 'DD-MM-YYYY');
    //    evt2.signend = moment('02-12-2016', 'DD-MM-YYYY');
    //    evt2.signoutend = moment('02-12-2016', 'DD-MM-YYYY');
    //    evt2.location = 'Kantinen';
    //    evt2.logo = '';
    //    evt2.description = 'Så skal der festes';
    //    evt2.users = [users[1], users[2], users[3]];
    //    evt2.activities = [];
    //
    //    eventdb.push(evt2);
    //}
    //
    //createEvent2();
    //
    //function createEvent3() {
    //    var evt3 = eventdef.create();
    //    evt3.id = 3;
    //    evt3.name = 'Sensommerfest';
    //    evt3.start = moment('22-09-2016 18:00:00', 'DD-MM-YYYY HH:mm');
    //    evt3.end = moment('23-09-2016 02:00:00', 'DD-MM-YYYY HH:mm');
    //    evt3.signstart = moment('01-09-2016', 'DD-MM-YYYY');
    //    evt3.signend = moment('15-09-2016', 'DD-MM-YYYY');
    //    evt3.signoutend = moment('16-09-2016', 'DD-MM-YYYY');
    //    evt3.location = 'Varna';
    //    evt3.logo = '';
    //    evt3.description = 'Så skal der festes';
    //    evt3.users = [users[4], users[5]];
    //    evt3.activities = [];
    //
    //    eventdb.push(evt3);
    //}
    //
    //createEvent3();
    eventdb = eventdata;
    return eventdb;
}

function getEvents() {
    return eventdb;
}
