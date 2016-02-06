/* jshint -W117, -W030 */
describe('UserViewController', function () {
    var controller;
    var users = mockData.getMockUsers();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-users');
        bard.inject('$controller', '$rootScope', '$stateParams', '$q', 'Logger');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var us = {
                getUsers: function () {
                    return $q.when(users);
                },
                getUser: function (id) {
                    return $q.when(users[id - 1]);
                }
            };
            controller = $controller('userviewcontroller', {
                userservice: us,
                $scope: scope,
                $stateParams: {id: 1}
            });
        });
        describe('With valid data', function () {

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have a null user', function () {
                expect(controller.user).to.be.null;
            });

            describe('Status property', function () {
                it('should have a status field', function () {
                    expect(controller.status).to.exist;
                });
                it('should have a status.message field', function () {
                    expect(controller.status.message).to.exist;
                });
            });

            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have a user that exists', function () {
                    expect(controller.user).to.exist;
                });
                it('should have a user with id 1 ', function () {
                    expect(controller.user.id).to.equal(1);
                });
                it('should have a user with firstname Brandon', function () {
                    expect(controller.user.firstname).to.equal('Brandon');
                });
            });
        });
    });
})
;
