module schema.controllers {
    import ISecurityService = schema.security.services.ISecurityService;
    export interface IHeaderController {
        username: string;
    }
}
