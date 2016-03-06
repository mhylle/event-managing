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
                        var es = {
                            getEvents: function () {
                                return $q.when(events);
                            },
                            getEvent: function () {
                                return $q.when(eventwithoutuser);
                            }
                        };
                        controller = $controller('eventviewcontroller', {
                            EventService: es,
                            $scope: scope,
                            $stateParams: {id: 1}
                        });
                    });

                    it('should list if the current user is attending the event', function () {
                        $rootScope.$apply();
                        //$httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                        //$httpBackend.flush();
                        expect(controller.isSigned).to.be.false;
                        expect(controller.signstatus).to.equal('Not attending');
                    });

                    it('should list that a user is attending an event if the user is actually attending the event');

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
        describe('Backend failures', function () {
            describe.skip('No response', function () {
                beforeEach(function () {
                    var scope = $rootScope.$new();
                    var es = {
                        getEvent: function () {
                            return $q.when();
                        }
                    };
                    controller = $controller('eventviewcontroller', {
                        $scope: scope,
                        $stateParams: {id: 1},
                        EventService: es
                    });
                    $rootScope.$apply();
                });

                it('should set a status code of failed', function() {
                    expect(controller.status.code).to.equal('failed1');
                });

                it('should have a status message', function() {
                    expect(controller.status.message)
                        .to.equal('An error occured retrieving the event from the server1');
                });
            });
        });
    });
});
