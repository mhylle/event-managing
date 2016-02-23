/* jshint -W117, -W030 */
describe('EventViewController', function () {
    var controller;
    var events = mockData.getMockEvents();
    var eventwithuser = mockData.getMockEventWithUser();
    var eventwithoutuser = mockData.getMockEventWithoutUser();
    var mockuser = mockData.getMockSingleUser();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$controller',
            '$rootScope',
            '$stateParams',
            '$httpBackend',
            '$q',
            'EventService'
        );
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var es = {
                getEvents: function () {
                    return $q.when(events);
                },
                getEvent: function () {
                    return $q.when(eventwithuser);
                }
            };

            controller = $controller('eventviewcontroller', {
                EventService: es,
                $scope: scope,
                $stateParams: {id: 1}
            });
        });
        describe('With valid data', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have a null event', function () {
                expect(controller.event).to.be.null;
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
                    $rootScope.$apply();
                });

                it('should have an event', function () {
                    expect(controller.event).to.exist;
                });

                describe('Event name', function () {
                    it('should exist', function () {
                        expect(controller.event.name).to.exist;
                    });

                    it('should have a value', function () {
                        expect(controller.event.name).not.to.be.empty;
                    });
                });

                describe('attend/unattend', function () {
                    beforeEach(function () {
                        var scope = $rootScope.$new();
                        controller = $controller('eventviewcontroller', {
                            $scope: scope,
                            $stateParams: {id: 1}
                        });
                    });

                    it('should list if the current user is attending the event', function () {
                        $httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                        $httpBackend.flush();
                        expect(controller.isSigned).to.be.false;
                        expect(controller.signstatus).to.equal('Not attending');
                        $rootScope.$apply();
                    });

                    it.skip('should be possible to signup for an event', function () {
                        $httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                        $httpBackend.whenGET('/api/event/attend/' +
                            'eid/' + eventwithoutuser.id +
                            '/uid/' + mockuser.id).respond(200, eventwithuser);
                        $httpBackend.flush();
                        controller.signup();
                        expect(controller.isSigned).to.be.true;
                        expect(controller.signstatus).to.equal('Attending');
                        $rootScope.$apply();
                    });

                    it('should be possible to signout of an event');
                });
            });
        });
        describe.skip('Backend failures', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                controller = $controller('eventviewcontroller', {
                    $scope: scope,
                    $stateParams: {id: 1}
                });
            });
            it('should handle a service 500 response correctly', function () {
                var event = _.find(events, function (e) {
                    return parseInt(e.id) === 1;
                });
                $httpBackend.whenGET('/api/event/id/1').respond(500, null);
            });
        });
    });
});
