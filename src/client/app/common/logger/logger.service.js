/**
 * Created by mhylle on 11-12-2015.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-logger')
        .factory('Logger', Logger);

    Logger.$inject = ['$log'];

    /* @ngInject */
    function Logger($log) {
        var service = {
            error: error,
            info: info,
            debug: debug,
            warning: warning
        };
        return service;

        ////////////////
        function error(message, data) {
            //this.toastr.error(message, title);
            if (data) {
                $log.error('Error: ' + message, data);
            } else {
                $log.error('Error: ' + message);
            }
        }

        function info(message, data) {
            //this.toastr.info(message, title);
            if (data) {
                $log.info('Info: ' + message, data);
            } else {
                $log.info('Info: ' + message);
            }
        }

        function debug(message, data) {
            //this.toastr.success(message, title);
            if (data) {
                $log.debug('Success: ' + message, data);
            } else {
                $log.debug('Success: ' + message);
            }
        }

        function warning(message, data) {
            //this.toastr.warning(message, title);
            if (data) {
                $log.warn('Warning: ' + message, data);
            } else {
                $log.warn('Warning: ' + message);
            }
        }
    }

})();

