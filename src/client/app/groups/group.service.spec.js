/* jshint -W117, -W030 */
describe('GroupService', function () {
    var groups = mockData.getMockGroups();
    var users = mockData.getMockUsers();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('$rootScope', '$httpBackend', 'groupservice', 'userservice');
    });

    it('is the groupservice', function () {
        expect(groupservice.name).to.equal('groupservice');
    });

    describe('getGroups', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/api/group').respond(
                groups
            );
        });
        it('returns a value', function () {
            var groupResult = groupservice.getGroups().then(function (response) {
                groupResult = response;
            });
            expect(groupResult).to.exists;
        });
        it('Retrieves an amount of groups', function () {
            var groupResult = [];
            groupservice.getGroups().then(function (results) {
                groupResult = results;
            });
            $httpBackend.flush();
            expect(groupResult).to.have.length.above(0);
        });
    });

    describe('getGroup', function () {
        it('Should contain a group', function () {
            $httpBackend.expectGET('/api/group/id/1').respond(
                groups[0]
            );
            var groupResult = [];
            groupservice.getGroup(1).then(function (results) {
                groupResult = results;
            });
            $httpBackend.flush();
            expect(groupResult).to.exists;
        });

        it('Should get the same group if the same id is supplied', function () {
            var group1;
            var group2;

            group1 = getGroup(1);
            group2 = getGroup(1);

            expect(group1.id).to.equal(group2.id);
        });

        it('Should get different groups based on the id supplied', function () {
            var group1 = getGroup(2);
            var group2 = getGroup(3);

            expect(group1).to.not.equal(group2);
        });
    });

    describe('addUserToGroup', function () {
        it('Should not add null users to a group', function() {
            var group = getGroup(1);
            expect(group.users).not.to.exist;
            var resultGroup = groupservice.addUserToGroup(group, null);
            expect(resultGroup.users).not.to.exist;
        });
        it.skip('Should add users to a group', function() {
            var group = getGroup(1);
            expect(group.users).not.to.exist;
            var user = getUser(1);
            expect(user).to.exist;
            var resultGroup = groupservice.addUserToGroup(group, user);
            expect(resultGroup.users).to.exist;
        });
    });

    function getGroup(id) {
        var group = {};
        $httpBackend.expectGET('/api/group/id/' + id).respond(
            groups[id - 1]
        );
        groupservice.getGroup(id).then(function (results) {
            group = results;
        });
        $httpBackend.flush();
        return group;
    }
    function getUser(id) {
        var user = {};
        $httpBackend.expectGET('/api/user/id/' + id).respond(
            users[id - 1]
        );
        userservice.getUser(id).then(function (results) {
            user = results;
        });
        $httpBackend.flush();
        return user;
    }
});
