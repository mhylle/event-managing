module app.controllers {
    import IUserService = app.services.IUserService;
    export interface IUserListController {
        title: string;

        activate: () => void;
        users: ()=> void;
    }
}
