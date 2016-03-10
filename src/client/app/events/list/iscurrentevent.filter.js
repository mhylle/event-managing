/* jshint -W117 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .filter('iscurrenteventfilter', IsCurrentEventFilter);

    IsCurrentEventFilter.$inject = ['lodash'];

    function IsCurrentEventFilter(lodash) {
        return filterFunction;

        ////////////////
        function filterFunction(events, before) {
            if (!events) {
                throw new Error('You must specify at least one event for this filter to work.');
            }
            if (lodash.isArray(events)) {
                var result = lodash.filter(events, function (event) {
                    if (before || before === undefined) {
                        return moment(event.start).isAfter(moment());
                    } else {
                        return moment(event.start).isBefore(moment());
                    }
                });
                return result;
            } else {
                if (events.start) {
                    if (before || before === undefined) {
                        if (moment(events.start).isAfter(moment())) {
                            return events;
                        }
                    } else {
                        if (moment(events.start).isBefore(moment())) {
                            return events;
                        }
                    }
                }
            }
        }
    }
})();
