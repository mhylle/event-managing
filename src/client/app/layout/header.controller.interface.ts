module app.controllers {
    import ISecurityService = app.services.ISecurityService;
    export interface IHeaderController {
        username: string;
        getUserName:()=> string;
    }
}
