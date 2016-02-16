(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .filter('iscurrentventfilter', isattendingeventfilter);

    isattendingeventfilter.$inject = ['lodash', 'moment'];

    function isattendingeventfilter(moment) {
        return filterFunction;

        ////////////////
        function filterFunction(event, before) {
            if (!event) {
                throw new Error('You must specify at least an event for this filter to work.');
            }
            //if (!event.start) {
            //    throw new Error('The event did not have a start time, cannot determine it\'s location.');
            //}

            return before ? moment.isBefore(moment(event.start)) : !moment.isBefore(moment(event.start));
        }
    }
})();
