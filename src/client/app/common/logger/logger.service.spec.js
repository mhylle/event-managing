/* jshint -W117, -W030 */
describe('LoggerService', function () {

    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-logger');
        bard.inject('$log', 'Logger');
    });

    describe('Logging', function () {
        it('Errors', function () {
            Logger.error('error');
            var logs = $log.error.logs;
            expect(logs).to.have.length(1);
        });
        it('Errors', function () {
            Logger.error('error');
            var logs = $log.error.logs;
            expect(logs[0][0]).to.equal('Error: error');
        });

        it('Errors with data', function () {
            Logger.error('error', 'some data');
            var logs = $log.error.logs;
            expect(logs[0][1].data).to.equal('some data');
        });

        it('Warnings', function () {
            Logger.warning('warning');
            var logs = $log.warn.logs;
            expect(logs).to.have.length(1);
        });

        it('Warnings with data', function () {
            Logger.warning('warning', 'some data');
            var logs = $log.warn.logs;
            expect(logs[0][1].data).to.equal('some data');
        });

        it('debug', function () {
            Logger.debug('debug');
            var logs = $log.debug.logs;
            expect(logs).to.have.length(1);
        });

        it('debug with data', function () {
            Logger.debug('debug', 'some data');
            var logs = $log.debug.logs;
            expect(logs[0][1].data).to.equal('some data');
        });

        it('Info', function () {
            Logger.info('info');
            var logs = $log.info.logs;
            expect(logs).to.have.length(1);
        });

        it('Info with data', function () {
            Logger.info('info', 'some data');
            var logs = $log.info.logs;
            expect(logs[0][1].data).to.equal('some data');
        });
    });
});
