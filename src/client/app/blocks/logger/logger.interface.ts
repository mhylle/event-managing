module schema.blocks {
    'use strict';
    export interface ILogger {
        showToasts: boolean;

        error: (message:string, data?:any, title?:string) => void;
        info: (message:string, data?:any, title?:string) => void;
        success: (message:string, data?:any, title?:string) => void;
        warning: (message:string, data?:any, title?:string) => void;

        log: ng.ILogCall;
    }
}
