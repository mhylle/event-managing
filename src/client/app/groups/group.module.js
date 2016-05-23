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
    .config(['$stateProvider', configuration]);

function configuration($stateProvider) {
    $stateProvider
        .state('groups', {
            url: '/groups',
            templateUrl: 'app/groups/groups.html',
            data: {
                authorizedGroups: []
            }
        })
        .state('groups.list', {
            url: '/list',
            templateUrl: 'app/groups/list/grouplist.html',
            data: {
                authorizedGroups: []
            }
        })
        .state('groups.view', {
            url: '/view/:id',
            templateUrl: 'app/groups/view/group.html',
            data: {
                authorizedGroups: []
            }
        });
}

