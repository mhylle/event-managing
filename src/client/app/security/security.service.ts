///<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
module app.services {
    export interface ISecurityService {
        login: (username:string, password:string) => boolean;
        isLoggedIn: (username:string, password:string) => boolean;
    }
}
