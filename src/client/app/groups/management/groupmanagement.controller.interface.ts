module schema.group.controllers {
    import IGroupService = schema.group.services.IGroupService;
    export interface IGroupManagementController {
        title: string;

        activate: () => void;
        create: () => void;
        delete: () => void;
        update: () => void;
    }
}
