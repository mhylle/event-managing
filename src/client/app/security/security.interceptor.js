angular
    .module('app')
    .factory('sessionInjector',['$window', function ($window) {
        var sessionInjector = {
            request: function (config) {
                config.headers['accessoken'] = $window.sessionStorage["userInfo"];
                return config;
            }

        };
        return sessionInjector;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);

