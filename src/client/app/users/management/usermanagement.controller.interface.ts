module app.controllers {
    import IUserService = app.services.IUserService;
    export interface IUserManagementController {
        title: string;

        activate: () => void;
        create: () => void;
        delete: () => void;
        update: () => void;
    }
}
