/* jshint -W117, -W030 */
describe('EventListController', function () {
    var controller;

    var events = mockData.getMockEvents();
    //var signedevents = mockData.getMockSignedEvents();
    var users = mockData.getMockUsers();
    var mockuser = mockData.getMockSingleUser();
    var unsignedEvent = mockData.getMockUnsignedEvent();
    var signedUser = mockData.getMockSingleUser();
    var signedEvent = mockData.getMockSignedEvent();
    var failedEvents = mockData.getFailedMockEvents();
    var crashedEvents = mockData.getCrashedMockEvents();
    var noEvents = mockData.getNoMockEvents();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$controller',
            '$rootScope',
            '$q',
            '$httpBackend',
            '$state',
            '$filter',
            '$log',
            'Session',
            'SecurityService');
    });

    describe('Controller Initialization', function () {
        describe('With valid data', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var es = {
                    getEvents: function () {
                        return $q.when(events);
                    },
                    getEvent: function () {
                        return $q.when();
                    },
                    attend: function () {
                        return $q.when(signedEvent);
                    }
                };
                controller = $controller('EventController', {
                    EventService: es,
                    $scope: scope
                });
            });

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have empty events array before activation', function () {
                expect(controller.events).to.exist;
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

                it('should have events', function () {
                    expect(controller.events).to.have.length.above(0);
                });

                it('should have mock events', function () {
                    expect(controller.events).to.have.length(2);
                });

                it('should have an empty status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

                it('should have a response.cpde that is ok', function () {
                    expect(controller.status.code).to.equal('ok');
                });

                describe('Signup/off', function () {
                    it('should not have the current user signed in', function () {
                        var event = controller.events[0];
                        var isAttending = $filter('isattendingeventfilter')(event, users[0]);
                        expect(isAttending).to.be.false;
                    });
                    it('should signup a user when pressing the attend button', function () {
                        var event = controller.events[0];
                        controller.signup(event);
                        $rootScope.$apply();
                        event = controller.events[0];
                        var isAttending = $filter('isattendingeventfilter')(event, signedUser);
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
                    $log.info.logs = [];
                    $rootScope.$apply();
                });

                it('should log the navigation attempt', function () {
                    var credentials = {
                        username: 'mah', password: 'mah'
                    };
                    $httpBackend.expectPOST('/api/login')
                        .respond({status: 200, accesstoken: 'mah', user: mockuser});
                    SecurityService.login(credentials);
                    $httpBackend.flush();
                    var event = controller.events[0];
                    controller.gotoEvent(event);
                    $rootScope.$apply();
                    expect($log.info.logs[0][0]).to.contain('trying to navigate to event ' + event.name);
                });

                it('should prevent navigation to events.view if not logged in.', function () {
                    var event = controller.events[0];
                    controller.gotoEvent(event);
                    $rootScope.$apply();
                    expect($state).to.be.defined;
                    expect($state.go).to.be.defined;
                    expect($state.current.name).to.equal('');
                });

                it('should navigate to events.view on gotoEvent', function () {
                    var credentials = {
                        username: 'mah', password: 'mah'
                    };
                    $httpBackend.expectPOST('/api/login')
                        .respond({status: 200, accesstoken: 'mah', user: mockuser});
                    SecurityService.login(credentials);
                    $httpBackend.flush();
                    $rootScope.$apply();

                    $httpBackend.whenGET('app/events/events.html').respond();
                    var event = controller.events[1];
                    controller.gotoEvent(event);
                    $rootScope.$apply();
                    expect($state.current.name).to.equal('events.view');
                    //$httpBackend.flush();
                });
            });
        });

        describe('With no data returned', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var es = {
                    getEvents: function () {
                        return $q.when(noEvents);
                    },
                    getEvent: function () {
                        return $q.when();
                    }
                };
                controller = $controller('EventController', {
                    EventService: es,
                    $scope: scope
                });
                $rootScope.$apply();
            });

            it('should have an empty event array', function () {
                expect(controller.events).to.have.length(0);
            });
        });

        describe('With failed service', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var es = {
                    getEvents: function () {
                        return $q.when(failedEvents);
                    },
                    getEvent: function () {
                        return $q.when();
                    }
                };
                controller = $controller('EventController', {
                    EventService: es,
                    $scope: scope
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
                    expect(controller.status.response).to.undefined;
                });

                it('should have a response.status.code failed', function () {
                    expect(controller.status.code).to.equal('failed');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });
            });
        });
        describe('With crashed service', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var es = {
                    getEvents: function () {
                        return $q.when(crashedEvents);
                    }
                };
                controller = $controller('EventController', {
                    EventService: es,
                    $scope: scope
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
                    expect(controller.status.response).to.undefined;
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });
            });
        });
    });
});
