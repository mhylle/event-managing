/* jshint -W117, -W030 */
describe('EventViewController', function () {
    var controller;
    var events = mockData.getMockEvents();
    var eventwithuser = mockData.getMockEventWithUser();
    var eventwithoutuser = mockData.getMockEventWithoutUser();
    var failedEvent = mockData.getFailedMockEvents();
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
                it('should have a status.code field', function () {
                    expect(controller.status.code).to.exist;
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

                describe('status message', function () {
                    it('should have a status code of ok', function () {
                        expect(controller.status.code).to.equal('ok');
                    });
                    it('should have an empty status message', function () {
                        expect(controller.status.message).to.equal('');
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
                            },
                            attend: function () {
                                return $q.when(eventwithuser);
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

                    it('When signed for an event the current user should be set as signed', function () {
                        $httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                        $httpBackend.whenGET('/api/event/attend/' +
                            'eid/' + eventwithoutuser.id +
                            '/uid/' + mockuser.id).respond(200, eventwithuser);
                        controller.signup();
                        //$httpBackend.flush();
                        $rootScope.$apply();
                        expect(controller.isSigned).to.be.true;
                        expect(controller.signstatus).to.equal('Attending');
                    });
                    it('When signed for an event the signstatus should be set as Attending', function () {
                        $httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                        $httpBackend.whenGET('/api/event/attend/' +
                            'eid/' + eventwithoutuser.id +
                            '/uid/' + mockuser.id).respond(200, eventwithuser);
                        controller.signup();
                        //$httpBackend.flush();
                        $rootScope.$apply();
                        expect(controller.signstatus).to.equal('Attending');
                    });

                    it('should be possible to signout of an event');
                });
            });
        });
        describe('Backend failures', function () {
            describe('attend failure', function () {
                beforeEach(function () {
                    var scope = $rootScope.$new();
                    var es = {
                        getEvents: function () {
                            return $q.when(events);
                        },
                        getEvent: function () {
                            return $q.when(eventwithoutuser);
                        },
                        attend: function () {
                            return $q.when();
                        }
                    };
                    controller = $controller('eventviewcontroller', {
                        EventService: es,
                        $scope: scope,
                        $stateParams: {id: 1}
                    });
                });
                it('When trying to sign for an event the status code should be set to failed', function () {
                    $httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                    $httpBackend.whenGET('/api/event/attend/' +
                        'eid/' + eventwithoutuser.id +
                        '/uid/' + mockuser.id).respond(200, eventwithuser);
                    controller.signup();
                    $rootScope.$apply();
                    expect(controller.status.code).to.equal('failed');
                });
                it('When trying to sign for an event the status message should be set ', function () {
                    $httpBackend.whenGET('/api/event/id/1').respond(200, eventwithoutuser);
                    $httpBackend.whenGET('/api/event/attend/' +
                        'eid/' + eventwithoutuser.id +
                        '/uid/' + mockuser.id).respond(200, eventwithuser);
                    controller.signup();
                    $rootScope.$apply();
                    expect(controller.status.message).to.equal('An error occurred when trying to sign for the event');
                });
            });
        });
        describe('Failed getEvent', function () {
            describe('no response', function () {
                beforeEach(function () {
                    var scope = $rootScope.$new();
                    var es = {
                        getEvents: function () {
                            return $q.when();
                        },
                        getEvent: function () {
                            return $q.when();
                        },
                        attend: function () {
                            return $q.when();
                        }
                    };
                    controller = $controller('eventviewcontroller', {
                        $scope: scope,
                        $stateParams: {id: 1},
                        EventService: es
                    });
                });

                it('should set a status code of failed', function () {
                    $rootScope.$apply();
                    expect(controller.status.code).to.equal('failed');
                });

                it('should have a status message', function () {
                    $rootScope.$apply();
                    expect(controller.status.message)
                        .to.equal('An error occured retrieving the event from the server');
                });
            });
            describe('failed response', function () {
                beforeEach(function () {
                    var scope = $rootScope.$new();
                    var es = {
                        getEvents: function () {
                            return $q.when();
                        },
                        getEvent: function () {
                            return $q.when(failedEvent);
                        },
                        attend: function () {
                            return $q.when();
                        }
                    };
                    controller = $controller('eventviewcontroller', {
                        $scope: scope,
                        $stateParams: {id: 1},
                        EventService: es
                    });
                });

                it('should set a status code of failed', function () {
                    $rootScope.$apply();
                    expect(controller.status.code).to.equal('failed');
                });

                it('should have a status message', function () {
                    $rootScope.$apply();
                    expect(controller.status.message)
                        .to.equal('An unexpected error occurred');
                });
            });
        });
    });
});
