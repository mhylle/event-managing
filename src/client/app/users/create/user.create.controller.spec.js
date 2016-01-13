/* jshint -W117, -W030 */
describe('Outer 1', function () {
    it('1 should be equal to 1', function () {
        expect(1).to.equal(1);
        describe('Inner 1', function () {
            it('2 should be equal to 2', function () {
                expect(2).to.equal(2);
            });

        });
        describe('Inner 2', function () {
            it('2 should be equal to 2', function () {
                expect(2).to.equal(2);
            });
        });
    });

    describe('Outer 2', function () {
        //beforeEach();
        describe('Inner 3', function () {
            it('3 should be equal to 3', function () {
                expect(3).to.equal(3);
            });
        });
        describe('Inner 4', function () {
            //beforeEach()
            it('3 should be equal to 3', function () {
                expect(3).to.equal(3);
            });
        });
    });
    //// load the controller's module
    //beforeEach(module('schema.user'));
    //

    //beforeEach(function() {
    //    var myMocks = angular.module('MyAppMocks', []);
    //    myMocks.factory('')
    //})
    //var ctrl, scope, lgr;
    ////
    ////// Initialize the controller and a mock scope
    //beforeEach(inject(function ($controller, $rootScope, logger) {
    //    lgr = logger;
    //    scope = $rootScope.$new();
    //    ctrl = $controller('UserCreateController', {
    //        $scope: scope,
    //        logger: lgr
    //    });
    //}));
    //
    //it('should be defined', function () {
    //    expect(ctrl).toBeDefined();
    //});
});
