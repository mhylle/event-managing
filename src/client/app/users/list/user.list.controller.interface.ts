module schema.user.controllers {
    import IUserService = schema.user.services.IUserService;
    export interface IUserListController {
        title: string;

        activate: () => void;
        users: ()=> void;
    }
}
