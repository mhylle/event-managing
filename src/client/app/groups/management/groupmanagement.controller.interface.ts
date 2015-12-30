module eventmanaging.group.controllers {
    import IGroupService = eventmanaging.group.services.IGroupService;
    export interface IGroupManagementController {
        title: string;

        activate: () => void;
        create: () => void;
        delete: () => void;
        update: () => void;
    }
}
