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
                id: 1,
                gender: 'Male',
                firstname: 'Brandon',
                lastname: 'Morales',
                username: 'bmorales0',
                email: 'bmorales0@e-recht24.de',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '381-(499)311-9438',
                logicalid: '51ef4033-990c-4ecf-8e50-34adfd464f5e'
            },
            {
                id: 2,
                gender: 'Male',
                firstname: 'Martin',
                lastname: 'King',
                username: 'mking1',
                email: 'mking1@prnewswire.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '351-(660)862-6546',
                logicalid: '7660ea97-d791-434e-8e71-7ce2ee672b9f'
            },
            {
                id: 3,
                gender: 'Male',
                firstname: 'Patrick',
                lastname: 'Patterson',
                username: 'ppatterson2',
                email: 'ppatterson2@statcounter.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '420-(863)322-2551',
                logicalid: 'ff6ac4e4-cc70-4891-a0da-914768fe21b0'
            },
            {
                id: 4,
                gender: 'Female',
                firstname: 'Susan',
                lastname: 'Jordan',
                username: 'sjordan3',
                email: 'sjordan3@paypal.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '7-(329)184-8731',
                logicalid: '19924d23-6a5d-481d-b200-d49a84dfddde'
            },
            {
                id: 5,
                gender: 'Male',
                firstname: 'Joe',
                lastname: 'Little',
                username: 'jlittle4',
                email: 'jlittle4@va.gov',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(388)973-5323',
                logicalid: '81232be7-10a3-4bcd-95db-fe267f030e5f'
            },
            {
                id: 6,
                gender: 'Female',
                firstname: 'Joyce',
                lastname: 'Gonzalez',
                username: 'jgonzalez5',
                email: 'jgonzalez5@phpbb.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '30-(143)545-3419',
                logicalid: '23a9181f-d826-4528-9835-5f012e4051da'
            },
            {
                id: 7,
                gender: 'Female',
                firstname: 'Lillian',
                lastname: 'Nichols',
                username: 'lnichols6',
                email: 'lnichols6@nationalgeographic.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '46-(653)443-2241',
                logicalid: 'ff57f78c-9a14-4943-b860-dbd5ab0df321'
            },
            {
                id: 8,
                gender: 'Male',
                firstname: 'Earl',
                lastname: 'Perkins',
                username: 'eperkins7',
                email: 'eperkins7@google.es',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '63-(235)939-1038',
                logicalid: 'b300896f-e49d-4406-982d-0dcc5d4cd22d'
            },
            {
                id: 9,
                gender: 'Male',
                firstname: 'Ronald',
                lastname: 'Howell',
                username: 'rhowell8',
                email: 'rhowell8@springer.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(613)492-9066',
                logicalid: '52f63a15-e5e9-49f6-96e4-ba1ae8bbc7f9'
            },
            {
                id: 10,
                gender: 'Female',
                firstname: 'Deborah',
                lastname: 'Davis',
                username: 'ddavis9',
                email: 'ddavis9@shareasale.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '62-(254)596-0255',
                logicalid: '0e3f555c-6ada-4bbe-a834-82c13be2fa78'
            },
            {
                id: 11,
                gender: 'Female',
                firstname: 'Emily',
                lastname: 'Ramos',
                username: 'eramosa',
                email: 'eramosa@telegraph.co.uk',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '1-(585)729-6881',
                logicalid: '5ff030e7-3631-4492-a2bf-ee59ab93f068'
            },
            {
                id: 12,
                gender: 'Female',
                firstname: 'Rebecca',
                lastname: 'Kelley',
                username: 'rkelleyb',
                email: 'rkelleyb@yandex.ru',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '370-(130)357-5490',
                logicalid: '486cd99c-abaa-402d-b29e-3d5fa54ea322'
            },
            {
                id: 13,
                gender: 'Female',
                firstname: 'Annie',
                lastname: 'Lawson',
                username: 'alawsonc',
                email: 'alawsonc@princeton.edu',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '55-(200)642-2194',
                logicalid: '0a7bb3a1-29de-4d2d-8ecb-b45fbc2955c4'
            },
            {
                id: 14,
                gender: 'Male',
                firstname: 'Joe',
                lastname: 'Medina',
                username: 'jmedinad',
                email: 'jmedinad@github.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '66-(465)446-7420',
                logicalid: 'f2282d87-6d79-407d-b9a1-54a530bc11fd'
            },
            {
                id: 15,
                gender: 'Female',
                firstname: 'Theresa',
                lastname: 'King',
                username: 'tkinge',
                email: 'tkinge@amazonaws.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '98-(562)880-6339',
                logicalid: 'b667a18b-5ea0-4862-af86-345a7914923e'
            },
            {
                id: 16,
                gender: 'Female',
                firstname: 'Virginia',
                lastname: 'James',
                username: 'vjamesf',
                email: 'vjamesf@mit.edu',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '420-(863)758-8561',
                logicalid: 'bc7f69d8-09a1-46fe-9001-3c8d87521b5b'
            },
            {
                id: 17,
                gender: 'Male',
                firstname: 'Samuel',
                lastname: 'Tucker',
                username: 'stuckerg',
                email: 'stuckerg@devhub.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(778)324-1449',
                logicalid: '3001e7cd-76df-4f41-bffa-b83da8ff6039'
            },
            {
                id: 18,
                gender: 'Male',
                firstname: 'Juan',
                lastname: 'Cruz',
                username: 'jcruzh',
                email: 'jcruzh@alibaba.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '56-(512)400-4872',
                logicalid: '6642734d-3ed8-4edd-a057-b6775e0350ce'
            },
            {
                id: 19,
                gender: 'Female',
                firstname: 'Kathy',
                lastname: 'Little',
                username: 'klittlei',
                email: 'klittlei@miitbeian.gov.cn',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(886)197-2796',
                logicalid: '954cc1ad-0036-45af-88f4-f7270342cc30'
            },
            {
                id: 20,
                gender: 'Male',
                firstname: 'Brandon',
                lastname: 'Carpenter',
                username: 'bcarpenterj',
                email: 'bcarpenterj@tinyurl.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '420-(934)772-9127',
                logicalid: '6236a410-594a-4975-a0e7-5a5e3646842b'
            }
        ];
    }

    function getMockEvents() {
        var mockUsers = getMockUsers();
        var events = [
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
        ];

        return events;
    }

    function getMockSignedEvents() {
        var mockUsers = getMockUsers();
        return [
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
                users: [mockUsers[0], mockUsers[1]],
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
                users: [mockUsers[1]],
                activities: []
            }
        ];
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
        return [
            {id: 5, name: 'Public Standard Group', type: 'public'},
            {id: 1, name: 'Private Standard Group', type: 'private'},
            {id: 2, name: 'Unknown Group Type'},
            {id: 2, name: 'venenatis non', type: 'private'},
            {id: 3, name: 'estibulum sed', type: 'private'},
            {id: 4, name: 'dis parturient', type: 'private'},
            {id: 6, name: 'semper rutrum', type: 'public'},
            {id: 7, name: 'id', type: 'public'},
            {id: 8, name: 'ultricies', type: 'public'}];
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
