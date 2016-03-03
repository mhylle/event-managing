/* jshint -W117, -W030 */
describe('GroupViewController', function () {
    var controller;
    var mockGroups = groupMockData.getMockGroups();
    var mockUsers = groupMockData.getMockUsers();
    var groupWithoutUserAdded = groupMockData.getMockGroupWithUsersWithoutUsersAdded();
    var groupWithUserAdded = groupMockData.getMockGroupWithUsersWithUsersAdded();
    var groupWithAllUsersAdded = groupMockData.getMockGroupWithAllUsersAdded();

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
                    return $q.when(mockGroups);
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
                                    return $q.when(groupWithUserAdded);
                                },
                                removeUserFromGroup: function () {
                                    return $q.when(groupWithoutUserAdded);
                                },
                                addUsersToGroup: function () {
                                    return $q.when(groupWithAllUsersAdded);
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
                            expect(controller.availableUsers).to.have.length(20);
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
                            it('should do nothing if no user was specified', function() {
                                controller.addUserToGroup();
                                $rootScope.$apply();
                                expect(controller.status.message).to.equal('No user selected');
                            });
                            it('should do nothing if no group was selected', function() {
                                controller.group = null;
                                var users = groupMockData.getMockUsers();
                                controller.addUserToGroup(users[3]);
                                $rootScope.$apply();
                                expect(controller.status.message).to.equal('No group selected');
                            });
                        });
                        describe('adding a list of users to a group', function () {
                            it('When adding users to a group it should be removed from the available users group',
                                function () {
                                    var users = groupMockData.getMockUsers();
                                    expect(controller.availableUsers).to.contain(users[4]);
                                    expect(controller.availableUsers).to.contain(users[5]);
                                    controller.addAllUsersToGroup();
                                    $rootScope.$apply();
                                    expect(controller.availableUsers).not.to.contain(users[4]);
                                    expect(controller.availableUsers).not.to.contain(users[5]);
                                    expect(controller.status.message).to.equal('All users not in the group ' +
                                        'was added to the group.');
                                });

                            it('the list of available users should not include users already in a group',
                                function () {
                                    expect(controller.group.users).to.exist;
                                    expect(controller.group.users).to.have.length.above(0);
                                    expect(controller.availableUsers).to.exist;
                                    controller.addAllUsersToGroup();
                                    $rootScope.$apply();
                                    expect(controller.availableUsers).to.have.length(0);
                                    expect(lodash.difference(controller.availableUsers, controller.group.users))
                                        .to.deep.equal(controller.availableUsers);

                                });
                            it('should do nothing if no group was selected', function () {
                                controller.group = null;
                                controller.addAllUsersToGroup();
                                $rootScope.$apply();
                                expect(controller.status.message).to.equal('No group selected');
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
                                $rootScope.$apply();
                                expect(controller.status.message).to.equal('No user selected');
                            });

                            it('the list of available users should include users not in the group', function () {
                                expect(controller.group.users).to.exist;
                            });
                            it('should do nothing if no group was selected', function () {
                                controller.group = null;
                                var users = groupMockData.getMockUsers();
                                controller.removeUserFromGroup(users[2]);
                                $rootScope.$apply();
                                expect(controller.status.message).to.equal('No group selected');
                            });
                        });
                        it('should have a user status code of ok', function () {
                            expect(controller.status.users).to.equal('ok');
                        });

                        describe('Pagination', function () {
                            it('should calculate the amount of pages needed to show all users', function () {
                                expect(controller.pageCount()).to.be.above(0);
                                expect(controller.pageCount()).to.equal(2);
                            });
                            it('should change page to specified page', function () {
                                expect(controller.totalPages).to.be.above(1);
                                controller.pageChanged(1);
                                $rootScope.$apply();
                                expect(controller.currentPage).to.equal(1);
                            });
                        });

                        describe('Failed user service', function () {
                            beforeEach(function () {
                                var scope = $rootScope.$new();
                                var gs = {
                                    getGroups: function () {
                                        return $q.when(mockGroups);
                                    },
                                    getGroup: function () {
                                        return $q.when(mockGroups[1]);
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
        describe('Backend failures', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var us = {
                    getUsers: function () {
                        return $q.when(mockUsers);
                    }
                };
                controller = $controller('groupviewcontroller', {
                    userservice: us,
                    $scope: scope,
                    $stateParams: {id: 1}
                });

            });
            it.skip('should handle a service 500 response correctly', function () {
                var user = _.find(mockUsers, function (u) {
                    return parseInt(u.id) === 1;
                });
                //var group = _.find(mockGroups, function (g) {
                //    return parseInt(g.id) === 1;
                //});
                $httpBackend.expectGET('/api/group/id/1').respond(groupWithoutUserAdded);
                $httpBackend.whenDELETE('/api/group/id/1/user/id/1').respond(500, null);
                $httpBackend.flush();
                controller.removeUserFromGroup(user);
                expect(controller.group).to.exist;
                expect(controller.group.users).to.exist;
                //expect(controller.status.code).to.equal('failed');
                expect(controller.status.message).to.equal('failed');
            });
        });
    });
});
