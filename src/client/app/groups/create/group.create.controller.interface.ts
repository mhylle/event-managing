module app.controllers {
    import IUserService = app.services.IUserService;
    export interface IUserCreateController {
        title: string;

        activate: () => void;

        create: () => boolean;
    }
}
