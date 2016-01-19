/* jshint -W117, -W030 */
describe('EventController', function () {
    var scope;
    var controller;

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        bard.inject('$controller', '$rootScope', 'EventService');
        scope = window.$rootScope.$new();
        bard.mockService(EventService, appMockServices.eventResult);
        controller = newAppController();
        $rootScope.$apply();
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            controller = newAppController(appMockServices.eventResult);
        });

        it('creates controller', function () {
            expect(controller, 'controller obj').to.exist;
        });
    });

    function newAppController(bsMock) {
        if (bsMock != null) {
            EventService.getEvents.returns(bsMock.getEvents);
        }
        var newController = $controller('EventController', {$scope: scope});
        $rootScope.$apply();
        return newController;
    }
});
