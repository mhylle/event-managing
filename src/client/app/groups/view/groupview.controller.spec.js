/* jshint -W117, -W030 */
describe('GroupViewController', function () {
    var controller;
    var groups = mockData.getMockGroups();
    var users = mockData.getMockUsers();

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

            describe('Status property', function () {
                it('should have a status.message field', function () {
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

                it('should have a group', function () {
                    expect(controller.group).to.exist;
                });

                describe('Groups and Users', function () {
                    describe('Users in a group', function () {
                        it('should have a userlist', function () {
                            expect(controller.users).to.exist;
                        });

                        it('should have a userlist with users', function () {
                            expect(controller.users).to.have.length.above(0);
                        });

                        it('should have a user status code of ok', function () {
                            expect(controller.status.users).to.equal('ok');
                        });

                        describe('Pagination', function () {
                            it('should calculate the amount of pages needed to show all users', function () {
                                expect(controller.pageCount()).to.be.above(0);
                                expect(controller.pageCount()).to.equal(2);
                            });
                        });

                        describe('Add/remove users', function() {
                            it.skip('should add a user to a group when calling the add user function', function() {
                                controller.addUserToGroup(users[0]);
                                expect(controller.group.users).to.contain(users[0]);
                            });
                            it('should remove a user to a group when calling the remove user function');
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
                    });
                });
            });
        });
    });
});
