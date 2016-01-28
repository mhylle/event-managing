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
            success: success,
            warning: warning
        };
        return service;

        ////////////////

        function error(message, data, title) {
            //this.toastr.error(message, title);
            $log.info('Error: ' + title + ' ' + message, data);
        }

        function info(message, data, title) {
            //this.toastr.info(message, title);
            $log.info('Info: ' + title + ' ' + message, data);
        }

        function success(message, data, title) {
            //this.toastr.success(message, title);
            $log.info('Success: ' + title + ' ' + message, data);
        }

        function warning(message, data, title) {
            //this.toastr.warning(message, title);
            $log.info('Warning: ' + title + ' ' + message, data);
        }
    }

})();

