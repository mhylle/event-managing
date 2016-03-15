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
            'Logger',
            'USER_ROLES',
            'Session');
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
                $rootScope.$apply();
            });

            describe('stateChanges', function () {
                it('should fail verification if no data is specified', function () {
                    var event = $rootScope.$broadcast('$stateChangeStart');
                    expect(event.defaultPrevented).to.be.truthy;
                });

                it('should fail verification if the user is not authorized', function () {
                    var event = $rootScope.$broadcast('$stateChangeStart', {data: {authorizedRoles: USER_ROLES.admin}});
                    expect(event.defaultPrevented).to.be.true;
                });

                it('should distinguish between authorization and authentication');

                it.skip('should allow continuation if the user is authenticated', function () {
                    Session.create(user.id, user.user, user.user.roles);
                    var event = $rootScope.$broadcast('$stateChangeStart', {data: {authorizedRoles: USER_ROLES.admin}});
                    expect(event.defaultPrevented).to.be.false;
                });
            });
        });
    });
});
