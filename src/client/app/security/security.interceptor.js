angular
    .module('schema.security')
    .factory('sessionInjector',['$window', function ($window) {
        var sessionInjector = {
            request: function (config) {
                config.headers['accesstoken'] = $window.sessionStorage['userInfo'];
                console.log('interceptor called.');
                return config;
            }

        };
        return sessionInjector;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        console.log('http provider config');
        $httpProvider.interceptors.push('sessionInjector');
    }]);

