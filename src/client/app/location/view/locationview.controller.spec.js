/* jshint -W117, -W030 */
describe('LocationViewController', function () {
    var controller;
    var locations = locationMockData.getMockLocations();
    var location = locationMockData.getMockLocation();
    var crashedLocation = locationMockData.getMockCrashedLocations();
    var failedLocation = locationMockData.getMockFailedLocations();

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-locations');
        bard.inject('$controller',
            '$rootScope',
            '$stateParams',
            '$httpBackend',
            '$q',
            'Logger',
            'locationservice'
        );
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var scope = $rootScope.$new();

            var ls = {
                getLocations: function () {
                    return $q.when(locations);
                },
                getLocation: function () {
                    return $q.when(location);
                }
            };

            controller = $controller('locationviewcontroller', {
                locationservice: ls,
                $scope: scope,
                $stateParams: {id: 1}
            });
        });
        describe('With valid data', function () {
            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have a null location', function () {
                expect(controller.location).to.be.null;
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

                it('should have a location', function () {
                    expect(controller.location).to.exist;
                });

                describe('Location name', function () {
                    it('should exist', function () {
                        expect(controller.location.name).to.exist;
                    });

                    it('should have a value', function () {
                        expect(controller.location.name).not.to.be.empty;
                    });
                });
            });
        });
        describe('Failed service', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var ls = {
                    getLocations: function () {
                        return $q.when(failedLocation);
                    },
                    getLocation: function () {
                        return $q.when(failedLocation);
                    }
                };

                controller = $controller('locationviewcontroller', {
                    locationservice: ls,
                    $scope: scope,
                    $stateParams: {id: 1}
                });
                $rootScope.$apply();
            });

            it('should have a status code of failed', function () {
                expect(controller.status.code).to.equal('failed');
            });

            it('should have a status message', function () {
                expect(controller.status.message).to.equal('An unexpected error occurred');
            });

            it('should have not have a location', function () {
                expect(controller.location).to.be.null;
            });
        });

        describe('Crashed service', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                var ls = {
                    getLocations: function () {
                        return $q.when(crashedLocation);
                    },
                    getLocation: function () {
                        return $q.when(crashedLocation);
                    }
                };

                controller = $controller('locationviewcontroller', {
                    locationservice: ls,
                    $scope: scope,
                    $stateParams: {id: 1}
                });
                $rootScope.$apply();
            });

            it('should have a status code of failed', function () {
                expect(controller.status.code).to.equal('failed');
            });

            it('should have a status message', function () {
                expect(controller.status.message)
                    .to.equal('An error occurred while retrieving the location from the server');
            });

            it('should have not have a location', function () {
                expect(controller.location).to.be.null;
            });
        });
    });
});
