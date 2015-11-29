module app.controllers {
    import IGroupService = app.services.IGroupService;
    export interface IGroupManagementController {
        title: string;

        activate: () => void;
        create: () => void;
        delete: () => void;
        update: () => void;
    }
}
