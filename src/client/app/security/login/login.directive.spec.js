/* jshint -W117, -W030 */
describe('LoginDirective', function () {
    var element;
    var scope;

    // load the controller's module
    beforeEach(function () {
        bard.appModule('event-managing-security');
        bard.inject('$rootScope', '$compile', 'AUTH_EVENTS');
    });

    beforeEach(function () {
        scope = $rootScope.$new();
        element = '<login-dialog>';

        element = $compile(element)(scope);
        scope.$digest();
    });

    bard.verifyNoOutstandingHttpRequests();
    describe.skip('Show dialog', function() {
        it('should show the logindialog when the user is not logged in', function() {
            var isolated = element.isolateScope();
            expect(isolated.visible).to.be.false;
        });
    })
});
