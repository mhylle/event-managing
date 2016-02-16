/* jshint -W117, -W030, -W101 */
describe('iscurrenteventfilter', function () {
    var filter;
    var currenteventarray = [{
        id: 1,
        name: 'Fastelavn',
        internalId: 1,
        start: moment('07-02-2020 14:00:00', 'DD-MM-YYYY HH:mm'),
        end: moment('07-02-2020 16:00:00', 'DD-MM-YYYY HH:mm'),
        signstart: moment('17-01-2020', 'DD-MM-YYYY'),
        signend: moment('02-02-2020', 'DD-MM-YYYY'),
        signoutend: moment('02-02-2020', 'DD-MM-YYYY'),
        location: 'Kantinen',
        logo: '',
        decription: 'En festlig dag for børnene.',
        users: [
            {id: '1', firstname: 'Martin', lastname: 'Hylleberg'},
            {id: '2', firstname: 'Kim', lastname: 'Madsen'},
            {id: '3', firstname: 'Sune', lastname: 'Håkonsson'}
        ],
        activities: []
    }];
    var currentevent = {
        id: 1,
        name: 'Fastelavn',
        internalId: 1,
        start: moment('07-02-2020 14:00:00', 'DD-MM-YYYY HH:mm'),
        end: moment('07-02-2020 16:00:00', 'DD-MM-YYYY HH:mm'),
        signstart: moment('17-01-2020', 'DD-MM-YYYY'),
        signend: moment('02-02-2020', 'DD-MM-YYYY'),
        signoutend: moment('02-02-2020', 'DD-MM-YYYY'),
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
    var notcurrentevent = [{
        'id': 1,
        'mongoid': {'$oid': '56b351284d6f6379f83c0f00'},
        'name': 'mi sit',
        'location': 6,
        'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJrSURBVDjLjZNdSFNxHIZPnfS+usiborU2JaKIPvAmig0kkYSCCpHKsTnDolLXnBFJBQV9YC2VtDRThKiYzA9coW6abWSTwRixYqPtIqHTWGM7+3Bfb+d/ZEeHXjh4Lt/395x3/CkAlMPhODHzSIUpXTk+KUpAUdSRdbKThPfZ7XZ2zjaLeds0TBeLkU6n1wVfotPpCo1GY83HB3X40l0H04VixOPxPKLRKFiWFQiHw0ilUksF+QYWjFdLVxXkSnJEIhEkk8l8g/F7dZjtUmO8SopEIsFzc9AP3YAfzRzafh+0fT5oOIiFUCAYWJcMxs5Ksbi4yEPCAxYG/RxvzAz6phg09P7iC4hVnsHYXTU+d9Zi9IyEbyesvNrEBRtfeXDtpYffIBaLZdY0GD4t4QciBblPIZCL5NtJOBQKIRgMslzBwWWD1lrMtKswfGq3EG567UNDjxdXuz243PUT9S9+oP65CwzDIBAIrLGB1QJjpZgvIBvkLnO68Bv0sCn2YEJeAHPVDljbroOm6VLBYOSWCtN6JYYqxMKIBBL2vnsKp/Yo4mNPkP1uQvRtI75d2Y9nh+jHeQZ2zsBQvksYkRiQxS3VYsS4MPQngebNwH0R/j48jhEZ/XvZoEUJc5sChrLlAnKdDEe0s/MGrPz9ay3ChGxTdpXBB7kImUyG/ydyBuZz28H2KAEulNBSCHL4L9EYldMMb6DRaESDFXsxdP4w3stE8Hg8cLvdcLlccDqdmGu/ga/qEiw0i8C0FMCr2oDJykJ0lG7spMhzJtRIthy7faDojlK6VbXW0+0t29YxIqcXiDZ3+Q8f5p7zf7M8wtRUBE6BAAAAAElFTkSuQmCC',
        'start': '2010-03-24T17:32:23Z',
        'end': '2010-03-25T17:32:23Z',
        'signstart': '2010-02-28T17:32:23Z',
        'signend': '2010-03-13T17:32:23Z',
        'canceldeadline': '2010-03-20T17:32:23Z',
        'description': 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        'financials': {'memberprice': '322.55', 'nonmemberprice': '146.72', 'default': '125.21'},
        users: [
            {id: '1', firstname: 'Martin', lastname: 'Hylleberg'},
            {id: '2', firstname: 'Kim', lastname: 'Madsen'},
            {id: '3', firstname: 'Sune', lastname: 'Håkonsson'}
        ]
    }];

    var eventwithnostartdate = [{
        id: 1,
        name: 'Fastelavn',
        internalId: 1,
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
    }];

    // jscs:enable
    bard.verifyNoOutstandingHttpRequests();

    describe('With Array Parameter', function () {
        beforeEach(function () {
            module('event-managing-events');
            bard.inject('$filter');
            filter = $filter('iscurrenteventfilter');
        });
        it('should return 1 result when start date is after now', function () {
            expect(filter(currenteventarray)).to.have.length(1);
        });

        it('should return 1 result when start date is after now and second param is true', function () {
            expect(filter(currenteventarray, true)).to.have.length(1);
        });

        it('should return empty array if the start date is after now and second param is false', function () {
            expect(filter(currenteventarray, false)).to.have.length(0);
        });

        it('should return empty array if the start date is before now and no second param is given', function () {
            expect(filter(notcurrentevent)).to.have.length(0);
        });

        it('should return false if the start date is before now and second param is true', function () {
            expect(filter(notcurrentevent, true)).to.have.length(0);
        });

        it('should return true if the start date is before now and second param is false', function () {
            expect(filter(notcurrentevent, false)).to.have.length(1);
        });

        it('should give an error if no start date is given', function () {
            expect(filter(eventwithnostartdate)).to.throw;
        });

        it('should give an error if no start date is given and a second parameter is true', function () {
            expect(filter(eventwithnostartdate, true)).to.throw;
        });

        it('should give an error if no start date is given and a second parameter is false', function () {
            expect(filter(eventwithnostartdate, false)).to.throw;
        });
    });
    describe('With Object Parameter', function () {
        beforeEach(function () {
            module('event-managing-events');
            bard.inject('$filter');
            filter = $filter('iscurrenteventfilter');
        });
        it('should return 1 result when event start date is after now', function () {
            expect(filter(currentevent)).to.equal(currentevent);
        });

        it('should return 1 result when event start date is after now and second param is true', function () {
            expect(filter(currentevent, true)).to.equal(currentevent);
        });

        it('should return undefined if the event start date is after now and second param is false', function () {
            expect(filter(currentevent, false)).to.be.undefined;
        });
    });
    it('should throw an error if no event is specified', function () {
        expect(function () {
            filter();
        }).to.throw;
    });
});
