/**
 * Created by mhylle on 16-01-2016.
 */
angular
    .module('event-managing-events', [
        'ui.router',
        'eventmanaging.security'
    ])
    .config(['$stateProvider', 'USER_ROLES', configuration]);


function configuration($stateProvider, USER_ROLES) {
    $stateProvider
        .state('events', {
            url: '/events',
            templateUrl: 'app/events/eventlayout.html',
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
}
