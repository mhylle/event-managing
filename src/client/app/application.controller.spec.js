/* jshint -W117, -W030 */
describe('ApplicationController', function () {
    var controller;
    var sandbox;
    var user = userMockData.getMockSingleUser();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing');
        bard.inject(
            '$controller',
            '$rootScope',
            '$stateParams',
            '$httpBackend',
            '$q',
            '$state',
            'Logger',
            'AUTH_EVENTS',
            'USER_ROLES',
            'Session',
        'SecurityService');
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(window.console, 'log');
        sandbox.stub(window.console, 'error');
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();
            var ss = {
                login: function () {
                    return $q.when({status: 200, accesstoken: 'mah', user: user});
                },
                isAuthenticated: function () {
                    return true;
                },
                isAuthorized: function () {
                    return true;
                }
            };
            controller = $controller('ApplicationController', {
                $scope: scope,
                SecurityService: ss
            });
        });
        describe('Initialization', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            describe('Status property', function () {
                it('should have a status field', function () {
                    expect(controller.status).to.exist;
                });
                it('should have a status.message field', function () {
                    expect(controller.status.message).to.exist;
                });
            });
        });

        describe('After Activation', function () {
            beforeEach(function() {
                $rootScope.$apply();
            });

            describe('stateChanges', function () {
                beforeEach(function () {
                    var scope = $rootScope.$new();

                    var ss = {
                        login: function () {
                            return $q.when();
                        },
                        isAuthenticated: function () {
                            return true;
                        },
                        isAuthorized: function () {
                            return true;
                        }
                    };
                    controller = $controller('ApplicationController', {
                        $scope: scope,
                        SecurityService: ss
                    });
                });

                it('should fail verification if no data is specified', function () {
                    var event = $rootScope.$broadcast('$stateChangeStart');
                    expect(event.defaultPrevented).to.be.truthy;
                });

                it('should fail verification if the user is not authorized', function () {
                    var event = $rootScope.$broadcast('$stateChangeStart', {data: {authorizedRoles: USER_ROLES.admin}});
                    expect(event.defaultPrevented).to.be.true;
                });

                it.skip('should allow continuation if the user is authenticated', function () {
                    var credentials = {
                        username: 'mah', password: 'mah'
                    };
                    sinon.spy($rootScope, '$broadcast');
                    $httpBackend.expectPOST('/api/login')
                        .respond({status: 200, accesstoken: 'mah', user: user.user});
                    SecurityService.login(credentials);
                    $httpBackend.flush();
                    var event = $rootScope.$broadcast('$stateChangeStart', {data: {authorizedRoles: USER_ROLES.admin}});
                    expect(event.defaultPrevented).to.be.false;
                    $rootScope.$apply();
                });
            });

            describe('authentication', function() {
                beforeEach(function () {
                    var scope = $rootScope.$new();

                    var ss = {
                        login: function () {
                            return $q.when();
                        },
                        isAuthenticated: function () {
                            return true;
                        },
                        isAuthorized: function () {
                            return true;
                        }
                    };
                    controller = $controller('ApplicationController', {
                        $scope: scope,
                        SecurityService: ss
                    });
                });
            });

            describe('authorization', function() {
                beforeEach(function () {
                    var scope = $rootScope.$new();

                    var ss = {
                        isAuthenticated: function () {
                            return true;
                        },
                        isAuthorized: function () {
                            return false;
                        }
                    };
                    controller = $controller('ApplicationController', {
                        $scope: scope,
                        SecurityService: ss
                    });
                    sinon.spy($rootScope, '$broadcast');
                    $httpBackend.expectPOST('/api/login')
                        .respond({status: 200, accesstoken: 'mah', user: user.user});
                    $rootScope.$apply();
                });

                it('should distinguish between authorization and authentication', function() {
                    var credentials = {
                        username: 'mah', password: 'mah'
                    };
                    SecurityService.login(credentials);
                    $httpBackend.flush();
                    $rootScope.$broadcast('$stateChangeStart', {data: {authorizedRoles: USER_ROLES.guest}});
                    $rootScope.$apply();
                    expect($rootScope.$broadcast.calledWith(AUTH_EVENTS.notAuthorized)).to.be.true;
                });
            });
        });
    });
});
