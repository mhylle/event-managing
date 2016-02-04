/* jshint -W117, -W030 */
describe('GroupService', function () {
    var groups = mockData.getMockGroups();
    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('groupservice');
    });

    describe('getGroups', function () {

        it('Retrieves an amount of groups');
    });
    describe('getGroup', function () {
        it('Should contain a group');
    });
});
