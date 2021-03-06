/* jshint -W117, -W030 */
describe('GroupListController', function () {
    var controller;
    var groups = groupMockData.getMockGroups();
    var mockuser = mockData.getMockSingleUser();
    var failedGroups = groupMockData.getFailedMockGroups();
    var crashedGroups = groupMockData.getCrashedMockGroups();
    var emptyGroups = groupMockData.getMockEmptyGroups();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('$controller', '$rootScope', '$q', '$httpBackend', '$log', 'SecurityService');
    });

    describe('Controller Initialization', function () {

        describe('With valid data', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var gs = {
                    getGroups: function () {
                        return $q.when(groups);
                    }
                };
                controller = $controller('grouplistcontroller', {
                    groupservice: gs,
                    $scope: scope
                });
            });
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have empty groups array before activation', function () {
                expect(controller.groups).to.exist;
            });

            describe('After activation', function () {
                beforeEach(function () {
                    bard.inject('$state');
                    $rootScope.$apply();
                });

                it('should have groups', function () {
                    expect(controller.groups).to.have.length.above(0);
                });

                it('should have mock events', function () {
                    expect(controller.groups).to.have.length(4);
                });

                it('should have an empty status message', function () {
                    expect($rootScope.status.message).to.be.empty;
                });

                it('should have a status that is ok', function () {
                    expect($rootScope.status.status).to.equal('ok');
                });

                describe('Icon management', function () {
                    it('Should get the open.png icon when the group is public', function () {
                        var groupIcon = controller.getIcon(controller.groups[0]);
                        expect(groupIcon).to.equal('open.png');
                    });
                    it('Should get the lock.jpg icon when the group is private', function () {
                        var groupIcon = controller.getIcon(controller.groups[1]);
                        expect(groupIcon).to.equal('lock.jpg');
                    });
                    it('Should get the na.png icon when the group type is unknown', function () {
                        var groupIcon = controller.getIcon(controller.groups[2]);
                        expect(groupIcon).to.equal('na.png');
                    });
                });

                describe('Should navigate to the correct state when choosing a group', function () {
                    beforeEach(function () {
                        $log.info.logs = [];
                    });

                    it('should log the navigation attempt', function () {
                        var group = controller.groups[1];
                        controller.gotoGroup(group);
                        $rootScope.$apply();
                        expect($log.info.logs[0][0]).to.contain('trying to navigate to group ' + group.name);
                    });

                    it('should prevent navigation to groups.view if not logged in.', function () {
                        var group2 = controller.groups[1];
                        controller.gotoGroup(group2);
                        $rootScope.$apply();
                        expect($state).to.be.defined;
                        expect($state.go).to.be.defined;
                        expect($state.current.name).to.equal('');
                    });

                    it('should navigate to groups.view on gotoGroup', function () {
                        var credentials = {
                            username: 'mah', password: 'mah'
                        };
                        $httpBackend.expectPOST('/api/login')
                            .respond({status: 200, accesstoken: 'mah', user: mockuser});
                        SecurityService.login(credentials);
                        $httpBackend.flush();
                        $rootScope.$apply();

                        $httpBackend.whenGET('app/groups/groups.html').respond();
                        var group2 = controller.groups[1];
                        controller.gotoGroup(group2);
                        $rootScope.$apply();
                        expect($state.current.name).to.equal('groups.view');
                    });
                });
            });
        });

        describe('With undefined service response', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var ls = {
                    getGroups: function () {
                        return $q.when(crashedGroups);
                    }
                };
                controller = $controller('grouplistcontroller', {
                    groupservice: ls,
                    $scope: scope
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have groups', function () {
                    expect(controller.groups).to.have.length(0);
                });

                it('should have a response.status.code error', function () {
                    expect($rootScope.status.status).to.equal('error');
                });

                it('should have a status message', function () {
                    expect($rootScope.status.message).not.to.be.empty;
                });

            });
        });

        describe('With failed service response', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var gs = {
                    getGroups: function () {
                        return $q.when(failedGroups);
                    }
                };
                controller = $controller('grouplistcontroller', {
                    groupservice: gs,
                    $scope: scope
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have groups', function () {
                    expect(controller.groups).to.have.length(0);
                });

                it('should have a response.status.code error', function () {
                    expect($rootScope.status.status).to.equal('failed');
                });

                it('should have a status message', function () {
                    expect($rootScope.status.message).not.to.be.empty;
                });

            });
        });
        describe('With empty result', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var ls = {
                    getGroups: function () {
                        return $q.when(emptyGroups);
                    }
                };
                controller = $controller('grouplistcontroller', {
                    groupservice: ls,
                    $scope: scope
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have groups array', function () {
                    expect(controller.groups).to.exist;
                });

                it('should not have groups', function () {
                    expect(controller.groups).to.have.length(0);
                });

                it('should have a response.status.code ok', function () {
                    expect($rootScope.status.status).to.equal('ok');
                });

                it('should have not have a status message', function () {
                    expect($rootScope.status.message).to.be.empty;
                });
            });
        });
    });
});
