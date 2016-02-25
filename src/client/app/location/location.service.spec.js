/* jshint -W117, -W030 */
describe('LocationService', function () {
    var locations = locationMockData.getMockLocations();

    beforeEach(function () {
        module('event-managing-locations');
        bard.inject('$rootScope', '$httpBackend', '$log', 'locationservice');
    });

    it('is the locationservice', function () {
        expect(locationservice.name).to.equal('locationservice');
    });

    describe('getLocations', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/api/location').respond(
                locations
            );
        });
        describe('success', function() {
            it('returns a value', function () {
                var locationResult = locationservice.getLocations().then(function (response) {
                    locationResult = response;
                });
                expect(locationResult).to.exists;
            });
            it('Retrieves an amount of locations', function () {
                var locationResult = [];
                locationservice.getLocations().then(function (response) {
                    locationResult = response.locations;
                });
                $httpBackend.flush();
                expect(locationResult).to.have.length.above(0);
            });
        });

        describe.skip('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/location').respond(500);
                var locationResult = [];
                locationservice.getLocations().then(function (results) {
                    locationResult = results;
                });
                $httpBackend.flush();

                expect(locationResult).not.to.exist;
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/location').respond(500, {status: 'failed', info: 'no locations found'}
                );
                var locationResult = [];
                locationservice.getLocations().then(function (results) {
                    locationResult = results;
                });
                $httpBackend.flush();
                expect(locationResult).not.to.exist;
            });
        });
    });

    describe('getLocation', function () {
        describe('Success', function () {
            it('Should contain a location', function () {

                $httpBackend.expectGET('/api/location/id/1').respond(
                    {status: 'ok', info: '', location: locations.locations[0]}
                );
                var locationResult = [];
                locationservice.getLocation(1).then(function (results) {
                    locationResult = results;
                });
                //$httpBackend.flush();
                expect(locationResult).to.exists;
            });

            it('Should get the same location if the same id is supplied', function () {
                var location1;
                var location2;

                location1 = getLocation(1);
                location2 = getLocation(1);

                expect(location1.id).to.equal(location2.id);
            });

            it('Should get different groups based on the id supplied', function () {
                var location1 = getLocation(2).location;
                var location2 = getLocation(3).location;

                expect(location1).to.not.equal(location2);
            });
        });
        describe('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/location/id/1').respond(500);
                var locationResult = [];
                locationservice.getLocation(1).then(function (results) {
                    locationResult = results;
                });

                $httpBackend.flush();
                expect(locationResult).not.to.exist;
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/location/id/1').respond(500, {status: 'failed', info: 'no location found'}
                );
                var locationResult = [];
                locationservice.getLocation(1).then(function (results) {
                    locationResult = results;
                });
                $httpBackend.flush();
                expect(locationResult).not.to.exist;
            });
        });
    });

    function getLocation(id) {
        var location = {};
        $httpBackend.expectGET('/api/location/id/' + id).respond(
            {status: 'ok', info: '', location: locations.locations[id - 1]}
        );
        locationservice.getLocation(id).then(function (response) {
            location = response;
        });
        $httpBackend.flush();
        return location;
    }

});
