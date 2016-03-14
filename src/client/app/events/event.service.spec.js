/* jshint -W117, -W030 */
describe('EventService', function () {
    var events = mockData.getMockEvents();
    var mockUsers = mockData.getMockUsers();
    var mockCreateEvent = mockData.getMockCreateEvent;
    var user = mockData.getMockSingleUser();
    var eventWithoutUserAdded = mockData.getMockEventWithoutUser();
    var eventWithUserAdded = mockData.getMockEventWithUser();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$rootScope', '$httpBackend', '$log', 'EventService', 'userservice');
    });

    it('is the eventservice', function () {
        expect(EventService.name).to.equal('EventService');
    });

    describe('getEvents', function () {
        describe('success', function () {

            it('returns a value', function () {
                $httpBackend.expectGET('/api/event').respond(events);
                var eventResult = EventService.getEvents().then(function (response) {
                    eventResult = response;
                });
                expect(eventResult).to.exists;
            });
            it('Retrieves an amount of events', function () {
                $httpBackend.expectGET('/api/event').respond(events);
                var eventResult = [];
                EventService.getEvents().then(function (results) {
                    eventResult = results.events;
                });
                $httpBackend.flush();
                expect(eventResult).to.have.length.above(0);
            });
        });

        describe('Failure', function () {
            it('Should return an empty array if the server returns nothing', function () {
                $httpBackend.expectGET('/api/event').respond();

                var promise = EventService.getEvents();

                expect(promise).to.become([]);

                $httpBackend.flush();
            });
            it('Should return an empty array if the server returns an error', function () {
                $httpBackend.expectGET('/api/event').respond(500);

                var promise = EventService.getEvents();

                expect(promise).to.become([]);

                $httpBackend.flush();
            });
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/event').respond(500);

                EventService.getEvents();
                $httpBackend.flush();
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/event/id/1').respond(500, {status: 'failed', info: 'no event found'}
                );
                var eventResult = [];
                EventService.getEvent(1).then(function (results) {
                    eventResult = results;
                });
                $httpBackend.flush();
                expect(eventResult).not.to.exist;
            });
        });
    });

    describe('getEvent', function () {
        describe('Success', function () {
            it('Should contain an event', function () {
                $httpBackend.expectGET('/api/event/id/1').respond(
                    {status: 'ok', info: '', event: events.events[0]}
                );
                var eventResult = [];
                EventService.getEvent(1).then(function (results) {
                    eventResult = results.event;
                });
                $httpBackend.flush();
                expect(eventResult).to.exists;
            });

            it('Should get the same event if the same id is supplied', function () {
                var event1;
                var event2;

                event1 = getEvent(1);
                event2 = getEvent(1);

                expect(event1.id).to.equal(event2.id);
            });

            it('Should get different events based on the id supplied', function () {
                var event1 = getEvent(2);
                var event2 = getEvent(3);

                expect(event1).to.not.equal(event2);
            });
        });
        describe('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectGET('/api/event/id/1').respond(500);
                var eventResult = [];
                EventService.getEvent(1).then(function (results) {
                    eventResult = results;
                });

                $httpBackend.flush();
                expect(eventResult).not.to.exist;
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/event/id/1').respond(500, {status: 'failed', info: 'no event found'}
                );
                var eventResult = [];
                EventService.getEvent(1).then(function (results) {
                    eventResult = results;
                });
                $httpBackend.flush();
                expect(eventResult).not.to.exist;
            });
        });
    });

    describe('CreateEvent', function () {
        describe('Success', function () {
            it('Should create an event', function () {
                $httpBackend.expectPOST('/api/event', mockCreateEvent).respond(
                    {status: 'ok', info: '', event: mockCreateEvent}
                );
                var eventResult = [];
                EventService.createEvent(mockCreateEvent).then(function (results) {
                    eventResult = results.event;
                });
                $httpBackend.flush();
                expect(eventResult).to.exists;
            });
        });
        describe('Failure', function () {
            it('Should log an error if the server returns an error', function () {
                $httpBackend.expectPOST('/api/event', mockCreateEvent)
                    .respond(500, {status: 'failed', info: 'an error occurred'});

                var promise = EventService.createEvent(mockCreateEvent);

                expect(promise).to.be.fulfilled;
                $httpBackend.flush();
                expect($log.error.logs).not.to.be.empty;
                expect($log.error.logs).not.to.be.undefined;
            });

            it('Should return an error value if the server returns an error', function () {
                $httpBackend.expectGET('/api/event/id/1').respond(500, {status: 'failed', info: 'no event found'}
                );
                var eventResult = [];
                EventService.getEvent(1).then(function (results) {
                    eventResult = results;
                });
                $httpBackend.flush();
                expect(eventResult).not.to.exist;
            });
        });
    });

    describe('Attend', function () {
        it('should not do anything with no event', function () {
            var user = getUser(1);
            var result = EventService.attend(null, user);
            expect(result.status).to.equal('missing data');
            expect(result.info).to.equal('You must supply an event to attend.');
        });

        it('should not do anything with no user', function () {
            var event = getEvent(1);
            var result = EventService.attend(event, null);
            expect(result.status).to.equal('missing data');
            expect(result.info).to.equal('You must supply a user to attend.');
        });

        it('should add the user in a promise way to the event when attending the event', function () {
            $httpBackend.expectGET('/api/event/attend/eid/' + eventWithoutUserAdded.id + '/uid/' + user.id)
                .respond({status: 'ok', event: eventWithUserAdded.event});

            var result = EventService.attend(eventWithoutUserAdded, user);

            expect(result).to.become({status: 'ok', event: eventWithUserAdded.event});
            $httpBackend.flush();
        });

        it('Should return an error value if the server returns an error', function () {
            $httpBackend.expectGET('/api/event/attend/eid/' + eventWithoutUserAdded.id + '/uid/' + user.id)
                .respond(500, {status: 'failed', info: 'an error occurred'});

            var promise = EventService.attend(eventWithoutUserAdded, user);
            expect(promise).to.be.fulfilled;
            $httpBackend.flush();
            expect($log.error.logs).not.to.be.empty;
            expect($log.error.logs).not.to.be.undefined;
        });
    });

    describe('Unattend', function () {
        it('should not do anything with no event', function () {
            var user = getUser(1);
            var result = EventService.unattend(null, user);
            expect(result.status).to.equal('missing data');
            expect(result.info).to.equal('You must supply an event to unattend.');
        });

        it('should not do anything with no user', function () {
            var event = getEvent(1);
            var result = EventService.unattend(event, null);
            expect(result.status).to.equal('missing data');
            expect(result.info).to.equal('You must supply a user to unattend.');
        });
        it('should remove the user from the event when unattending the event', function () {
            $httpBackend.expectGET('/api/event/unattend/eid/' + eventWithUserAdded.id + '/uid/' + user.id)
                .respond({status: 'ok', event: eventWithoutUserAdded.event});

            var status;
            var resultEvent;
            EventService.unattend(eventWithUserAdded, user).then(function (response) {
                status = response.status;
                resultEvent = response.event;
            });
            $httpBackend.flush();
            expect(status).to.equal('ok');
            expect(resultEvent).to.deep.equal(eventWithoutUserAdded.event);
        });

        it('Should return an error value if the server returns an error', function () {
            $httpBackend.expectGET('/api/event/unattend/eid/' + eventWithoutUserAdded.id + '/uid/' + user.id)
                .respond(500, {status: 'failed', info: 'an error occurred'});

            var promise = EventService.unattend(eventWithoutUserAdded, user);
            expect(promise).to.be.fulfilled;
            $httpBackend.flush();
            expect($log.error.logs).not.to.be.empty;
            expect($log.error.logs).not.to.be.undefined;
        });
    });

    function getEvent(id) {
        var event = {};
        $httpBackend.expectGET('/api/event/id/' + id).respond(
            {status: 'ok', info: '', event: events.events[id - 1]}
        );
        EventService.getEvent(id).then(function (results) {
            event = results;
        });
        $httpBackend.flush();
        return event;
    }

    function getUser(id) {
        var user = {};
        $httpBackend.expectGET('/api/user/id/' + id).respond(
            mockUsers[id - 1]
        );
        userservice.getUser(id).then(function (results) {
            user = results;
        });
        $httpBackend.flush();
        return user;
    }
})
;
