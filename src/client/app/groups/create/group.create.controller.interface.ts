module eventmanaging.group.controllers {
    import IGroupService = eventmanaging.group.services.IGroupService;
    export interface IGroupCreateController {
        title: string;

        activate: () => void;

        create: () => boolean;
    }
}
