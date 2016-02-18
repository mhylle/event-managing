/* jshint -W117, -W030 */
describe('CreateEventController', function () {
    var controller;

    var events = mockData.getMockEvents();
    var locations = locationMockData.getMockLocations();
    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$controller', '$rootScope', '$q', '$state', '$filter', 'EventService');

        bard.mockService(EventService, {
            createEvent: function () {
                return $q.when();
            },
            _default: $q.when()
        });

        var ls = {
            getLocations: function () {
                return $q.when(locations);
            }
        };
        controller = $controller('createeventcontroller', {
            locationservice: ls
        });
    });

    describe('Controller Initialization', function () {
        describe('With valid data', function () {

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            describe('Status property', function () {
                it('should have a status field', function () {
                    expect(controller.status).to.exist;
                });
                it('should have a status.message field', function () {
                    expect(controller.status.message).to.exist;
                });
            });

            describe('After activation', function () {
                beforeEach(function () {
                    sinon.spy(EventService, 'createEvent');
                    $rootScope.$apply();
                });

                it('should have an event object', function () {
                    expect(controller.event).to.exist;
                });

                it('the event object should be empty', function () {
                    expect(isEmpty(controller.event)).to.be.true;
                });

                describe('Creating event', function () {
                    beforeEach(function() {
                        controller.create();
                    });

                    it('should call the createevent service method on creating an event.', function () {
                        expect(EventService.createEvent).to.have.been.calledOnce;
                    });

                    it('should have a status code of ok if response.status.code is ok', function () {
                        expect(controller.status.code).to.equal('ok');
                    });

                    it.skip('should have a status code of failed if response.status.code is failed', function () {
                        expect(controller.status.code).to.equal('failed');
                    });
                });
            });
        });
    });

    function isEmpty(map) {
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
});
