/////<reference path="../../../../tools/typings/angularjs/angular.d.ts"/>
/////<reference path="../common/logger/logger.ts"/>
///**
// * @ngdoc controller
// * @name SecurityController
// *
// * @description
// * _Please update the description and dependencies._
// *
// * @requires $scope
// * */
//module schema.security.controllers {
//    import ISecurityService = schema.security.services.ISecurityService;
//
//    export class SecurityController implements ISecurityController {
//
//        static controllerId = 'SecurityController';
//        credentials = {
//            username: '',
//            password: ''
//        };
//        title:string;
//        username:string;
//        password:string;
//        loginStatus:string;
//        userInfo:string;
//
//        static $inject = ['$rootScope', 'logger', 'securityservice'];
//
//        /* @ngInject */
//        constructor(private $rootScope: ng.IRootScopeService, private logger:schema.ILogger, private securityService:ISecurityService) {
//            this.init();
//        }
//
//        private init() {
//            this.title = 'Security';
//            this.activate();
//        }
//
//        activate():void {
//            this.logger.info('Activated Security View');
//        }
//
//        login(credentials):void {
//            this.loginStatus = 'Logging in.';
//            this.logger.info('Logging in');
//            var that = this;
//            this.securityService.login(credentials).then(function(user) {
//                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//                $scope.setCurrentUser(user);
//            }, function() {
//                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//            });
//            //this.securityService.login(credentials)
//            //    .then(response => {
//            //        that.logger.info('Inside promise');
//            //        if (response) {
//            //            that.logger.info('Successfully logged in.');
//            //            that.loginStatus = 'Successfully logged in.';
//            //            that.userInfo = that.securityService.getSecurityToken();
//            //            that.logger.info(that.userInfo);
//            //        } else {
//            //            that.logger.info('Failed login.');
//            //            that.loginStatus = 'Failed login.';
//            //        }
//            //    });
//        }
//
//        logout():void {
//            var that = this;
//            this.securityService.logout().then(()=> {
//                that.loginStatus = 'Logged out';
//            })
//        }
//    }
//    angular.module('schema.security')
//        .controller(SecurityController.controllerId, SecurityController);
//}
