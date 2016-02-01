/* jshint -W079 */
var mockData = (function () {
    return {
        getMockStates: getMockStates,
        getMockUsers: getMockUsers,
        getMockEvents: getMockEvents,
        getMockGroups: getMockGroups,
        getFailedMockGroups: getFailedMockGroups,
        getCrashedMockGroups: getCrashedMockGroups,
        getMockSignedEvents: getMockSignedEvents,
        getFailedMockEvents: getFailedMockEvents,
        getCrashedMockEvents: getCrashedMockEvents
    };

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getMockUsers() {
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
            }
        ];
    }

    function getMockEvents() {
        var mockUsers = getMockUsers();
        return {
            events: [
                {
                    id: 1,
                    name: 'Fastelavn',
                    start: '07-02-2016 14:00:00',
                    end: '07-02-2016 16:00:00',
                    signstart: '17-01-2016',
                    signend: '02-02-2016',
                    signoutend: '02-02-2016',
                    location: 'Kantinen',
                    logo: '',
                    decription: 'En festlig dag for børnene.',
                    users: [],
                    activities: []
                },
                {
                    id: 2,
                    name: 'Julefrokost',
                    start: '05-12-2016 12:00:00',
                    end: '05-12-2016 23:59:59',
                    signstart: '17-11-2016',
                    signend: '02-12-2016',
                    signoutend: '02-12-2016',
                    location: 'Kantinen',
                    logo: '',
                    description: 'Så skal der festes',
                    users: [mockUsers[0], mockUsers[1], mockUsers[2]],
                    activities: []
                }
            ],
            status: 'RESPONSE_OK'
        };
    }

    function getMockSignedEvents() {
        var mockUsers = getMockUsers();
        return {
            events: [
                {
                    id: 1,
                    name: 'Fastelavn',
                    start: '07-02-2016 14:00:00',
                    end: '07-02-2016 16:00:00',
                    signstart: '17-01-2016',
                    signend: '02-02-2016',
                    signoutend: '02-02-2016',
                    location: 'Kantinen',
                    logo: '',
                    decription: 'En festlig dag for børnene.',
                    users: [],
                    activities: [mockUsers[1]]
                },
                {
                    id: 2,
                    name: 'Julefrokost',
                    start: '05-12-2016 12:00:00',
                    end: '05-12-2016 23:59:59',
                    signstart: '17-11-2016',
                    signend: '02-12-2016',
                    signoutend: '02-12-2016',
                    location: 'Kantinen',
                    logo: '',
                    description: 'Så skal der festes',
                    users: [mockUsers[1]],
                    activities: []
                }
            ],
            status: 'RESPONSE_OK'
        };
    }

    function getFailedMockEvents() {
        return {
            status: 'RESPONSE_ERROR',
            message: 'Unable to retrieve data from database'
        };
    }

    function getCrashedMockEvents() {
        return {};
    }

    function getMockGroups() {
        return {
            groups: [
                {id: 1, name: 'bibendum imperdiet', type: 'private'},
                {id: 2, name: 'venenatis non', type: 'private'},
                {id: 3, name: 'estibulum sed', type: 'private'},
                {id: 4, name: 'dis parturient', type: 'private'},
                {id: 5, name: 'nec nisi', type: 'public'},
                {id: 6, name: 'semper rutrum', type: 'public'},
                {id: 7, name: 'id', type: 'public'},
                {id: 8, name: 'ultricies', type: 'public'}],
            status: 'RESPONSE_OK'
        }
    }

    function getFailedMockGroups() {
        return {
            status: 'RESPONSE_ERROR',
            message: 'Unable to retrieve data from database'
        };
    }

    function getCrashedMockGroups() {
        return {};
    }

})();
