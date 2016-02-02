/* jshint -W117, -W030 */
describe('GroupViewController', function () {
    var controller;
    var groups = mockData.getMockGroups();
    var users = mockData.getMockUsers();
    var failedGroups = mockData.getFailedMockGroups();
    var crashedGroups = mockData.getCrashedMockGroups();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('$controller', '$rootScope', '$stateParams', '$q', 'Logger', 'groupservice', 'userservice');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();
            var gs = {
                getGroups: function () {
                    return $q.when(groups);
                },
                getGroup: function () {
                    return $q.when(groups[1]);
                }
            };

            var us = {
                getUsers: function () {
                    return $q.when(users);
                }
            };
            controller = $controller('groupviewcontroller', {
                groupservice: gs,
                userservice: us,
                $scope: scope,
                $stateParams: {id: 1}
            });
        });
        describe('With valid data', function () {

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have a null group', function () {
                expect(controller.group).to.be.null;
            });

            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have a group', function () {
                    expect(controller.group).to.exist;
                });

                it('should have a userlist', function () {
                    expect(controller.users).to.exist;
                });

                it('should have a userlist with users', function () {
                    expect(controller.users).to.have.length.above(0);
                });

                describe('Pagination', function () {
                    it('should calculate the amount of pages needed to show all users', function () {
                        expect(controller.pageCount()).to.be.above(0);
                        expect(controller.pageCount()).to.equal(2);
                    });
                });
            });
        });
    });
});
