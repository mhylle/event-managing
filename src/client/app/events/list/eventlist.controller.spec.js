/* jshint -W117, -W030 */
describe('EventController', function () {
    var controller;

    var events = mockData.getMockEvents();
    var signedevents = mockData.getMockSignedEvents();
    var users = mockData.getMockUsers();
    var failedEvents = mockData.getFailedMockEvents();
    var crashedEvents = mockData.getCrashedMockEvents();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$controller', '$rootScope', '$q', '$state', '$filter');
    });

    describe('Controller Initialization', function () {
        describe('With valid data', function () {
            beforeEach(function () {
                var es = {
                    getEvents: function () {
                        return $q.when(events);
                    },
                    getEvent: function () {
                        return $q.when();
                    },
                    attend: function () {
                        return $q.when(signedevents[0]);
                    }
                };
                controller = $controller('EventController', {
                    EventService: es
                });
            });

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

                it.skip('should have a status.response', function () {
                    expect(controller.status.response).to.exist;
                });

                it.skip('should have a response.status that is ok', function () {
                    expect(controller.status.response).to.equal('RESPONSE_OK');
                });

                it('should calculate time to last sign up date from now');

                describe('Signup/off', function () {
                    it('should not have the current user signed in', function () {
                        var event = controller.events[0];
                        var isAttending = $filter('isattendingeventfilter')(event, users[0]);
                        expect(isAttending).to.be.false;
                    });
                    it.skip('should signup a user when pressing the attend button', function () {
                        var event = controller.events[0];
                        controller.signup(event);
                        event = controller.events[0];
                        var isAttending = $filter('isattendingeventfilter')(event, users[0]);
                        expect(isAttending).to.be.true;
                    });
                });
                describe('It should signout a user when pressing the attend button and the user is signed',
                    function () {
                        it('should have the current user signed in');
                        it('should signout the user when pressing the cancel button');
                    });
            });
            describe('Should navigate to the correct state when choosing an event', function () {
                beforeEach(function () {
                    //bard.inject('$state');
                    $rootScope.$apply();
                });
                it('should navigate to event.view on gotoEvent', function () {
                    //controller.gotoEvent(1);
                    //$rootScope.$apply();
                    //expect($state).is('events.view');
                });
            });
        });

        describe.skip('With failed service', function () {
            beforeEach(function () {
                var es = {
                    getEvents: function () {
                        return $q.when(failedEvents);
                    },
                    getEvent: function () {
                        return $q.when();
                    }
                };
                controller = $controller('EventController', {
                    EventService: es
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have events', function () {
                    expect(controller.events).to.have.length(0);
                });

                it('should have a response.status that failed', function () {
                    expect(controller.status.response).to.equal('RESPONSE_ERROR');
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe.skip('With crashed service', function () {
            beforeEach(function () {
                var es = {
                    getEvents: function () {
                        return $q.when(crashedEvents);
                    }
                };
                controller = $controller('EventController', {
                    EventService: es
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have events', function () {
                    expect(controller.events).to.have.length(0);
                });

                it('should have no response.status ', function () {
                    expect(controller.status.response).not.to.exist;
                });

                it('should have a response.status.code warning', function () {
                    expect(controller.status.code).to.equal('warning');
                });

                it('should have not have a status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

            });
        });
    });
});
