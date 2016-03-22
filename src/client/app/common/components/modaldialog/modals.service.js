(function () {
    'use strict';

    angular
        .module('event-managing-components')
        .service('modals', modals);

    modals.$inject = ['$rootScope', '$q', 'Logger'];

    /* @ngInject */
    function modals($rootScope, $q, Logger) {
        this.open = open;
        this.params = params;
        this.proceedTo = proceedTo;
        this.reject = reject;
        this.resolve = resolve;

        var modal = {
            deferred: null,
            params: null
        };

        ////////////////

        function open(type, params, pipeResponse) {
            Logger.info('opening modal dialog');
            var previousDeferred = modal.deferred;
            modal.deferred = $q.defer();
            modal.params = params;

            if (previousDeferred && pipeResponse) {
                modal.deferred.promise.then(previousDeferred.resolve, previousDeferred.reject);
            } else if (previousDeferred) {
                previousDeferred.reject();
            }
            Logger.info('emitting modals.open event on type: ' + type);

            $rootScope.$emit('modals.open', type);
            return modal.deferred.promise;
        }

        function params() {
            return (modal.params || {});
        }

        function proceedTo(type, params) {
            return (open(type, params, true));
        }

        function reject(reason) {
            if (!modal.deferred) {
                return;
            }

            modal.deferred.reject(reason);
            modal.deferred = modal.params = null;

            $rootScope.$emit('modals.close');
        }

        function resolve(response) {
            if (!modal.deferred) {
                return;
            }

            modal.deferred.resolve(response);
            modal.deferred = modal.params = null;

            $rootScope.$emit('modals.close');
        }
    }

})();

