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
    .config(['$stateProvider', 'USER_ROLES', configuration]);

function configuration($stateProvider, USER_ROLES) {
    $stateProvider
        .state('locations', {
            url: '/location',
            templateUrl: 'app/location/location.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('locations.list', {
            url: '/list',
            templateUrl: 'app/location/list/locationlist.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('locations.view', {
            url: '/view/:id',
            templateUrl: 'app/location/view/location.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('locations.create', {
            url: '/create',
            templateUrl: 'app/location/create/createlocation.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        });
}

