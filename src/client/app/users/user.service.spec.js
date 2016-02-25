/* jshint -W117, -W030 */
describe('UserService', function () {
    var users = userMockData.getMockUsers();

    beforeEach(function () {
        module('event-managing-users');
        bard.inject('$rootScope', '$httpBackend', '$log', 'userservice');
    });

    it('is the userservice', function () {
        expect(userservice.name).to.equal('userservice');
    });

    describe('getUsers', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/api/user').respond(
                users
            );
        });
        it('returns a value', function () {
            var userResult = userservice.getUsers().then(function (response) {
                userResult = response;
            });
            expect(userResult).to.exists;
        });
        it('Retrieves an amount of users', function () {
            var userResult = [];
            userservice.getUsers().then(function (results) {
                userResult = results.users;
            });
            $httpBackend.flush();
            expect(userResult).to.have.length.above(0);
        });

        describe.skip('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/user').respond(500);
                var userResult = [];
                userservice.getUsers().then(function (results) {
                    userResult = results;
                });
                $httpBackend.flush();
                expect(userResult).not.to.exist;
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/user').respond(500, {status: 'failed', info: 'no user found'});
                var userResult = [];
                userservice.getUsers().then(function (results) {
                    userResult = results;
                });
                $httpBackend.flush();
                expect(userResult).not.to.exist;
            });
        });
    });

    describe('getUser', function () {
        describe('Success', function () {
            it('Should contain a user', function () {
                $httpBackend.expectGET('/api/user/id/1').respond(
                    {status: 'ok', info: '', user: users.users[0]}
                );
                var userResult = [];
                userservice.getUser(1).then(function (results) {
                    userResult = results.user;
                });
                $httpBackend.flush();
                expect(userResult).to.exists;
            });

            it('Should get the same user if the same id is supplied', function () {
                var user1;
                var user2;

                user1 = getUser(1);
                user2 = getUser(1);

                expect(user1.id).to.equal(user2.id);
            });

            it('Should get different users based on the id supplied', function () {
                var user1 = getUser(2);
                var user2 = getUser(3);

                expect(user1).to.not.equal(user2);
            });
        });
        describe('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/user/id/1').respond(500);
                var userResult = [];
                userservice.getUser(1).then(function (results) {
                    userResult = results;
                });

                $httpBackend.flush();
                expect(userResult).not.to.exist;
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/user/id/1').respond(500, {status: 'failed', info: 'no user found'}
                );
                var userResult = [];
                userservice.getUser(1).then(function (results) {
                    userResult = results;
                });
                $httpBackend.flush();
                expect(userResult).not.to.exist;
            });
        });
    });

    function getUser(id) {
        var user = {};
        $httpBackend.expectGET('/api/user/id/' + id).respond(
            {status: 'ok', info:'', user: users.users[id - 1]}
        );
        userservice.getUser(id).then(function (results) {
            user = results;
        });
        $httpBackend.flush();
        return user;
    }
});
