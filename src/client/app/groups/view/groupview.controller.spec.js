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
                    return $q.when(groups[0]);
                }
            };

            var us = {
                getUsers: function () {
                    return $q.when();
                }
            };
            controller = $controller('groupviewcontroller', {
                groupservice: gs,
                userservice: us,
                $scope: scope
            });
        });
        describe.skip('With valid data', function () {

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            describe.skip('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have a group', function () {
                    expect(controller.group).to.exist;
                });
            });
        });
    });
});
