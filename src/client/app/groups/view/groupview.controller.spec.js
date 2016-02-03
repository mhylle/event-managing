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

                describe('Users in a group', function () {
                    it('should have a userlist', function () {
                        expect(controller.users).to.exist;
                    });

                    it('should have a userlist with users', function () {
                        expect(controller.users).to.have.length.above(0);
                    });

                    it('should have a user status code of ok', function() {
                        expect(controller.status.users).to.equal('ok');
                    });

                    describe('Failed user service', function () {
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
                                    return $q.when({});
                                }
                            };
                            controller = $controller('groupviewcontroller', {
                                groupservice: gs,
                                userservice: us,
                                $scope: scope,
                                $stateParams: {id: 1}
                            });
                        });
                        it.skip('should fail properly if user service is not working', function () {
                            expect(controller.status.users).to.equal('failed');
                        });
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
});
