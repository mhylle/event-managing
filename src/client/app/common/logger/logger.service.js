/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-logger')
        .factory('Logger', Logger);

    Logger.$inject = ['$rootScope', '$log'];

    /* @ngInject */
    function Logger($rootScope, $log) {
        var service = {
            error: error,
            info: info,
            debug: debug,
            warning: warning,
            message: message,
            status: stat
        };
        return service;

        ////////////////
        function error(message, data) {
            //this.toastr.error(message, title);
            if (data) {
                $log.error('Error: ' + message, {data: data});
            } else {
                $log.error('Error: ' + message);
            }
        }

        function info(message, data) {
            //this.toastr.info(message, title);
            if (data) {
                $log.info('Info: ' + message, {data: data});
            } else {
                $log.info('Info: ' + message);
            }
        }

        function debug(message, data) {
            //this.toastr.success(message, title);
            if (data) {
                $log.debug('Success: ' + message, {data: data});
            } else {
                $log.debug('Success: ' + message);
            }
        }

        function warning(message, data) {
            //this.toastr.warning(message, title);
            if (data) {
                $log.warn('Warning: ' + message, {data: data});
            } else {
                $log.warn('Warning: ' + message);
            }
        }

        function message(text, status) {
            if (!$rootScope.status) {
                $rootScope.status = {};
            }
            console.log(text);
            $rootScope.status.status  = status;
            $rootScope.status.message = text;
        }

        function stat(stati) {
            if (!$rootScope.status) {
                $rootScope.status = {};
            }
            $rootScope.status.status  = stati;
        }
    }
})();

