module eventmanaging.user.controllers {
    import IUserService = eventmanaging.user.services.IUserService;
    export interface IUserListController {
        title: string;

        activate: () => void;
        users: ()=> void;
    }
}
