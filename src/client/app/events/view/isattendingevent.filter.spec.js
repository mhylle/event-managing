/* jshint -W117, -W030, -W101 */
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
    // jscs:disable
    var eventwithoutuser = {
        'id': 1,
        'mongoid': {'$oid': '56b351284d6f6379f83c0f00'},
        'name': 'mi sit',
        'location': 6,
        'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJrSURBVDjLjZNdSFNxHIZPnfS+usiborU2JaKIPvAmig0kkYSCCpHKsTnDolLXnBFJBQV9YC2VtDRThKiYzA9coW6abWSTwRixYqPtIqHTWGM7+3Bfb+d/ZEeHXjh4Lt/395x3/CkAlMPhODHzSIUpXTk+KUpAUdSRdbKThPfZ7XZ2zjaLeds0TBeLkU6n1wVfotPpCo1GY83HB3X40l0H04VixOPxPKLRKFiWFQiHw0ilUksF+QYWjFdLVxXkSnJEIhEkk8l8g/F7dZjtUmO8SopEIsFzc9AP3YAfzRzafh+0fT5oOIiFUCAYWJcMxs5Ksbi4yEPCAxYG/RxvzAz6phg09P7iC4hVnsHYXTU+d9Zi9IyEbyesvNrEBRtfeXDtpYffIBaLZdY0GD4t4QciBblPIZCL5NtJOBQKIRgMslzBwWWD1lrMtKswfGq3EG567UNDjxdXuz243PUT9S9+oP65CwzDIBAIrLGB1QJjpZgvIBvkLnO68Bv0sCn2YEJeAHPVDljbroOm6VLBYOSWCtN6JYYqxMKIBBL2vnsKp/Yo4mNPkP1uQvRtI75d2Y9nh+jHeQZ2zsBQvksYkRiQxS3VYsS4MPQngebNwH0R/j48jhEZ/XvZoEUJc5sChrLlAnKdDEe0s/MGrPz9ay3ChGxTdpXBB7kImUyG/ydyBuZz28H2KAEulNBSCHL4L9EYldMMb6DRaESDFXsxdP4w3stE8Hg8cLvdcLlccDqdmGu/ga/qEiw0i8C0FMCr2oDJykJ0lG7spMhzJtRIthy7faDojlK6VbXW0+0t29YxIqcXiDZ3+Q8f5p7zf7M8wtRUBE6BAAAAAElFTkSuQmCC',
        'start': '2015-03-24T17:32:23Z',
        'end': '2015-03-25T17:32:23Z',
        'signstart': '2015-02-28T17:32:23Z',
        'signend': '2015-03-13T17:32:23Z',
        'canceldeadline': '2015-03-20T17:32:23Z',
        'description': 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        'financials': {'memberprice': '322.55', 'nonmemberprice': '146.72', 'default': '125.21'}
    };
    // jscs:enable

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

    it('should return false if no user is specified', function () {
        expect(filter(event, null)).to.be.false;
    });

    it('should throw an error if no event is specified', function () {
        expect(function () {
            filter(null, attendinguser);
        }).to.throw();
    });

    it('Should return false if no users are attenting an event', function () {
        expect(filter(eventwithoutuser, notattendinguser)).to.be.false;
    });
});
