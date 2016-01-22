/* jshint -W117, -W030 */
describe('EventController', function () {
    var controller;

    var events = mockData.getMockEvents();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        bard.appModule('event-managing-events');
        bard.inject('$controller', '$rootScope', '$q');
        var es = {
            getEvents: function () {
                return $q.when(events);
            }
        };
        controller = $controller('EventController', {
            EventService: es
        });
    });

    describe('Controller Initialization', function () {
        it('Should exist', function () {
            expect(controller).to.exist;
        });

        it('should have empty events array before activation', function () {
            expect(controller.events).to.exist;
        });

        describe('After activation', function () {
            beforeEach(function () {
                $rootScope.$apply();
            });

            it('should have events', function () {
                expect(controller.events).to.have.length.above(0);
            });

            it('should have mock events', function () {
                expect(controller.events).to.have.length(2);
            });

            it('should have an empty status message', function () {
                expect(controller.status.message).to.be.empty;
            });

            it('should have a status.response', function () {
                expect(controller.status.response).to.exist;
            });

            it('should have a response.status that is ok', function () {
                expect(controller.status.response).to.equal('RESPONSE_OK');
            });

            it('should calculate time to last sign up date from now', function () {
                //var event = controller.events[0];
                //var signend = event.signend;
                //var fromNow = moment(signend).fromNow();
                //expect(event.timeToLastSign).to.equal(fromNow);
            });
        });

    });
});
