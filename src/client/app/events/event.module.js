/**
 * Created by mhylle on 16-01-2016.
 */
angular
    .module('event-managing-events', [
        'ui.router',
        'ngLodash',
        'ngAnimate',
        'textAngular',
        'ui.bootstrap',
        'event-managing-security',
        'event-managing-users',
        'event-managing-logger'
    ])
    .config(['$stateProvider', 'USER_ROLES', configuration]);

function configuration($stateProvider, USER_ROLES) {
    $stateProvider
        .state('events', {
            url: '/events',
            templateUrl: 'app/events/events.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('events.list', {
            url: '/list',
            templateUrl: 'app/events/list/events.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('events.view', {
            url: '/view/:id',
            templateUrl: 'app/events/view/event.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('events.create', {
            url: '/create',
            templateUrl: 'app/events/create/createevent.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        });
}
