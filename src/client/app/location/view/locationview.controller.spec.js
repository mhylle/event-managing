/* jshint -W117, -W030 */
describe('LocationViewController', function () {
    var controller;
    var locations = locationMockData.getMockLocations();

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
                    return $q.when(locations[0]);
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

                describe('Location name', function() {
                    it('should exist', function () {
                        expect(controller.location.name).to.exist;
                    });

                    it('should have a value', function () {
                        expect(controller.location.name).not.to.be.empty;
                    });
                });
            });
        });
        describe.skip('Backend failures', function () {
            beforeEach(function () {
                var scope = $rootScope.$new();

                controller = $controller('locationviewcontroller', {
                    $scope: scope,
                    $stateParams: {id: 1}
                });
            });
            it('should handle a service 500 response correctly', function () {
                var location = _.find(locations, function (l) {
                    return parseInt(l.id) === 1;
                });
                $httpBackend.whenGET('/api/location/id/1').respond(500, null);
            });
        });
    });
});
