/* jshint -W117, -W030 */
describe('GroupViewController', function () {
    var controller;
    var groups = groupMockData.getMockGroups();
    var mockUsers = groupMockData.getMockUsers();
    var groupWithoutUserAdded = groupMockData.getMockGroupWithUsersWithoutUsersAdded();
    var groupWithUserAdded = groupMockData.getMockGroupWithUsersWithUsersAdded();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('$controller',
            '$rootScope',
            '$stateParams',
            '$httpBackend',
            '$q',
            'Logger',
            'groupservice',
            'userservice',
            'lodash');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var gs = {
                getGroups: function () {
                    return $q.when(groups);
                },
                getGroup: function () {
                    return $q.when(groupWithoutUserAdded);
                },
                addUserToGroup: function () {
                    return $q.when({data: {status: 'ok', group: groupWithUserAdded}});
                },
                removeUserFromGroup: function () {
                    return $q.when({data: {status: 'ok', group: groupWithoutUserAdded}});
                }
            };

            var us = {
                getUsers: function () {
                    return $q.when(mockUsers);
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

                it('should have a group', function () {
                    expect(controller.group).to.exist;
                });

                describe('Groups and Users', function () {
                    describe('Users in a group', function () {
                        beforeEach(function () {
                            var scope = $rootScope.$new();
                            var gs = {
                                getGroup: function () {
                                    return $q.when(groupWithoutUserAdded);
                                },
                                addUserToGroup: function () {
                                    return $q.when({data: {status: 'ok', group: groupWithUserAdded}});
                                },
                                removeUserFromGroup: function () {
                                    return $q.when({data: {status: 'ok', group: groupWithoutUserAdded}});
                                }
                            };

                            var us = {
                                getUsers: function () {
                                    return $q.when(mockUsers);
                                }
                            };
                            controller = $controller('groupviewcontroller', {
                                groupservice: gs,
                                userservice: us,
                                $scope: scope,
                                $stateParams: {id: 1}
                            });
                            $rootScope.$apply();
                        });
                        it('should have a list of availableusers', function () {
                            expect(controller.availableUsers).to.exist;
                        });

                        it('should have a list of availableusers with content', function () {
                            expect(controller.availableUsers).to.have.length.above(0);
                            expect(controller.availableUsers).to.have.length(4);
                        });

                        describe('adding a user to a group', function () {
                            it('When adding a user to a group it should be removed from the available users group',
                                function () {
                                    var users = groupMockData.getMockUsers();
                                    expect(controller.availableUsers).to.contain(users[3]);
                                    controller.addUserToGroup(users[3]);
                                    $rootScope.$apply();
                                    expect(controller.availableUsers).not.to.contain(users[3]);
                                    expect(controller.status.message).to.equal('User successfully added to group');
                                });

                            it('the list of available users should not include users already in a group',
                                function () {
                                    expect(controller.group.users).to.exist;
                                    expect(controller.group.users).to.have.length.above(0);
                                    expect(controller.availableUsers).to.exist;
                                    expect(controller.availableUsers).to.have.length.above(0);
                                    expect(lodash.difference(controller.availableUsers, controller.group.users))
                                        .to.deep.equal(controller.availableUsers);

                                });

                        });
                        describe('removing a user from a group', function () {
                            it('When removing a user from a group it should be added to the available users group',
                                function () {
                                    var users = groupMockData.getMockUsers();
                                    expect(controller.availableUsers).to.contain(users[2]);
                                    controller.addUserToGroup(users[2]);
                                    $rootScope.$apply();
                                    expect(controller.availableUsers).not.to.contain(users[2]);
                                    expect(controller.status.message).to.equal('User successfully added to group');

                                    controller.removeUserFromGroup(users[2]);
                                    $rootScope.$apply();
                                    expect(controller.availableUsers).to.contain(users[2]);
                                    expect(controller.status.message).to.equal('User successfully removed from group');
                                });
                            it('no user is selected the status message should be No user selected', function () {
                                controller.removeUserFromGroup();
                                expect(controller.status.message).to.equal('No user selected');
                            });

                            it('the list of available users should include users not in the group', function () {
                                expect(controller.group.users).to.exist;
                            });
                        });
                        it('should have a user status code of ok', function () {
                            expect(controller.status.users).to.equal('ok');
                        });

                        describe('Pagination', function () {
                            it('should calculate the amount of pages needed to show all users', function () {
                                expect(controller.pageCount()).to.be.above(0);
                                expect(controller.pageCount()).to.equal(1);
                            });
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
        describe.skip('Backend failures', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                controller = $controller('groupviewcontroller', {
                    $scope: scope,
                    $stateParams: {id: 1}
                });
            });
            it('should handle a service 500 response correctly', function () {
                var user = _.find(users, function (u) {
                    return parseInt(u.id) === 1;
                });
                var group = _.find(groups, function (g) {
                    return parseInt(g.id) === 1;
                });
                $httpBackend.whenDELETE('/api/group/id/1/user/id/1').respond(500, null);
                controller.removeUserFromGroup(user);
                //        $rootScope.$apply();
                //        //expect(controller.group).to.exist;
                //        //expect(controller.group.users).to.exist;
                //        //expect(controller.group.users).not.to.contain(userToAddToGroup);
            });
        });
    });
});
