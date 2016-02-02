/* jshint -W117, -W030 */
describe('Group Icons', function () {
    var groups = mockData.getMockGroups();
    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('groupiconservice');
    });

    describe('Icon management', function () {
        it('Should get the na.png icon when called with no group', function () {
            var groupIcon = groupiconservice.getIcon();
            expect(groupIcon).to.equal('na.png');
        });

        it('Should get the open.png icon when the group is public', function () {
            var groupIcon = groupiconservice.getIcon(groups[0]);
            expect(groupIcon).to.equal('open.png');
        });

        it('Should get the lock.jpg icon when the group is private', function () {
            var groupIcon = groupiconservice.getIcon(groups[1]);
            expect(groupIcon).to.equal('lock.jpg');
        });
        it('Should get the na.png icon when the group type is unknown', function () {
            var groupIcon = groupiconservice.getIcon(groups[2]);
            expect(groupIcon).to.equal('na.png');
        });
    });
});
