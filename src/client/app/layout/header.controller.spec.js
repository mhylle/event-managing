/* jshint -W117, -W030 */
describe('HeaderController', function () {
    var controller;

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-header');
        bard.inject('$controller',
            '$rootScope',
            'Logger');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            controller = $controller('HeaderController', {
                $scope: scope
            });
        });
        describe('Setup', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have a title', function () {
                    expect(controller.title).to.exist;
                });

                it('should have a title of Header', function () {
                    expect(controller.title).to.equal('Header');
                });

                it('should have a logo', function () {
                    expect(controller.logo).to.exist;
                });

                it('should have a logo pointing to images/logo.png', function () {
                    expect(controller.logo).to.equal('images/logo.png');
                });
            });
        });
    });
});
