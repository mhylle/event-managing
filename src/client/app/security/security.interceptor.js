angular
    .module('app')
    .factory('sessionInjector',['$window', function ($window) {
        var sessionInjector = {
            request: function (config) {
                config.headers['accesstoken'] = $window.sessionStorage["userInfo"];
                return config;
            }

        };
        return sessionInjector;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);

