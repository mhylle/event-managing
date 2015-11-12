module app.controllers {
    import IUserService = app.services.IUserService;
    export interface IUserController {
        title: string;

        activate: () => void;
        users: ()=> void;
    }
}
