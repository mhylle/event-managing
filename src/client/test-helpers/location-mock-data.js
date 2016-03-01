/* jshint -W079, -W101 */
var locationMockData = (function () {

    return {
        getMockLocations: getMockLocations,
        getMockEmptyLocations: getMockEmptyLocations,
        getMockCrashedLocations: getMockCrashedLocations,
        getMockLocation: getMockLocation,
        getMockFailedLocation: getMockFailedLocation,
        getMockFailedLocations: getMockFailedLocations
    };

    function getMockLocation() {
        return {
            status: 'ok',
            info: '',
            location: {
                'id': 1,
                'mongoId': {
                    '$oid': '56b352014d6f6379f86e0f00'
                },
                'name': 'Locale D',
                'contactinformation': {
                    'phone': '81-(672)330-2845',
                    'address': '47733 Sunnyside Pass'
                }
            }
        };
    }

    function getMockLocations() {
        // jscs:disable

        var locations = [
            {
                'id': 1,
                'mongoId': {
                    '$oid': '56b352014d6f6379f86e0f00'
                },
                'name': 'Locale D',
                'contactinformation': {
                    'phone': '81-(672)330-2845',
                    'address': '47733 Sunnyside Pass'
                }
            },
            {
                'id': 2,
                'mongoId': {
                    '$oid': '56b352014d6f6379f86f0f00'
                },
                'name': 'The Lawn',
                'contactinformation': {
                    'phone': '62-(354)984-1259',
                    'address': '696 Lyons Pass'
                }
            },
            {
                'id': 3,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8700f00'
                },
                'name': 'Locale C',
                'contactinformation': {
                    'phone': '86-(620)816-3305',
                    'address': '24627 Barnett Court'
                }
            },
            {
                'id': 4,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8710f00'
                },
                'name': 'Restaurant Varna',
                'contactinformation': {
                    'phone': '351-(947)973-2490',
                    'address': '8140 Dexter Street'
                }
            },
            {
                'id': 5,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8720f00'
                },
                'name': 'Locale A',
                'contactinformation': {
                    'phone': '62-(379)251-4559',
                    'address': '19330 Browning Trail'
                }
            },
            {
                'id': 6,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8730f00'
                },
                'name': 'Locale B',
                'contactinformation': {
                    'phone': '62-(664)956-7876',
                    'address': '48 Graedel Plaza'
                }
            },
            {
                'id': 7,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8740f00'
                },
                'name': 'Locale A',
                'contactinformation': {
                    'phone': '33-(460)696-4506',
                    'address': '2 Pankratz Place'
                }
            },
            {
                'id': 8,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8750f00'
                },
                'name': 'The Lawn',
                'contactinformation': {
                    'phone': '63-(633)113-3914',
                    'address': '61 Valley Edge Alley'
                }
            },
            {
                'id': 9,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8760f00'
                },
                'name': 'Locale B',
                'contactinformation': {
                    'phone': '86-(174)835-1560',
                    'address': '3287 Schlimgen Street'
                }
            },
            {
                'id': 10,
                'mongoId': {
                    '$oid': '56b352014d6f6379f8770f00'
                },
                'name': 'The Lawn',
                'contactinformation': {
                    'phone': '86-(941)571-8034',
                    'address': '03 International Road'
                }
            }
        ];
        return {
            status: 'ok',
            info: '',
            locations: locations
        };
    }

    function getMockCrashedLocations() {
        return undefined;
    }

    function getMockFailedLocations() {
        return {
            status: 'failed',
            info: 'An unexpected error occurred'
        };
    }
    function getMockFailedLocation() {
        return {
            status: 'failed',
            info: 'An unexpected error occurred'
        };
    }

    function getMockEmptyLocations() {
        return {
            status: 'ok',
            info: '',
            locations: []
        };
    }
})();
