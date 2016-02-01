angular
    .module('event-managing-groups', [
        'ui.router',
        'event-managing-logger',
        'eventmanaging.security',
        'event-managing-users'
    ])
    .config(['$stateProvider', 'USER_ROLES', configuration]);

function configuration($stateProvider, USER_ROLES) {
    $stateProvider
        .state('groups', {
            url: '/groups',
            templateUrl: 'app/groups/groups.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('groups.list', {
            url: '/list',
            templateUrl: 'app/groups/list/grouplist.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('groups.view', {
            url: '/view/:id',
            templateUrl: 'app/groups/view/group.html',
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        });
}

