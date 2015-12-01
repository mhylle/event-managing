module schema.group.controllers {
    import IGroupService = schema.group.services.IGroupService;
    export interface IGroupCreateController {
        title: string;

        activate: () => void;

        create: () => boolean;
    }
}
