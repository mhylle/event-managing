/* jshint -W117, -W030 */
describe('LocationListController', function () {
    var controller;
    //var groups = mockData.getMockGroups();
    //var failedGroups = mockData.getFailedMockGroups();
    //var crashedGroups = mockData.getCrashedMockGroups();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-locations');
        bard.inject('$controller', '$rootScope', '$q', '$state');
    });

    describe.skip('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var gs = {
                getGroups: function () {
                    return $q.when(groups);
                }
            };
            controller = $controller('locationlistcontroller', {
                groupservice: gs,
                $scope: scope
            });
        });
        describe('With valid data', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have empty locations array before activation', function () {
                expect(controller.locations).to.exist;
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

                it('should have locations', function () {
                    expect(controller.locations).to.have.length.above(0);
                });

                it('should have mock locations', function () {
                    expect(controller.locations).to.have.length(3);
                });

                it('should have an empty status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

                it('should have a status.code', function () {
                    expect(controller.status.code).to.exist;
                });

                it('should have a response.status that is ok', function () {
                    expect(controller.status.code).to.equal('ok');
                });
            });
            describe.skip('Should navigate to the correct state when choosing a location', function () {
                beforeEach(function () {
                    //bard.inject('$state');
                    $rootScope.$apply();
                });
                it('should navigate to locations.view on gotoLocation', function () {
                    //controller.gotoEvent(1);
                    //$rootScope.$apply();
                    //expect($state).is('events.view');
                });
            });

        });

        describe.skip('With failed service', function () {
            beforeEach(function () {
                var ls = {
                    getLocations: function () {
                        return $q.when(failedLocations);
                    }
                };
                controller = $controller('locationlistcontroller', {
                    locationservice: ls,
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have locations', function () {
                    expect(controller.locations).to.have.length(0);
                });

                it('should have a response.status that failed', function () {
                    expect(controller.status.response).to.equal('RESPONSE_ERROR');
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe.skip('With crashed service', function () {
            beforeEach(function () {
                var ls = {
                    getLocations: function () {
                        return $q.when(crashedLocations);
                    }
                };
                controller = $controller('locationlistcontroller', {
                    locationservice: ls
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have locations', function () {
                    expect(controller.locations).to.have.length(0);
                });

                it('should have no response.status ', function () {
                    expect(controller.status.response).not.to.exist;
                });

                it('should have a response.status.code warning', function () {
                    expect(controller.status.code).to.equal('warning');
                });

                it('should have not have a status message', function () {
                    expect(controller.status.message).to.be.empty;
                });
            });
        });
    });
});
