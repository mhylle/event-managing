/* jshint -W117, -W030 */
describe('GroupService', function () {
    var groups = groupMockData.getMockGroups();
    var mockUsers = groupMockData.getMockUsers();
    var groupWithoutUserAdded = groupMockData.getMockGroupWithUsersWithoutUsersAdded();
    var groupWithUserAdded = groupMockData.getMockGroupWithUsersWithUsersAdded();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('$rootScope', '$httpBackend', '$log', 'groupservice', 'userservice');
    });

    it('is the groupservice', function () {
        expect(groupservice.name).to.equal('groupservice');
    });

    describe('getGroups', function () {
        describe('success', function () {
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
                    groupResult = results.groups;
                });
                $httpBackend.flush();
                expect(groupResult).to.have.length.above(0);
            });
        });
        describe('failure', function() {
            it('should log an error whan an exception occurs', function () {
                $httpBackend.expectGET('/api/group').respond(500);
                var result = groupservice.getGroups();
                expect(result).to.be.fulfilled;
                $httpBackend.flush();
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });
        });
    });

    describe('getGroup', function () {
        describe('Success', function () {
            it('Should contain a group', function () {
                $httpBackend.expectGET('/api/group/id/1').respond(
                    {status: 'ok', info: '', group: groups.groups[0]}
                );
                var groupResult = [];
                groupservice.getGroup(1).then(function (results) {
                    groupResult = results.group;
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
        describe('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/group/id/1').respond(500);
                var groupResult = [];
                groupservice.getGroup(1).then(function (results) {
                    groupResult = results;
                });

                $httpBackend.flush();
                expect(groupResult).not.to.exist;
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/group/id/1').respond(500, {status: 'failed', info: 'no group found'}
                );
                var groupResult = [];
                groupservice.getGroup(1).then(function (results) {
                    groupResult = results;
                });
                $httpBackend.flush();
                expect(groupResult).not.to.exist;
            });

            it('should log an error whan an exception occurs', function () {
                $httpBackend.expectGET('/api/group/id/1').respond(500);
                var result = groupservice.getGroup(1);
                expect(result).to.be.fulfilled;
                $httpBackend.flush();
            });
        });
    });

    describe('addUserToGroup', function () {
        it('Should not add null users to a group', function () {
            var group = getGroup(1);
            expect(group.users).not.to.exist;
            var resultGroup = groupservice.addUserToGroup(group, null);
            expect(resultGroup).not.to.exist;
        });

        it('Should add users to a group', function () {
            var workingGroup = getGroup(1);
            expect(workingGroup.users).not.to.exist;
            var user = getUser(1);
            expect(user).to.exist;

            workingGroup.users = [user];

            $httpBackend.expectPUT('/api/group/id/' + workingGroup.id + '/user/id/' + user.id).respond(
                {status: 'ok', info: '', group: workingGroup}
            );

            var status;
            groupservice.addUserToGroup(workingGroup, user).then(function (response) {
                status = response.data.status;
                resultGroup = response.data.group;
            });
            $httpBackend.flush();
            expect(status).to.equal('ok');
            expect(resultGroup.users).to.exist;
        });
    });

    describe('addUsersToGroup', function () {
        it('Should not add null users to a group', function () {
            var group = getGroup(1);
            expect(group.users).not.to.exist;
            var resultGroup = groupservice.addUsersToGroup(group, null);
            expect(resultGroup).not.to.exist;
        });

        it('Should add users to a group', function () {
            var workingGroup = getGroup(1);
            expect(workingGroup).to.exist;
            expect(workingGroup.users).not.to.exist;
            var user1 = getUser(1);
            var user2 = getUser(2);
            var users = [user1, user2];
            expect(user1).to.exist;
            expect(user2).to.exist;

            workingGroup.users = users;

            $httpBackend.expectPUT('/api/group/id/' + workingGroup.id + '/users', users).respond(
                {status: 'ok', info: '', group: workingGroup}
            );

            var status;
            groupservice.addUsersToGroup(workingGroup, users).then(function (response) {
                status = response.data.status;
                resultGroup = response.data.group;
            });
            $httpBackend.flush();
            expect(status).to.equal('ok');
            expect(resultGroup.users).to.exist;

        });
    });
    describe('removeUserFromGroup', function () {
        it('Should not remove null users from a group', function () {
            var group = getGroup(1);
            expect(group.users).not.to.exist;
            var resultGroup = groupservice.removeUserFromGroup(group, null);
            expect(resultGroup).not.to.exist;
        });

        it('Should remove users from a group', function () {
            var resultGroup = null;
            var status;
            var user = getUser(3);
            expect(user).to.exist;
            $httpBackend.expectDELETE('/api/group/id/' + groupWithUserAdded.id + '/user/id/' + user.id).respond(
                groupWithoutUserAdded
            );

            groupservice.removeUserFromGroup(groupWithUserAdded, user).then(function (response) {
                status = response.data.status;
                resultGroup = response.data.group;
            });
            $httpBackend.flush();
            expect(status).to.equal('ok');
            expect(resultGroup.users).to.exist;
            expect(resultGroup.users).not.to.contain(user);
        });

        it('should log an error if the server returns an error', function() {
            var user = getUser(3);
            $httpBackend.expectDELETE('/api/group/id/' + groupWithUserAdded.id + '/user/id/' + user.id).respond(500);
            var promise = groupservice.removeUserFromGroup(groupWithUserAdded, user);
            expect(promise).to.be.fulfilled;
            $httpBackend.flush();
            expect($log.error.logs).not.to.be.empty;
            expect($log.error.logs).not.to.be.undefined;
        });
    });

    function getGroup(id) {
        var group = {};
        $httpBackend.expectGET('/api/group/id/' + id).respond(
            {status: 'ok', info: '', group: groups.groups[id - 1]}
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
            mockUsers[id - 1]
        );
        userservice.getUser(id).then(function (results) {
            user = results;
        });
        $httpBackend.flush();
        return user;
    }
});
