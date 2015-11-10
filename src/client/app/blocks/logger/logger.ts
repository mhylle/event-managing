///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../tools/typings/toastr/toastr.d.ts"/>

module app.blocks {
    'use strict';
    export interface ILogger {
        showToasts: boolean;

        error: (message:string, data?:any, title?:string) => void;
        info: (message:string, data?:any, title?:string) => void;
        success: (message:string, data?:any, title?:string) => void;
        warning: (message:string, data?:any, title?:string) => void;

        log: ng.ILogCall;
    }

    class logger implements ILogger {
        static serviceId = 'logger';
        showToasts:boolean;
        log:ng.ILogCall;

        static $inject = ['$log'];
        /* @ngInject */
        constructor(private $log: ng.ILogService) {
            this.showToasts = true;
            this.log = $log.log;
        }

        error(message:string, data?:any, title?:string):void {
            //this.toastr.error(message, title);
            this.$log.info('Error: ' + message, data);
        }

        info(message:string, data?:any, title?:string):void {
            //this.toastr.info(message, title);
            this.$log.info('Info: ' + message, data);
        }

        success(message:string, data?:any, title?:string):void {
            //this.toastr.success(message, title);
            this.$log.info('Success: ' + message, data);
        }

        warning(message:string, data?:any, title?:string):void {
            //this.toastr.warning(message, title);
            this.$log.info('Warning: ' + message, data);
        }

        static instance($log:ng.ILogService):ILogger {
            return new logger($log);
        }
    }
    angular
        .module('blocks.logger')
        .factory(logger.serviceId, logger.instance);
}
