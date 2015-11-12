///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var UserService = (function () {
            /* @ngInject */
            function UserService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            UserService.prototype.users = function () {
                var defer = this.$q.defer();
                this.$http.get('/api/users').then(function (response) {
                    var data = response.data;
                    return defer.resolve(data);
                });
                return defer.promise;
            };
            UserService.instance = function ($http, $q) {
                return new UserService($http, $q);
            };
            UserService.$inject = ['$http', '$q'];
            UserService.serviceId = 'userservice';
            return UserService;
        })();
        angular
            .module('app')
            .factory(UserService.serviceId, UserService.instance);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
