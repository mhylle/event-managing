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
        beforeEach(function () {
            $httpBackend.expectGET('/api/event').respond(
                events
            );
        });
        it('returns a value', function () {
            var eventResult = EventService.getEvents().then(function (response) {
                eventResult = response;
            });
            expect(eventResult).to.exists;
        });
        it('Retrieves an amount of events', function () {
            var eventResult = [];
            EventService.getEvents().then(function (results) {
                eventResult = results.events;
            });
            $httpBackend.flush();
            expect(eventResult).to.have.length.above(0);
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

        it.skip('should add the user to the event when attending the event', function () {
            $httpBackend.expectGET('/api/event/attend/eid/' + eventWithoutUserAdded.id + '/uid/' + user.id)
                .respond({status: 'ok', event: eventWithUserAdded});

            var result = EventService.attend(eventWithoutUserAdded, user);
            $rootScope.$apply();
            $httpBackend.flush();
            //result.resolve({status: 'ok', event: eventWithUserAdded})
            // .should.eventually.equal({status: 'ok', event: eventWithUserAdded});
            //return Promise.resolve(2 + 2).should.eventually.equal(4);
            expect(result).to.equal({status: 'ok', event: eventWithUserAdded});
        });
    });

    describe('Unattend', function () {
        it('should not do anything with no event');
        it('should not do anything with no user');
        it('should remove the user from the event when unattending the event');
    });

    describe.skip('addUserToEvent', function () {
        it('Should not add null users to an event', function () {
            var event = getEvent(1);
            expect(event.users).not.to.exist;
            var resultEvent = EventService.addUserToEvent(event, null);
            expect(resultEvent).not.to.exist;
        });

        it('Should add users to a event', function () {
            var workingEvent = getEvent(1);
            expect(workingEvent.users).not.to.exist;
            var user = getUser(1);
            expect(user).to.exist;

            workingEvent.users = [user];

            $httpBackend.expectPUT('/api/event/id/' + workingGroup.id + '/user/id/' + user.id).respond(
                {status: 'ok', info: '', event: workingEvent}
            );

            var status;
            groupservice.addUserToEvent(workingEvent, user).then(function (response) {
                status = response.data.status;
                resultEvent = response.data.event;
            });
            $httpBackend.flush();
            expect(status).to.equal('ok');
            expect(resultEvent.users).to.exist;
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
