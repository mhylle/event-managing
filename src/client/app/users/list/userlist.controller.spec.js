/* jshint -W117, -W030 */
describe('UserListController', function () {
    var controller;
    var users = userMockData.getMockUsers();
    var failedUsers = userMockData.getFailedMockUsers();
    var crashedUsers = userMockData.getCrashedMockUsers();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-users');
        bard.inject('$controller', '$rootScope', '$q', '$state');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var us = {
                getUsers: function () {
                    return $q.when(users);
                }
            };
            controller = $controller('userlistcontroller', {
                userservice: us,
                $scope: scope
            });
        });
        describe('With valid data', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have empty user array before activation', function () {
                expect(controller.users).to.exist;
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

                it('should have users', function () {
                    expect(controller.users).to.have.length.above(0);
                });

                it('should have mock events', function () {
                    expect(controller.users).to.have.length(20);
                });

                it('should have an empty status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

                it('should have a status.code', function () {
                    expect(controller.status.code).to.exist;
                });

                it('should have a response.status that is ok', function () {
                    expect(controller.status.code).to.equal('ok');
                });

            });
            describe.skip('Should navigate to the correct state when choosing a user', function () {
                beforeEach(function () {
                    //bard.inject('$state');
                    $rootScope.$apply();
                });
                it('should navigate to users.view on gotoUser', function () {
                    //controller.gotoEvent(1);
                    //$rootScope.$apply();
                    //expect($state).is('events.view');
                });
            });

        });

        describe('With failed service', function () {
            beforeEach(function () {
                var us = {
                    getUsers: function () {
                        return $q.when(failedUsers);
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

                it('should not have users', function () {
                    expect(controller.users).to.have.length(0);
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('failed');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe('With crashed service', function () {
            beforeEach(function () {
                var us = {
                    getUsers: function () {
                        return $q.when(crashedUsers);
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

                it('should not have users', function () {
                    expect(controller.users).to.have.length(0);
                });

                it('should have a response.status.code warning', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it('should have not have a status message', function () {
                    expect(controller.status.message).to.equal('No response returned from the server');
                });

            });
        });
    });
});
