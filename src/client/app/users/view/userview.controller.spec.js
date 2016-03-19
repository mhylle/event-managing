/* jshint -W117, -W030 */
describe('UserViewController', function () {
    var controller;
    var users = userMockData.getMockUsers();
    var user = userMockData.getMockSingleUser();
    var faileduser = userMockData.getFailedMockUsers();
    var crasheduser = userMockData.getCrashedMockUsers();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-users');
        bard.inject('$controller', '$rootScope', '$stateParams', '$q', 'Logger');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var us = {
                getUsers: function () {
                    return $q.when(users);
                },
                getUser: function () {
                    return $q.when(user);
                }
            };
            controller = $controller('userviewcontroller', {
                userservice: us,
                $scope: scope,
                $stateParams: {id: 1}
            });
        });
        describe('With valid data', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have a null user', function () {
                expect(controller.user).to.be.null;
            });

            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have a user that exists', function () {
                    expect(controller.user).to.exist;
                });
                it('should have a user with id 1 ', function () {
                    expect(controller.user.id).to.equal(1);
                });
                it('should have a user with firstname Brandon', function () {
                    expect(controller.user.firstname).to.equal('Brandon');
                });
            });
        });

        describe('Failed service', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var us = {
                    getUser: function () {
                        return $q.when(faileduser);
                    }
                };
                controller = $controller('userviewcontroller', {
                    userservice: us,
                    $scope: scope,
                    $stateParams: {id: 1}
                });
                $rootScope.$apply();
            });

            it('should have a status code of failed', function () {
                expect($rootScope.status.status).to.equal('error');
            });

            it('should have a status message', function () {
                expect($rootScope.status.message).to.equal('Unable to retrieve data from database');
            });

            it('should have not have a user', function () {
                expect(controller.user).to.be.null;
            });
        });

        describe('Crashed service', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var us = {
                    getUser: function () {
                        return $q.when(crasheduser);
                    }
                };
                controller = $controller('userviewcontroller', {
                    userservice: us,
                    $scope: scope,
                    $stateParams: {id: 1}
                });
                $rootScope.$apply();
            });

            it('should have a status code of failed', function () {
                expect($rootScope.status.status).to.equal('error');
            });

            it('should have a status message', function () {
                expect($rootScope.status.message)
                    .to.equal('An error occurred while retrieving the user from the server');
            });

            it('should have not have a user', function () {
                expect(controller.user).to.be.null;
            });
        });
    });
})
;
