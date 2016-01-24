/* jshint -W117, -W030 */
describe('isattendingeventfilter', function () {
    var filter;
    var event = {
        id: 1,
        name: 'Fastelavn',
        internalId: 1,
        start: moment('07-02-2016 14:00:00', 'DD-MM-YYYY HH:mm'),
        end: moment('07-02-2016 16:00:00', 'DD-MM-YYYY HH:mm'),
        signstart: moment('17-01-2016', 'DD-MM-YYYY'),
        signend: moment('02-02-2016', 'DD-MM-YYYY'),
        signoutend: moment('02-02-2016', 'DD-MM-YYYY'),
        location: 'Kantinen',
        logo: '',
        decription: 'En festlig dag for børnene.',
        users: [
            {id: '1', firstname: 'Martin', lastname: 'Hylleberg'},
            {id: '2', firstname: 'Kim', lastname: 'Madsen'},
            {id: '3', firstname: 'Sune', lastname: 'Håkonsson'}
        ],
        activities: []
    };

    var attendinguser = {id: '1', firstname: 'Martin', lastname: 'Hylleberg'};
    var notattendinguser = {id: '4', firstname: 'Søren', lastname: 'Cramer'};

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-events');
        bard.inject('$filter');
        filter = $filter('isattendingeventfilter');
    });

    it('should return true if the user is attending an event', function () {
        expect(filter(event, attendinguser)).to.be.true;
    });
    it('should return false if the user is not attending an event', function () {
        expect(filter(event, notattendinguser)).to.be.false;
    });
});

