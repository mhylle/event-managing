module eventmanaging.user.controllers {
    import IUserService = eventmanaging.user.services.IUserService;
    export interface IUserCreateController {
        title: string;

        activate: () => void;

        create: () => boolean;
    }
}
