angular
    .module('event-managing-users', [
        'ui.router',
        'event-managing',
        'event-managing-security'
    ]).config(['$stateProvider', 'USER_ROLES', configuration]);

function configuration($stateProvider, USER_ROLES) {
    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: 'app/users/users.html',
            data: {
                authorizedRoles: [USER_ROLES.user, USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('users.list', {
            url: '/list',
            templateUrl: 'app/users/list/userlist.html',
            data: {
                authorizedRoles: [USER_ROLES.user, USER_ROLES.admin,USER_ROLES.editor]
            }
        })
        .state('users.view', {
            url: '/view/:id',
            templateUrl: 'app/users/view/user.html',
            data: {
                authorizedRoles: [USER_ROLES.user, USER_ROLES.admin,USER_ROLES.editor]
            }
        })
        .state('users.create', {
            url: '/create',
            templateUrl: 'app/users/create/createUser.html',
            data: {
                authorizedRoles: [USER_ROLES.editor, USER_ROLES.admin]
            }
        });
}
