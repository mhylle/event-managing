module schema.user.controllers {
    import IUserService = schema.user.services.IUserService;
    export interface IUserCreateController {
        title: string;

        activate: () => void;

        create: () => boolean;
    }
}
