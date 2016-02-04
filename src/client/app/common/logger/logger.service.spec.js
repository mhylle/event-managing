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

        it('Warnings', function () {
            Logger.warning('warning');
            var logs = $log.warn.logs;

            expect(logs).to.have.length(1);
        });

        it('debug', function () {
            Logger.debug('debug');
            var logs = $log.debug.logs;

            expect(logs).to.have.length(1);

        });
        it('Info', function () {
            Logger.info('info');
            var logs = $log.info.logs;

            expect(logs).to.have.length(1);
        });
    });
});
