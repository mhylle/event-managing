angular
    .module('event-managing-groups', [
        'ui.router',
        'ngAnimate',
        'event-managing-logger',
        'event-managing-security',
        'event-managing-users'
    ])
    .constant('groupsServer', {
        url: 'http://localhost',
        port: 3000,
        location: 'groups'
    })
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

