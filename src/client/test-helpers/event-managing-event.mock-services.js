// GLOBALS
var appMockResults;
var appMockServices;

(function () {
    //This is executed before ALL tests in ALL suites
    window.beforeEach(function () {
        window.bard.appModule('event-managing-events');
        window.bard.inject('$q');
        window.bard.addGlobals(appMockResults, appMockServices);
        //module('event-managing-events', window.bard.fakeLogService);
        //window.$log.reset();
        // our app overrides $log functions and thus ngMock-specific
        // properties on those functions are lost and needs to be restored
        //window.sinon.spy(window.$log, 'info');
        //window.sinon.spy(window.$log, 'warn');
        //window.sinon.spy(window.$log, 'error');
        setupAppMockResults();
        setupAppMockServices();
    });

    function setupAppMockResults() {
        appMockResults = {
            eventResult: [
                {
                    'id': 1,
                    'name': 'Fastelavn',
                    internalId: 1,
                    signstart: new Date(),
                    signend: new Date(),
                    signoutend: new Date(),
                    location: 'Kantinen',
                    users: []
                },
                {
                    'id': 2,
                    'name': 'Julefrokost',
                    internalId: 2,
                    signstart: new Date(),
                    signend: new Date(),
                    signoutend: new Date(),
                    location: 'Kantinen',
                    users: []
                }
            ],
            eventFailErrorMsg: 'some error'
        };
    }

    function setupAppMockServices() {
        appMockServices = {
            eventResult: {
                getEvents: window.$q.when(appMockResults.eventResult)
            },
            resultFail: {
                getResources: window.$q.reject(appMockResults.eventFailErrorMsg)
            },
            resultUnresolved: {
                _deferredGetResources: window.$q.defer(),
                resolveGetResources: function () {
                    this._deferredGetResources.resolve(appMockResults.eventResult);
                }
            },
            eventNoResults: {
                getBookings: window.$q.when([])
            }
        };

        //not possible to do this inside object initializer
        //appMockServices.eventUnresolved.getEvents = appMockServices.eventUnresolved._deferredGetEvents.promise;

    }

})();
