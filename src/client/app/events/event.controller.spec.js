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
        var activateSpy;
        var getEventsSpy;

        beforeEach(function () {
            controller = newAppController(appMockServices.eventResult);
            //var activateSpy = sinon.spy(controller.activate);
            //var getEventsSpy = sinon.spy(EventService.getEvents);
        });

        it('creates controller', function () {
            expect(controller, 'controller obj').to.exist;
        });

        //it('calls activate', function () {
        //    expect(controller.activate).to.have.been.calledOnce;
        //});
        //
        //describe('After activate', function () {
        //    it('to have called eventservice', function () {
        //        expect(EventService.getEvens).to.have.been.calledOnce;
        //    });
        //
        //    it('has events', function () {
        //        expect(controller.events).not.to.be.empty;
        //    });
        //
        //    it('has 2 events', function () {
        //        expect(controller.events.length).to.equal(2);
        //    });
        //})
    });

    function newAppController(bsMock) {
        //if (bsMock != null) {
        //    EventService.getEvents.returns(bsMock.getEvents);
        //}
        var newController = $controller('EventController', {$scope: scope});
        $rootScope.$apply();
        return newController;
    }
});
