///* jshint -W117, -W030 */
//describe('Controller: schema.security.SecurityController', function () {
//
//    var sandbox;
//    var controller;
//
//    // load the controller's module
//    beforeEach(function () {
//        bard.appModule('schema.security');
//        bard.inject('$controller', '$rootScope', 'schema.logger');
//    });
//
//    beforeEach(function () {
//        controller = $controller('SecurityController');
//        $rootScope.$apply();
//    });
//
//    beforeEach(function () {
//        sandbox = sinon.sandbox.create();
//        sandbox.stub(window.console, 'log');
//        sandbox.stub(window.console, 'error');
//    });
//
//    afterEach(function () {
//        sandbox.restore();
//    });
//
//    bard.verifyNoOutstandingHttpRequests();
//
//    describe('Security Controller', function () {
//        it('should be created successfully', function () {
//            expect(controller).to.be.defined;
//        });
//
//        //describe('it should never log to the console', function () {
//        //    sinon.assert.notCalled(console.log);
//        //    sinon.assert.notCalled(console.error);
//        //});
//
//        describe('after activate', function () {
//            it('should have title of SecurityController', function () {
//                expect(controller.title).to.equal('SecurityController');
//            });
//        });
//
//        describe('Should be able to login with user tte', function () {
//            it('should login successfully with tte', function () {
//                controller.username = 'tte';
//                controller.password = 'tte';
//                controller.login();
//                expect(controller.status).to.equal('Login Successful.');
//            });
//
//            it('should fail login without tte', function () {
//                controller.username = 'mah';
//                controller.password = 'mah';
//                controller.login();
//                expect(controller.status).to.equal('Login Failed');
//            });
//        });
//    });
//});
