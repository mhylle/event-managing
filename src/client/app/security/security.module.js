/**
 * Created by mhylle on 11-12-2015.
 */
angular
    .module('event-managing-security',
        ['event-managing-logger',
            'ngLodash'])
    .constant('securityServer', {
        url: 'http://localhost',
        port: 3000,
        location: '/'
    });
