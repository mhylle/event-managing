///* jshint -W117, -W030 */
//describe('UserCreateController', function () {
//    var scope;
//    var controller;
//
//    bard.verifyNoOutstandingHttpRequests();
//
//    beforeEach(function () {
//        bard.inject('$controller', '$rootScope', 'EventService');
//        scope = window.$rootScope.$new();
//        bard.mockService(EventService, appMockServices.eventResult);
//        controller = newAppController();
//        $rootScope.$apply();
//    });
//
//    describe('Controller Initialization', function () {
//        //var activateSpy;
//        //var getEventsSpy;
//
//        beforeEach(function () {
//            controller = newAppController();
//            //var activateSpy = sinon.spy(controller.activate);
//            //var getEventsSpy = sinon.spy(EventService.getEvents);
//        });
//
//        it('creates controller', function () {
//            expect(controller, 'controller obj').to.exist;
//        });
//    });
//
//    function newAppController(bsMock) {
//        //if (bsMock != null) {
//        //    EventService.getEvents.returns(bsMock.getEvents);
//        //}
//        var newController = $controller('UserCreateController', {$scope: scope});
//        $rootScope.$apply();
//        return newController;
//    }
//});
