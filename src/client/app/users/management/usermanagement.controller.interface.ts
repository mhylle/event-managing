module schema.user.controllers {
    import IUserService = schema.user.services.IUserService;
    export interface IUserManagementController {
        title: string;

        activate: () => void;
        create: () => void;
        delete: () => void;
        update: () => void;
    }
}
