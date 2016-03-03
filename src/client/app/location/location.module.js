angular
    .module('event-managing-locations', [
        'ui.router',
        'ngAnimate',
        'event-managing-logger',
        'event-managing-security'
    ])
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
        });
}

