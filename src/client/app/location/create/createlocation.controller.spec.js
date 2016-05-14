/* jshint -W117, -W030 */
describe('CreateEventController', function () {
    var controller;

    var eventsBeforeCreation = mockData.getMockEvents();
    var eventsAfterCreation = mockData.getMockEventsWithEventCreated();
    var eventToCreate = mockData.getMockCreateEvent();
    var locations = locationMockData.getMockLocations();
    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$controller', '$rootScope', '$q', '$state', '$filter', 'EventService');

        bard.mockService(EventService, {
            getEvents: function () {
                return $q.when(eventsBeforeCreation);
            },
            createEvent: function () {
                return $q.when({status: 'ok', info: 'Event created successfully', event: eventsAfterCreation});
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
                    describe('Successfully', function () {
                        beforeEach(function () {
                            controller.event = eventToCreate;
                            controller.create();
                            $rootScope.$apply();
                        });

                        it('should call the createevent service method on creating an event.', function () {
                            expect(EventService.createEvent).to.have.been.calledOnce;
                        });

                        it('should have a status code of ok if response.status.code is ok', function () {
                            expect($rootScope.status.status).to.equal('ok');
                        });

                        it('should have a status message', function () {
                            expect($rootScope.status.message).to.exist;
                        });

                        it('should have a status message that is not empty', function () {
                            expect($rootScope.status.message).not.to.be.empty;
                        });

                        it('should have a status message if response.status.code is ok', function () {
                            expect($rootScope.status.message).to.equal('Event created ok');
                        });
                    });

                    describe('Failure', function () {
                        beforeEach(function () {
                            var scope = $rootScope.$new();

                            var es = {
                                createEvent: function () {
                                    return $q.when({status: 'failed', info: ''});
                                }
                            };

                            var ls = {
                                getLocations: function () {
                                    return $q.when(locations);
                                }
                            };
                            controller = $controller('createeventcontroller', {
                                EventService: es,
                                locationservice: ls,
                                $scope: scope
                            });
                            $rootScope.$apply();
                        });
                        it('should have a status code of failed if response.status.code is failed', function () {
                            controller.event = undefined;
                            controller.create();
                            $rootScope.$apply();
                            expect($rootScope.status.status).to.equal('failed');
                        });
                    });

                    describe('Crashed', function () {
                        beforeEach(function () {
                            var scope = $rootScope.$new();

                            var es = {
                                createEvent: function () {
                                    return $q.when();
                                }
                            };

                            var ls = {
                                getLocations: function () {
                                    return $q.when(locations);
                                }
                            };
                            controller = $controller('createeventcontroller', {
                                EventService: es,
                                locationservice: ls,
                                $scope: scope
                            });
                            $rootScope.$apply();
                        });
                        it('should have a status code of failed if response.status.code is failed', function () {
                            controller.event = undefined;
                            controller.create();
                            $rootScope.$apply();
                            expect($rootScope.status.status).to.equal('failed');
                        });
                    });

                    describe('No Status', function () {
                        beforeEach(function () {
                            var scope = $rootScope.$new();

                            var es = {
                                createEvent: function () {
                                    return $q.when({});
                                }
                            };

                            var ls = {
                                getLocations: function () {
                                    return $q.when(locations);
                                }
                            };
                            controller = $controller('createeventcontroller', {
                                EventService: es,
                                locationservice: ls,
                                $scope: scope
                            });
                            $rootScope.$apply();
                        });
                        it('should have a status code of failed if response.status.code is failed', function () {
                            controller.event = undefined;
                            controller.create();
                            $rootScope.$apply();
                            expect($rootScope.status.status).to.equal('failed');
                        });
                    });
                });

                describe('datepicker initialization', function () {
                    describe('start', function () {
                        it('should have set start.today to current date', function() {
                            var now = new Date();
                            controller.datepicker.start.today();
                            var sametime = moment(controller.event.start).isSame(now, 'day');
                            expect(sametime).to.be.true;
                        });
                        it('should set opened to be true when calling the open function', function() {
                            controller.datepicker.start.open();
                            expect(controller.datepicker.start.opened).to.be.true;
                        });
                    });
                    describe('end', function () {
                        it('should have set today to current date', function() {
                            var now = new Date();
                            controller.datepicker.end.today();
                            var sametime = moment(controller.event.end).isSame(now, 'day');
                            expect(sametime).to.be.true;
                        });
                        it('should set opened to be true when calling the open function', function() {
                            controller.datepicker.end.open();
                            expect(controller.datepicker.end.opened).to.be.true;
                        });
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
