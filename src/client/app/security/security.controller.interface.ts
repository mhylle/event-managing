module app.controllers {
    import ISecurityService = app.services.ISecurityService;
    export interface ISecurityController {
        title: string;
        username: string;
        password: string;
        loginStatus: string;
        activate: () => void;
        login: () => void;
    }
}
