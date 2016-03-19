/* jshint -W117, -W030 */
describe('UserListController', function () {
    var controller;
    var users = userMockData.getMockUsers();
    var mockuser = mockData.getMockSingleUser();
    var failedUsers = userMockData.getFailedMockUsers();
    var crashedUsers = userMockData.getCrashedMockUsers();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-users');
        bard.inject('$controller', '$rootScope', '$q', '$httpBackend', 'SecurityService');
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

            describe('After activation', function () {
                beforeEach(function () {
                    bard.inject('$state');
                    $rootScope.$apply();
                });

                it('should have users', function () {
                    expect(controller.users).to.have.length.above(0);
                });

                it('should have mock events', function () {
                    expect(controller.users).to.have.length(20);
                });

                describe('Should navigate to the correct state when choosing a user', function () {
                    beforeEach(function () {
                        bard.inject('$log');
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
                        $httpBackend.whenGET('app/users/users.html').respond();
                        $httpBackend.flush();
                        var user = controller.users[0];
                        controller.gotoUser(user);
                        $rootScope.$apply();
                        expect($log.info.logs[0][0]).to
                            .contain('trying to navigate to user ' + user.firstname + ' ' + user.lastname);
                    });

                    it('should prevent navigation to users.view if not logged in.', function () {
                        var user = controller.users[0];
                        controller.gotoUser(user);
                        $rootScope.$apply();
                        expect($state).to.be.defined;
                        expect($state.go).to.be.defined;
                        expect($state.current.name).to.equal('');
                    });

                    it('should navigate to users.view on gotoUser', function () {
                        var credentials = {
                            username: 'mah', password: 'mah'
                        };
                        $httpBackend.expectPOST('/api/login')
                            .respond({status: 200, accesstoken: 'mah', user: mockuser});
                        SecurityService.login(credentials);
                        $httpBackend.flush();
                        $rootScope.$apply();
                        $httpBackend.whenGET('app/users/users.html').respond();
                        var user = controller.users[0];
                        controller.gotoUser(user);
                        $rootScope.$apply();
                        expect($log.info.logs[0][0]).to
                            .contain('trying to navigate to user ' + user.firstname + ' ' + user.lastname);
                        expect($state.current.name).to.equal('users.view');
                        //$httpBackend.flush();
                    });
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
                    expect($rootScope.status.status).to.equal('error');
                });

                it('should have a status message', function () {
                    expect($rootScope.status.message).not.to.be.empty;
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
                    expect($rootScope.status.status).to.equal('error');
                });

                it('should have not have a status message', function () {
                    expect($rootScope.status.message).to.equal('No response returned from the server');
                });

            });
        });
    });
});
