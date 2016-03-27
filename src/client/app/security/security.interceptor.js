angular
    .module('event-managing-security')
    .factory('sessionInjector',['$window', function ($window) {
        var sessionInjector = {
            request: function (config) {
                config.headers.accesstoken = $window.sessionStorage.userInfo;
                console.log('interceptor called., using ' + $window.sessionStorage.userInfo + ' as session token');
                return config;
            }

        };
        return sessionInjector;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        console.log('http provider config');
        $httpProvider.interceptors.push('sessionInjector');
    }]);

