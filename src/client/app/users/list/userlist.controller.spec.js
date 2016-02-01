/* jshint -W117, -W030 */
describe.skip('UserListController', function () {
    var controller;
    var users = mockData.getMockUsers();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-users');
        bard.inject('$controller', '$rootScope', '$q', '$state', '$filter');
    });

    describe('Controller Initialization', function () {
        describe('With valid data', function () {
            beforeEach(function () {
                var us = {
                    users: function () {
                        return $q.when(users);
                    }
                };
                controller = $controller('userlistcontroller', {
                    userservice: us
                });
            });

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have empty events array before activation', function () {
                expect(controller.users).to.exist;
            });

            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it.skip('should have users', function () {
                    expect(controller.users).to.have.length.above(0);
                });

                it.skip('should have mock users', function () {
                    expect(controller.users).to.have.length(2);
                });

                it.skip('should have an empty status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

                it.skip('should have a status.response', function () {
                    expect(controller.status.response).to.exist;
                });

                it.skip('should have a response.status that is ok', function () {
                    expect(controller.status.response).to.equal('RESPONSE_OK');
                });

                it.skip('should calculate time to last sign up date from now');

            });
        });

        describe('With failed service', function () {
            beforeEach(function () {
                var us = {
                    users: function () {
                        return $q.when();
                    }
                };
                controller = $controller('userlistcontroller', {
                    userservice: us
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it.skip('should not have users', function () {
                    expect(controller.users).to.have.length(0);
                });

                it.skip('should have a response.status that failed', function () {
                    expect(controller.status.response).to.equal('RESPONSE_ERROR');
                });

                it.skip('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it.skip('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe('With crashed service', function () {
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

                it.skip('should not have events', function () {
                    expect(controller.events).to.have.length(0);
                });

                it.skip('should have no response.status ', function () {
                    expect(controller.status.response).not.to.exist;
                });

                it.skip('should have a response.status.code warning', function () {
                    expect(controller.status.code).to.equal('warning');
                });

                it.skip('should have not have a status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

            });
        });
    });
});
