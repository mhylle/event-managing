/* jshint -W117, -W030 */
describe('SecurityController', function () {

    var sandbox;
    var controller;
    var user = userMockData.getMockSingleUser();

    // load the controller's module
    beforeEach(function () {
        bard.appModule('event-managing-security');
        bard.inject('$controller', '$rootScope', '$httpBackend', '$q', 'Logger');
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(window.console, 'log');
        sandbox.stub(window.console, 'error');
    });

    afterEach(function () {
        sandbox.restore();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Security Controller', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            controller = $controller('SecurityController', {
                $scope: scope
            });
        });
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('Status property', function () {
            it('should have a status field', function () {
                expect(controller.status).to.exist;
            });
            it('should have a status.message field', function () {
                expect(controller.status.message).to.exist;
            });
        });

        describe('after activate', function () {
            beforeEach(function () {
                $rootScope.$apply();
            });

            it('should have title of SecurityController', function () {
                expect(controller.title).to.equal('SecurityController');
            });
        });

        describe('Should be able to login with proper credentials', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                controller = $controller('SecurityController', {
                    $scope: scope
                });
            });
            it('should login successfully with mockUser', function () {
                controller.credentials.username = 'mockUser';
                controller.credentials.password = 'mockUser';
                $httpBackend.expectPOST('/api/login', controller.credentials).respond(
                    {status: 200, accesstoken: 'aaa', user: user}
                );
                controller.login(controller.credentials);
                $httpBackend.flush();
                expect(controller.status.message).to.equal('Login Successful.');
            });

        });

        describe('Should not be able to login with improper credentials', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                controller = $controller('SecurityController', {
                    $scope: scope
                });
            });

            it('should fail login with mockNotAUser', function () {
                controller.credentials.username = 'mockNotAUser';
                controller.credentials.password = 'mockNotAUser';
                $httpBackend.expectPOST('/api/login', controller.credentials).respond(
                    {status: 401, accesstoken: null, user: null}
                );
                controller.login(controller.credentials);
                $httpBackend.flush();
                expect(controller.status.message).to.equal('Login failed');
            });
        });

        describe('Should not be able to login if the server fails', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                controller = $controller('SecurityController', {
                    $scope: scope
                });
            });

            it('should fail login with mockNotAUser', function () {
                controller.credentials.username = 'mockNotAUser';
                controller.credentials.password = 'mockNotAUser';
                $httpBackend.expectPOST('/api/login', controller.credentials).respond(500,
                    {info: 'Database is down'}
                );
                controller.login(controller.credentials);
                $httpBackend.flush();
                //$rootScope.$apply();
                expect(controller.status.message).to.equal(
                    'An error occurred when trying to login, please try again later, Database is down');
            });
        });

        describe('Should not be able to login with no credentials', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var ss = {
                    login: function () {
                        return $q.when(false);
                    }
                };

                controller = $controller('SecurityController', {
                    $scope: scope,
                    SecurityService: ss
                });
            });

            it('should fail login with mockNotAUser', function () {
                controller.login();
                $rootScope.$apply();
                expect(controller.status.message).to.equal('You must provide a username and password');
            });
        });
    });
});
