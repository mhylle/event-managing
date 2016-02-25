/* jshint -W117, -W030 */
describe('LocationListController', function () {
    var controller;
    var locations = locationMockData.getMockLocations();
    var failedLocations = locationMockData.getMockFailedLocations();
    var emptyLocations = locationMockData.getMockEmptyLocations();
    var notOkLocations = locationMockData.getMockCrashedLocations();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-locations');
        bard.inject('$controller', '$rootScope', '$q', '$state');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var ls = {
                getLocations: function () {
                    return $q.when(locations);
                }
            };
            controller = $controller('locationlistcontroller', {
                locationservice: ls,
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
                    expect(controller.locations).to.have.length(10);
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

        describe('With undefined service response', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var ls = {
                    getLocations: function () {
                        return $q.when(failedLocations);
                    }
                };
                controller = $controller('locationlistcontroller', {
                    locationservice: ls,
                    $scope: scope
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have locations', function () {
                    expect(controller.locations).to.have.length(0);
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('failed');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe('With failed service response', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var ls = {
                    getLocations: function () {
                        return $q.when(notOkLocations);
                    }
                };
                controller = $controller('locationlistcontroller', {
                    locationservice: ls,
                    $scope: scope
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have locations', function () {
                    expect(controller.locations).to.have.length(0);
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe('With empty result', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();
                var ls = {
                    getLocations: function () {
                        return $q.when(emptyLocations);
                    }
                };
                controller = $controller('locationlistcontroller', {
                    locationservice: ls,
                    $scope: scope
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have locations array', function () {
                    expect(controller.locations).to.exist;
                });

                it('should not have locations', function () {
                    expect(controller.locations).to.have.length(0);
                });

                it('should have a response.status.code warning', function () {
                    expect(controller.status.code).to.equal('ok');
                });

                it('should have not have a status message', function () {
                    expect(controller.status.message).to.be.empty;
                });
            });
        });
    });
});
