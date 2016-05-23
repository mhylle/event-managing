angular
    .module('event-managing-locations', [
        'ui.router',
        'ngAnimate',
        'event-managing-logger',
        'event-managing-security'
    ])
    .constant('locationServer', {
        url: 'http://localhost',
        port: 3000,
        location: 'locations'
    })
    .config(['$stateProvider', configuration])
    .run(function() {

    });

function configuration($stateProvider) {
    $stateProvider
        .state('locations', {
            url: '/location',
            templateUrl: 'app/location/location.html',
            data: {
                authorizedGroups: []
            }
        })
        .state('locations.list', {
            url: '/list',
            templateUrl: 'app/location/list/locationlist.html',
            data: {
                authorizedGroups: []
            }
        })
        .state('locations.view', {
            url: '/view/:id',
            templateUrl: 'app/location/view/location.html',
            data: {
                authorizedGroups: []
            }
        })
        .state('locations.create', {
            url: '/create',
            templateUrl: 'app/location/create/createlocation.html',
            data: {
                authorizedGroups: []
            }
        });
}

